import './RecipePage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Servings } from '../../components/Servings/Servings';
import { RecipeHero } from '../../components/RecipeHero/RecipeHero';
import { RecipeSubNav } from '../../components/RecipeSubNav/RecipeSubNav';
import { RecipeDetails } from '../../components/RecipeDetails/RecipeDetails';
import { ItemList } from '../../components/ItemList/ItemList';
import { Steps } from '../../components/Steps/Steps';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';
import ingredientJson from '../../data/ingredients.json'; // remove for demo
import equipmentJson from '../../data/equipment.json'; // remove for demo
import backIcon from '../../assets/icons/back-arrow.svg';
import likeIcon from '../../assets/icons/like.svg';
import likeActiveIcon from '../../assets/icons/like-active.svg';


export const RecipePage = ({ apiUrl, apiKey, recipeData, recipeList, handleLikeButton, shopList, setShopList }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const scaledRecipe = JSON.parse(localStorage.getItem("scaledRecipes")) || [];
    const scaledIngredients = JSON.parse(localStorage.getItem("scaledIngredients")) || [];
    const sessionIngredients = JSON.parse(sessionStorage.getItem("ingredients")).ingredients || [];

    const { recipeId } = useParams();
    const [ingredientData, setIngredientData] = useState({});
    const [equipmentData, setEquipmentData] = useState({});

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [shopButtonDisabled, setShopButtonDisabled] = useState(true);

    useEffect(() => {
        const fetchIngredientAndToolsData = async () => {
            try {
                const ingredients = await axios.get(`${apiUrl}/recipes/${recipeId}/priceBreakdownWidget.json?apiKey=${apiKey}`);
                const equipment = await axios.get(`${apiUrl}/recipes/${recipeId}/equipmentWidget.json?apiKey=${apiKey}`);
                setIngredientData(ingredients.data);
                setEquipmentData(equipment.data);
            } catch (error) {
                console.error(error);
            }
        }

        // fetchIngredientAndToolsData(); // uncomment out for demo
        setIngredientData(ingredientJson); //remove for demo
        setEquipmentData(equipmentJson); // remove for demo
        sessionStorage.setItem("ingredients", JSON.stringify(ingredientJson));
        sessionStorage.setItem("recipeDetails", JSON.stringify(recipe));
    }, []);

    const recipe = location.pathname === `/recipe/${recipeId}/scaled` ?
        scaledRecipe.find(entry => entry.id === parseInt(recipeId)) :
        recipeData.results.find(entry => entry.id === parseInt(recipeId));
    const inCollection = recipeList.map(recipe => recipe.id).includes(parseInt(recipeId));

    const [servings, setServings] = useState(recipe.servings);
    const [activeTab, setActiveTab] = useState("details");
    const [activeTab2, setActiveTab2] = useState("steps");

    const [activeCheckboxes, setActiveCheckboxes] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [redirectPath, setRedirectPath] = useState("");


    useEffect(() => {
        if (servings !== recipe.servings) {
            setSaveButtonDisabled(false);
        } else {
            setSaveButtonDisabled(true);
        }
    }, [servings]);

    const handleSave = () => {
        const localStorageList = JSON.parse(localStorage.getItem("scaledRecipes")) || [];
        const scaledRecipe = JSON.parse(sessionStorage.getItem("recipeDetails"));

        const localStorageIngredients = JSON.parse(localStorage.getItem("scaledIngredients")) || [];
        const scaledIngredients = JSON.parse(sessionStorage.getItem("ingredients")).ingredients;

        console.log(scaledIngredients);

        localStorageList.push(scaledRecipe);
        localStorage.setItem("scaledRecipes", JSON.stringify(localStorageList));

        scaledIngredients.recipeId = scaledRecipe.id;

        localStorageIngredients.push(scaledIngredients);
        localStorage.setItem("scaledIngredients", JSON.stringify(scaledIngredients));

        setMessage("Your scaled recipe has been sucessfully added to your collection");
        setButtonText("View My Collection");
        setRedirectPath("/collection");
        setOpen(true);
    };

    const handleAddToShoppingList = () => {
        const localStorageList = JSON.parse(localStorage.getItem("shopList") || "[]");

        let indexCounter = localStorageList.length;

        let data = [];

        if (location.pathname === `/recipe/${recipeId}/scaled`) {
            data = servings !== recipe.servings ? sessionIngredients : scaledIngredients;
        } else {
            data = servings !== recipe.servings ? sessionIngredients : ingredientData.ingredients;
        }

        activeCheckboxes.forEach(item => {
            const shopItem = data.find(ingredient => ingredient.name === item);
            indexCounter += 1;
            shopItem.id = indexCounter;
            shopItem.origPrice = shopItem.price;
            shopItem.amount.metric.origValue = shopItem.amount.metric.value;
            shopItem.amount.us.origValue = shopItem.amount.us.value;

            localStorageList.push(shopItem);
            setShopList([...shopList]);
            localStorage.setItem("shopList", JSON.stringify(localStorageList));
        });

        setMessage("Your ingredients have been sucessfully added to your shopping list");
        setButtonText("View Shopping List");
        setRedirectPath("/shoppinglist");
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <main className="recipe">
            <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message={message}
                buttonText={buttonText}
                redirectPath={redirectPath}
            />

            <nav className="recipe__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
                <img
                    className="recipe__icons recipe__icons--like"
                    src={inCollection ? likeActiveIcon : likeIcon}
                    alt="like icon add recipe to like list"
                    onClick={() => handleLikeButton(recipe)}
                />
            </nav>

            <RecipeHero recipe={recipe} servings={servings} />
            <Servings
                servings={servings}
                setServings={setServings}
                buttonDisabled={saveButtonDisabled}
                setButtonDisabled={setSaveButtonDisabled}
            />

            <button
                className={`recipe__save-button ${saveButtonDisabled ? "" : "recipe__save-button--active"}`}
                type="button"
                onClick={handleSave}
                disabled={saveButtonDisabled}
            >
                Save Scaled Recipe
            </button>

            <RecipeSubNav navItems={["details", "ingredients"]} setActiveTab={setActiveTab} />
            {activeTab === "details" ? <RecipeDetails recipe={recipe} servings={servings} /> :
                <ItemList
                    recipeItems={location.pathname === `/recipe/${recipeId}/scaled` ? scaledIngredients : ingredientData.ingredients}
                    recipeServings={recipe.servings}
                    servings={servings}
                    activeCheckboxes={activeCheckboxes}
                    setActiveCheckboxes={setActiveCheckboxes}
                    buttonDisabled={shopButtonDisabled}
                    setButtonDisabled={setShopButtonDisabled}
                    listType="ingredients"
                />
            }

            {activeTab === "ingredients" ?
                <button
                    className={`recipe__shop-button ${shopButtonDisabled ? "" : "recipe__shop-button--active"}`}
                    type="button"
                    onClick={handleAddToShoppingList}
                    disabled={shopButtonDisabled}
                >
                    Add to shopping list
                </button> : ""
            }

            <RecipeSubNav navItems={["steps", "tools"]} setActiveTab={setActiveTab2} />
            {activeTab2 === "steps" ? <Steps steps={recipe.analyzedInstructions[0].steps} /> :
                <ItemList
                    recipeItems={equipmentData.equipment}
                    recipe={recipe}
                    servings={servings}
                    activeCheckboxes={activeCheckboxes}
                    setActiveCheckboxes={setActiveCheckboxes}
                    buttonDisabled={shopButtonDisabled}
                    setButtonDisabled={setShopButtonDisabled}
                    listType="equipment"
                />
            }

        </main>
    );
};
