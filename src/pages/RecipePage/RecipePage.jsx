import './RecipePage.scss';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Servings } from '../../components/Servings/Servings';
import { RecipeHero } from '../../components/RecipeHero/RecipeHero';
import { RecipeSubNav } from '../../components/RecipeSubNav/RecipeSubNav';
import { RecipeDetails } from '../../components/RecipeDetails/RecipeDetails';
import { ItemList } from '../../components/ItemList/ItemList';
import { Steps } from '../../components/Steps/Steps';
import recipeData from '../../data/spoonacular_recipes.json';
import ingredientData from '../../data/ingredients.json';
import equipmentData from '../../data/equipment.json';
import backIcon from '../../assets/icons/back-arrow.svg';
import likeIcon from '../../assets/icons/like.svg';
import likeActiveIcon from '../../assets/icons/like-active.svg';


export const RecipePage = ({ recipeList, handleLikeButton }) => {
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const recipe = recipeData.results.find(entry => entry.id === parseInt(recipeId));
    const inCollection = recipeList.map(recipe => recipe.id).includes(parseInt(recipeId));

    const [servings, setServings] = useState(recipe.servings);
    const [activeTab, setActiveTab] = useState("details");
    const [activeTab2, setActiveTab2] = useState("steps");

    const [activeCheckboxes, setActiveCheckboxes] = useState([]);

    // const handleLikeButton = recipe => {
    //     const localStorageListRaw = localStorage.getItem("recipeList") || "[]";
    //     const localStorageList = JSON.parse(localStorageListRaw);

    //     if (!localStorageList.map(entry => entry.id).includes(recipe.id)) {
    //         localStorageList.push(recipe);
    //         setRecipeList([...localStorageList]);
    //         localStorage.setItem("recipeList", JSON.stringify(localStorageList));
    //     } else {
    //         const filteredList = localStorageList.filter(entry => entry.id !== recipe.id);
    //         localStorage.setItem("recipeList", JSON.stringify(filteredList));
    //         setRecipeList([...filteredList]);
    //     }
    // }

    const handleAddToShoppingList = () => {

    }

    return (
        <main className="recipe">
            <nav className="recipe__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
                <img
                    className="recipe__icons recipe__icons--like"
                    src={inCollection ? likeActiveIcon : likeIcon}
                    alt="like icon add recipe to like list"
                    onClick={() => handleLikeButton(recipe)}
                />
            </nav>

            <RecipeHero recipe={recipe} />
            <Servings servings={servings} setServings={setServings} />

            <button>Save Scaled Recipe</button>

            <RecipeSubNav navItems={["details", "ingredients"]} setActiveTab={setActiveTab} />
            {activeTab === "details" ? <RecipeDetails recipe={recipe} servings={servings} /> :
                <ItemList
                    recipeItems={ingredientData.ingredients}
                    recipe={recipe}
                    servings={servings}
                    activeCheckboxes={activeCheckboxes}
                    setActiveCheckboxes={setActiveCheckboxes}
                    buttonDisabled={buttonDisabled}
                    setButtonDisabled={setButtonDisabled}
                    listType="ingredients"
                />
            }

            <RecipeSubNav navItems={["steps", "tools"]} setActiveTab={setActiveTab2} />
            {activeTab2 === "steps" ? <Steps steps={recipe.analyzedInstructions[0].steps} /> :
                <ItemList
                    recipeItems={equipmentData.equipment}
                    recipe={recipe}
                    servings={servings}
                    activeCheckboxes={activeCheckboxes}
                    setActiveCheckboxes={setActiveCheckboxes}
                    buttonDisabled={buttonDisabled}
                    setButtonDisabled={setButtonDisabled}
                    listType="equipment"
                />
            }

            {activeTab === "ingredients" || activeTab2 === "tools" ?
                <button
                    className={`recipe__shop-button ${buttonDisabled ? "" : "recipe__shop-button--active"}`}
                    type="button"
                    onClick={handleAddToShoppingList}
                    disabled={buttonDisabled}
                >
                    Add to shopping list
                </button> : ""
            }
        </main>
    );
};
