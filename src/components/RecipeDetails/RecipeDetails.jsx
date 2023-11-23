import './RecipeDetails.scss';
import parseHTML from 'html-react-parser';

export const RecipeDetails = ({ recipe, servings }) => {
    return (
        <section className="recipe-details">
            <article className="recipe-details__nutrition">
                <div className="recipe-details__item">
                    <p>{parseInt(recipe.nutrition.weightPerServing.amount) * servings} g
                    </p>
                    <p className="recipe-details__text">Weight</p>
                </div>
                <div className="recipe-details__item">
                    <p className="recipe-details__value">
                        {parseInt(recipe.nutrition.nutrients.find(item => item.name === "Protein").amount) * servings} g
                    </p>
                    <p className="recipe-details__text">Protein</p>
                </div>
                <div className="recipe-details__item">
                    <p className="recipe-details__value">
                        {parseInt(recipe.nutrition.nutrients.find(item => item.name === "Carbohydrates").amount) * servings} g
                    </p>
                    <p className="recipe-details__text">Carbs</p>
                </div>
                <div className="recipe-details__item">
                    <p className="recipe-details__value">
                        {parseInt(recipe.nutrition.nutrients.find(item => item.name === "Fat").amount) * servings} g
                    </p>
                    <p className="recipe-details__text">Fat</p>
                </div>
            </article>

            <p className="recipe-details__summary">
                {parseHTML(recipe.summary)}
            </p>
        </section>
    )
}
