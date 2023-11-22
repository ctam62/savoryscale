import './Card.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import likeIcon from '../../assets/icons/like.svg';
import likeActiveIcon from '../../assets/icons/like-active.svg';
import clockIcon from '../../assets/icons/clock.svg';

export const Card = ({ id, title, image, cookTime, difficulty, inCollection }) => {

    const [quantityToShow, setQuantityToShow] = useState(1);

    const navigate = useNavigate();

    return (
        <article className="card" onClick={() => navigate(`/recipe/${id}}`)}>
            <button className="card__button" type="button">
                <img src={likeIcon} alt="like icon" className="card__like" />
            </button>
            <img className="card__image" src={image} alt={title} />
            <div className="card__text">
                <h3 className="card__title">{title}</h3>
                <div className="card__details">
                    <p><img className="card__icons" src={clockIcon} />{cookTime} min</p>
                </div>
            </div>
        </article>
    )
}
