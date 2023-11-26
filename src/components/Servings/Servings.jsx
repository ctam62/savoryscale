import './Servings.scss';
import minusIcon from '../../assets/icons/minus.svg';
import plusIcon from '../../assets/icons/plus.svg';

export const Servings = ({ servings, setServings }) => {
    return (
        <article className="servings">
            <h3>Servings</h3>
            <div className="servings__controls">
                <button className="recipe__button recipe__button--controls" onClick={() => setServings(servings - 1)}>
                    <img className="servings__icons" src={minusIcon} alt="minus icon" />
                </button>

                {servings}

                <button className="recipe__button recipe__button--controls" onClick={() => setServings(servings + 1)}>
                    <img className="servings__icons" src={plusIcon} alt="add icon" />
                </button>
            </div>
        </article>
    );
};
