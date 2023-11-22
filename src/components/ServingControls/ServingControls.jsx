import './ServingControls.scss';
import { useState } from 'react';
import minusIcon from '../../assets/icons/minus.svg';
import plusIcon from '../../assets/icons/plus.svg';

export const ServingControls = ({ recipe }) => {

    const [servings, setServings] = useState(recipe.servings);

    return (
        <article className="recipe__servings">
            <h3>Servings</h3>
            <div className="recipe__controls">
                <button className="recipe__button recipe__button--controls" onClick={() => setServings(servings - 1)}>
                    <img className="recipe__icons" src={minusIcon} alt="minus icon" />
                </button>

                {servings}

                <button className="recipe__button recipe__button--controls" onClick={() => setServings(servings + 1)}>
                    <img className="recipe__icons" src={plusIcon} alt="add icon" />
                </button>
            </div>
        </article>
    );
};
