import './Collection.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardGrid } from '../../components/CardGrid/CardGrid';
import backIcon from '../../assets/icons/back-arrow.svg';


export const Collection = ({ recipeList, setRecipeList, handleLikeButton }) => {
    const navigate = useNavigate();

    const [scaledRecipes, setScaledRecipes] = useState([]);

    const removeLikedRecipes = () => {
        setRecipeList([]);
        localStorage.setItem("recipeList", JSON.stringify([]));
    };

    const removeScaledRecipes = () => {
        setScaledRecipes([]);
        localStorage.setItem("scaledRecipes", JSON.stringify([]));
        localStorage.setItem("scaledIngredients", JSON.stringify([]));
    };

    useEffect(() => {
        setScaledRecipes(JSON.parse(localStorage.getItem("scaledRecipes")) || []);
    }, []);

    return (
        <main className="collection">

            <nav className="collection__nav">
                <img className="recipe__icons" src={backIcon} alt="back page icon" onClick={() => navigate(-1)} />
            </nav>

            <section className="collection__section">
                <div className="collection__headings">
                    <h2 className="collection__header">My Collection</h2>
                    <div className="collection__info">
                        <p className="collection__subheader">{recipeList.length} recipes</p>
                        <button className="collection__clear" onClick={removeLikedRecipes}>Clear Collection</button>
                    </div>
                </div>

                <CardGrid
                    results={recipeList}
                    title="title"
                    image="image"
                    cookTime="readyInMinutes"
                    handleLikeButton={handleLikeButton}
                    recipeList={recipeList}
                    listSection="liked"
                />

                <div className="collection__headings">
                    <h3 className="collection__subheader">Scaled Recipes</h3>
                    <div className="collection__info">
                        <p className="collection__subheader">{scaledRecipes.length} recipes</p>
                        <button className="collection__clear" onClick={removeScaledRecipes}>Clear Collection</button>
                    </div>
                </div>
                <CardGrid
                    results={scaledRecipes}
                    title="title"
                    image="image"
                    cookTime="readyInMinutes"
                    handleLikeButton={handleLikeButton}
                    recipeList={recipeList}
                    listSection="scaled"
                />
            </section>

        </main>
    );
};
