import './RecipeDetails.scss';
import parseHTML from 'html-react-parser';

export const RecipeDetails = ({ recipe, servings }) => {

    const scale = (origValue) => {
        const scaleFactor = parseInt(origValue / recipe.servings);
        return Math.floor(servings * scaleFactor);
    }

    const protein = scale(recipe.nutrition.nutrients.find(item => item.name === "Protein").amount);
    const carbs = scale(recipe.nutrition.nutrients.find(item => item.name === "Carbohydrates").amount);
    const fat = scale(recipe.nutrition.nutrients.find(item => item.name === "Fat").amount);

    return (
        <section className="recipe-details">
            <article className="recipe-details__nutrition">
                <div className="recipe-details__item">
                    <p>{Math.floor(recipe.nutrition.weightPerServing.amount * servings)} g
                    </p>
                    <p className="recipe-details__text">Weight</p>
                </div>
                <div className="recipe-details__item">
                    <p className="recipe-details__value">
                        {protein} g
                    </p>
                    <p className="recipe-details__text">Protein</p>
                </div>
                <div className="recipe-details__item">
                    <p className="recipe-details__value">
                        {carbs} g
                    </p>
                    <p className="recipe-details__text">Carbs</p>
                </div>
                <div className="recipe-details__item">
                    <p className="recipe-details__value">
                        {fat} g
                    </p>
                    <p className="recipe-details__text">Fat</p>
                </div>
            </article>

            <p className="recipe-details__summary">
                {parseHTML(recipe.summary.replace(/(\b[^.!?]+spoonacular.*$)/g, ''))}
            </p>
        </section>
    );
};
