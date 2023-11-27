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
import backIcon from '../../assets/icons/back-arrow.svg';
import likeIcon from '../../assets/icons/like.svg';
import likeActiveIcon from '../../assets/icons/like-active.svg';


export const RecipePage = ({ apiUrl, apiKey, recipeData, recipeList, handleLikeButton, shopList, setShopList }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const scaledRecipe = JSON.parse(localStorage.getItem("scaledRecipes")) || [];
    const scaledIngredients = JSON.parse(localStorage.getItem("scaledIngredients")) || [];
    const localIngredients = JSON.parse(localStorage.getItem("ingredients"))?.ingredients || [];

    const { recipeId } = useParams();
    const [ingredientData, setIngredientData] = useState({});
    const [equipmentData, setEquipmentData] = useState({});

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [shopButtonDisabled, setShopButtonDisabled] = useState(true);

    const recipe = location.pathname === `/recipe/${recipeId}/scaled` ?
        scaledRecipe.find(entry => entry.id === parseInt(recipeId)) :
        recipeData.results?.find(entry => entry.id === parseInt(recipeId));
    const inCollection = recipeList.map(recipe => recipe.id).includes(parseInt(recipeId));


    useEffect(() => {
        const fetchIngredientAndToolsData = async () => {
            try {
                const ingredients = await axios.get(`${apiUrl}/recipes/${recipeId}/priceBreakdownWidget.json?apiKey=${apiKey}`);
                const equipment = await axios.get(`${apiUrl}/recipes/${recipeId}/equipmentWidget.json?apiKey=${apiKey}`);
                setIngredientData(ingredients.data);
                setEquipmentData(equipment.data);
                localStorage.setItem("ingredients", JSON.stringify(ingredients.data));
            } catch (error) {
                console.error(error);
            }
        }

        fetchIngredientAndToolsData();
        localStorage.setItem("recipeDetails", JSON.stringify(recipe));
    }, []);


    const [servings, setServings] = useState(recipe?.servings);
    const [activeTab, setActiveTab] = useState("details");
    const [activeTab2, setActiveTab2] = useState("steps");

    const [activeCheckboxes, setActiveCheckboxes] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [redirectPath, setRedirectPath] = useState("");


    useEffect(() => {
        if (servings !== recipe?.servings) {
            setSaveButtonDisabled(false);
        } else {
            setSaveButtonDisabled(true);
        }
    }, [servings]);

    const handleSave = () => {
        const localStorageList = JSON.parse(localStorage.getItem("scaledRecipes")) || [];
        const scaledRecipe = JSON.parse(localStorage.getItem("recipeDetails"));

        const localStorageIngredients = JSON.parse(localStorage.getItem("scaledIngredients")) || [];
        const scaledIngredients = JSON.parse(localStorage.getItem("ingredients")).ingredients;

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
            data = servings !== recipe.servings ? localIngredients : scaledIngredients;
        } else {
            data = servings !== recipe.servings ? localIngredients : ingredientData.ingredients;
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

    const handleServingChange = (servings) => {
        const scale = (origValue) => {
            const scaleFactor = parseInt(origValue / recipe?.servings);
            return Math.floor(servings * scaleFactor);
        }

        const storedDetails = JSON.parse(localStorage.getItem("recipeDetails"));
        const cals = Math.floor(recipe?.nutrition.nutrients.find(item => item.name === "Calories").amount / recipe?.servings * servings);
        const protein = scale(recipe?.nutrition.nutrients.find(item => item.name === "Protein").amount);
        const carbs = scale(recipe?.nutrition.nutrients.find(item => item.name === "Carbohydrates").amount);
        const fat = scale(recipe?.nutrition.nutrients.find(item => item.name === "Fat").amount);
        const weight = recipe?.nutrition.weightPerServing.amount;

        if (Object.keys(storedDetails).length !== 0) {
            storedDetails.nutrition.nutrients.find(item => item.name === "Calories").amount = cals;
            storedDetails.servings = parseInt(servings);
            storedDetails.nutrition.nutrients.find(item => item.name === "Protein").amount = protein;
            storedDetails.nutrition.nutrients.find(item => item.name === "Carbohydrates").amount = carbs;
            storedDetails.nutrition.nutrients.find(item => item.name === "Fat").amount = fat;
            storedDetails.nutrition.weightPerServing.amount = Math.floor(weight * servings);
            localStorage.setItem("recipeDetails", JSON.stringify(storedDetails));
        }
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
                handleServingChange={handleServingChange}
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
            {activeTab2 === "steps" ? <Steps steps={recipe?.analyzedInstructions[0]?.steps} /> :
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
