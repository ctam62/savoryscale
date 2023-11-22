import './Card.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import likeIcon from '../../assets/icons/like.svg';
import likeActiveIcon from '../../assets/icons/like-active.svg';
import clockIcon from '../../assets/icons/clock.svg';

export const Card = ({ id, title, image, cookTime, handleLikeButton, inCollection }) => {

    const [quantityToShow, setQuantityToShow] = useState(1);

    const navigate = useNavigate();

    return (
        <article className="card">
            <button className="card__button" type="button">
                <img src={inCollection ? likeActiveIcon : likeIcon} alt="like icon" className="card__like" onClick={handleLikeButton} />
            </button>
            <div className="card__body" onClick={() => navigate(`/recipe/${id}}`)}>
                <img className="card__image" src={image} alt={title} />
                <div className="card__text">
                    <h3 className="card__title">{title}</h3>
                    <div className="card__details">
                        <p><img className="card__icons" src={clockIcon} />{cookTime} min</p>
                    </div>
                </div>
            </div>
        </article>
    )
}
