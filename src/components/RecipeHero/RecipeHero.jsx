import './RecipeHero.scss';
import { useEffect } from 'react';
import clockIcon from '../../assets/icons/clock.svg';
import calIcon from '../../assets/icons/fire.svg';
import moneyIcon from '../../assets/icons/price.svg';

export const RecipeHero = ({ recipe, servings }) => {
    const cals = Math.floor(recipe.nutrition.nutrients.find(item => item.name === "Calories").amount / recipe.servings * servings);
    const cost = ((recipe.pricePerServing / 100) * servings).toFixed(2);

    const handleServingChange = () => {
        const storedDetails = JSON.parse(sessionStorage.getItem("recipeDetails"));

        if (Object.keys(storedDetails).length !== 0) {
            storedDetails.nutrition.nutrients.find(item => item.name === "Calories").amount = cals;
            sessionStorage.setItem("recipeDetails", JSON.stringify(storedDetails));
        }
    };

    useEffect(() => {
        handleServingChange();
    }, [servings]);

    return (
        <section className="recipe-hero">
            <img className="recipe-hero__image" src={recipe.image} alt="recipe images" />

            <h2 className="recipe-hero__subheader">{recipe.title}</h2>
            <h3>{`${recipe.cuisines.length !== 0 ? (recipe.cuisines.slice(-1) + " Cuisine") : ""}`}</h3>
            <div className="recipe-hero__info">
                <div className="recipe-hero__time">
                    <img className="recipe-hero__info-icons" src={clockIcon} alt="cooking time icon" />
                    <p className="recipe-hero__info-text">{recipe.readyInMinutes} min</p>
                </div>
                <div className="recipe-hero__price">
                    <img className="recipe-hero__info-icons" src={moneyIcon} alt="price icon" />
                    <p className="recipe-hero__info-text">Est. {cost}</p>
                </div>
                <div className="recipe-hero__cals">
                    <img className="recipe-hero__info-icons" src={calIcon} alt="cals icons" />
                    <p className="recipe-hero__info-text">
                        {cals} kcal
                    </p>
                </div>
            </div>
        </section>
    );
};
