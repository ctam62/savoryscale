import './RecipePage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Servings } from '../../components/Servings/Servings';
import { RecipeHero } from '../../components/RecipeHero/RecipeHero';
import { RecipeSubNav } from '../../components/RecipeSubNav/RecipeSubNav';
import { RecipeDetails } from '../../components/RecipeDetails/RecipeDetails';
import { ItemList } from '../../components/ItemList/ItemList';
import { Steps } from '../../components/Steps/Steps';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';
import recipeData from '../../data/spoonacular_recipes.json';
import ingredientData from '../../data/ingredients.json';
import equipmentData from '../../data/equipment.json';
import backIcon from '../../assets/icons/back-arrow.svg';
import likeIcon from '../../assets/icons/like.svg';
import likeActiveIcon from '../../assets/icons/like-active.svg';


export const RecipePage = ({ recipeList, handleLikeButton, shopList, setShopList }) => {
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [shopButtonDisabled, setShopButtonDisabled] = useState(true);

    const recipe = recipeData.results.find(entry => entry.id === parseInt(recipeId));
    const inCollection = recipeList.map(recipe => recipe.id).includes(parseInt(recipeId));

    const [servings, setServings] = useState(recipe.servings);
    const [activeTab, setActiveTab] = useState("details");
    const [activeTab2, setActiveTab2] = useState("steps");

    const [activeCheckboxes, setActiveCheckboxes] = useState([]);
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        // post request to scaled recipe database
        try {

        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToShoppingList = () => {
        // create use post request
        // save in local storage for now

        const localStorageList = JSON.parse(localStorage.getItem("shopList") || "[]");

        let indexCounter = localStorageList.length;

        activeCheckboxes.forEach(item => {
            console.log(item);
            const shopItem = ingredientData.ingredients.find(ingredient => ingredient.name === item);
            indexCounter += 1;
            shopItem.id = indexCounter;
            shopItem.origPrice = shopItem.price;
            shopItem.amount.metric.origValue = shopItem.amount.metric.value;
            shopItem.amount.us.origValue = shopItem.amount.us.value;

            localStorageList.push(shopItem);
            setShopList([...shopList]);
            localStorage.setItem("shopList", JSON.stringify(localStorageList));
        });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (servings !== recipe.servings) {
            setSaveButtonDisabled(false);
        } else {
            setSaveButtonDisabled(true);
        }
    }, [servings]);

    return (
        <main className="recipe">
            <ConfirmationAlert open={open} handleClose={handleClose} />

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
                    recipeItems={ingredientData.ingredients}
                    recipe={recipe}
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
