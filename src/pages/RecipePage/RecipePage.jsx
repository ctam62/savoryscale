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


export const RecipePage = ({
    apiUrl,
    spoonacularApiUrl,
    apiKey,
    token,
    user,
    setUser,
    setFailedAuth,
    savedRecipes,
    handleLikeButton,
    open,
    setOpen,
    handleClose,
    handleBackNagivation,
    redirectPath,
    setRedirectPath,
    shopList,
    setShopList,
    calculateEndpointUsage,
    handleUsageLimit
}) => {

    const navigate = useNavigate();
    const location = useLocation();

    let { recipeId } = useParams();
    const [ingredientData, setIngredientData] = useState({});
    const [equipmentData, setEquipmentData] = useState({});

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [shopButtonDisabled, setShopButtonDisabled] = useState(true);

    const recipe = JSON.parse(sessionStorage.getItem("recipeDetails"));
    const sessionIngredients = JSON.parse(sessionStorage.getItem("ingredients"))?.ingredients || [];
    const sessionScaledRecipes = JSON.parse(sessionStorage.getItem("scaledRecipes")) || [];

    const inCollection = savedRecipes.map(recipe => recipe.id).includes(parseInt(recipeId));


    useEffect(() => {
        if (!token) {
            return setFailedAuth(true);
        }

        axios
            .get(`${apiUrl}/api/user/current`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
                setFailedAuth(true);
            });

        const fetchIngredientAndToolsData = async () => {
            if (location.pathname === `/recipe/${recipeId}/saved`) {
                recipeId = recipe.recipeId;
            }

            try {
                const ingredients = await axios.get(`${spoonacularApiUrl}/recipes/${recipeId}/priceBreakdownWidget.json?apiKey=${apiKey}`);
                const equipment = await axios.get(`${spoonacularApiUrl}/recipes/${recipeId}/equipmentWidget.json?apiKey=${apiKey}`);
                setIngredientData(ingredients.data);
                setEquipmentData(equipment.data);
                sessionStorage.setItem("ingredients", JSON.stringify(ingredients.data));
                sessionStorage.setItem("equipment", JSON.stringify(equipment.data));

                calculateEndpointUsage(2, null);
            } catch (error) {

                if (error.response.status === 402) {
                    handleUsageLimit();
                }

                console.error(error);
            }
        }

        const fetchScaledRecipe = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/api/recipe/user/${user.id}/scaled_recipe/${recipeId}`);
                setIngredientData(data);
                setEquipmentData(data);
                sessionStorage.setItem("ingredients", JSON.stringify({ ingredients: [...data.ingredients], totalCost: data.totalCost }));
                sessionStorage.setItem("equipment", JSON.stringify({ equipment: data.equipment }));
            } catch (error) {
                console.error(error);
            }
        }

        if (location.pathname === `/recipe/${recipeId}/scaled`) {
            if (user) {
                fetchScaledRecipe();
            }
        } else {
            fetchIngredientAndToolsData();
        }

        setOpen(false);
    }, []);


    const [servings, setServings] = useState(recipe?.servings);
    const [activeTab, setActiveTab] = useState("details");
    const [activeTab2, setActiveTab2] = useState("steps");

    const [activeCheckboxes, setActiveCheckboxes] = useState([]);
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("");


    useEffect(() => {
        if (recipe?.servings !== recipe?.origServings) {
            setSaveButtonDisabled(false);
        } else {
            setSaveButtonDisabled(true);
        }
    }, [servings]);

    const handleSave = () => {
        const scaledRecipe = JSON.parse(sessionStorage.getItem("recipeDetails"));
        const scaledIngredients = JSON.parse(sessionStorage.getItem("ingredients"));
        const equipment = JSON.parse(sessionStorage.getItem("equipment")).equipment;

        scaledRecipe.ingredients = scaledIngredients.ingredients;
        scaledRecipe.totalCost = scaledIngredients.totalCost;
        scaledRecipe.equipment = equipment;

        sessionScaledRecipes.push(scaledRecipe);
        sessionStorage.setItem("scaledRecipes", JSON.stringify(sessionScaledRecipes));

        setMessage("Your scaled recipe has been sucessfully added to your collection");
        setButtonText("View My Collection");
        setRedirectPath("/collection");
        setOpen(true);

        const postScaledRecipe = async () => {
            try {
                await axios.post(`${apiUrl}/api/recipe/user/${user.id}/scaled_recipe`, scaledRecipe);
            } catch (error) {
                console.error(error);
            }
        }

        postScaledRecipe();
    };

    const handleAddToShoppingList = () => {
        const postShoppingList = async (item) => {
            try {
                await axios.post(`${apiUrl}/api/shopping/user/${user.id}`, item);
            } catch (error) {
                console.error(error);
            }
        };

        const sessionStorageList = JSON.parse(sessionStorage.getItem("shopList") || "[]");

        let indexCounter = sessionStorageList.length;

        activeCheckboxes.forEach(item => {
            const shopItem = sessionIngredients.find(ingredient => ingredient.name === item);
            indexCounter += 1;
            shopItem.userId = user.id;
            shopItem.id = indexCounter;
            shopItem.origPrice = shopItem.price;
            shopItem.amount.metric.origValue = shopItem.amount.metric.value;
            shopItem.amount.us.origValue = shopItem.amount.us.value;

            sessionStorageList.push(shopItem);
            setShopList([...shopList]);
            sessionStorage.setItem("shopList", JSON.stringify(sessionStorageList));

            postShoppingList(shopItem);
        });

        setMessage("Your ingredients have been sucessfully added to your shopping list");
        setButtonText("View Shopping List");
        setRedirectPath("/shoppinglist");
        setOpen(true);
    };

    const handleServingChange = (servings) => {
        const scale = (origValue) => {
            const scaleFactor = parseFloat(origValue / recipe?.servings);
            return servings * scaleFactor;
        }

        const storedDetails = JSON.parse(sessionStorage.getItem("recipeDetails"));
        const cals = recipe?.nutrition.nutrients.find(item => item.name === "Calories").amount / recipe?.servings * servings;
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
            storedDetails.nutrition.weightPerServing.amount = weight;
            sessionStorage.setItem("recipeDetails", JSON.stringify(storedDetails));
        }
    };

    return (
        <main className="recipe">
            <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message={message}
                buttonText={buttonText}
                error={false}
                redirect={true}
                redirectPath={redirectPath}
            />

            <nav className="recipe__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => handleBackNagivation(navigate)} />
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
                    recipeItems={ingredientData.ingredients}
                    recipeServings={recipe.origServings}
                    servings={servings}
                    activeCheckboxes={activeCheckboxes}
                    setActiveCheckboxes={setActiveCheckboxes}
                    buttonDisabled={shopButtonDisabled}
                    setButtonDisabled={setShopButtonDisabled}
                    listType="ingredients"
                />
            }

            {activeTab === "ingredients" &&
                <button
                    className={`recipe__shop-button ${shopButtonDisabled ? "" : "recipe__shop-button--active"}`}
                    type="button"
                    onClick={handleAddToShoppingList}
                    disabled={shopButtonDisabled}
                >
                    Add to shopping list
                </button>
            }

            <RecipeSubNav navItems={["steps", "tools"]} setActiveTab={setActiveTab2} />
            {activeTab2 === "steps" ? <Steps steps={recipe?.analyzedInstructions[0]?.steps} /> :
                <ItemList
                    recipeItems={equipmentData?.equipment}
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
