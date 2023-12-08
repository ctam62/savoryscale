import './Card.scss';
import { useNavigate } from 'react-router-dom';
import likeIcon from '../../assets/icons/like.svg';
import likeActiveIcon from '../../assets/icons/like-active.svg';
import clockIcon from '../../assets/icons/clock.svg';
import removeIcon from '../../assets/icons/delete.svg';


export const Card = ({ id, result, title, image, cookTime, handleLikeButton, handleRemoveButton, inCollection, listSection }) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (listSection === "scaled") {
            navigate(`/recipe/${id}/scaled`);
        } else {
            navigate(`/recipe/${id}`);
        }

        result.origServings = result.servings;
        localStorage.setItem("recipeDetails", JSON.stringify(result));
    };

    return (
        <article className="card">
            <div className="card__header">
                <button className="card__button" type="button">
                    {listSection === 'scaled' ?
                        <img
                            className="card__like"
                            src={removeIcon}
                            alt="like icon add recipe to like list"
                            onClick={handleRemoveButton}
                        /> :
                        <img
                            className="card__like"
                            src={inCollection ? likeActiveIcon : likeIcon}
                            alt="like icon add recipe to like list"
                            onClick={handleLikeButton}
                        />
                    }
                </button>
            </div>
            <div className="card__body" onClick={handleNavigate}>
                <img className="card__image" src={image} alt={title} />
                <div className="card__text">
                    <h3 className="card__title">{title}</h3>
                    <div className="card__details">
                        <p><img className="card__icons" src={clockIcon} />{cookTime} min</p>
                    </div>
                </div>
            </div>
        </article>
    );
};
