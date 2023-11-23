import './RecipeHero.scss';
import clockIcon from '../../assets/icons/clock.svg';
import calIcon from '../../assets/icons/fire.svg';

export const RecipeHero = ({ recipe }) => {
    return (
        <section className="recipe-hero">
            <img className="recipe-hero__image" src={recipe.image} alt="recipe images" />

            <h2 className="recipe-hero__subheader">{recipe.title}</h2>
            <h3>{`${recipe.cuisines.length !== 0 ? (recipe.cuisines.slice(-1) + " Cuisine") : ""}`}</h3>
            <div className="recipe-hero__stats">
                <div className="recipe-hero__time">
                    <img className="recipe-hero__stats-icons" src={clockIcon} alt="cooking time icon" />
                    <p className="recipe-hero__stats-text">{recipe.readyInMinutes} min</p>
                </div>
                <div className="recipe-hero__cals">
                    <img className="recipe-hero__stats-icons" src={calIcon} alt="cals icons" />
                    <p className="recipe-hero__stats-text">
                        {parseInt(recipe.nutrition.nutrients.find(item => item.name === "Calories").amount)} kcal
                    </p>
                </div>
            </div>
        </section>
    );
};
