import './ConfirmationAlert.scss';
import { useNavigate } from 'react-router-dom';
import removeIcon from '../../assets/icons/remove.svg';


export const ConfirmationAlert = ({ open, handleClose }) => {
    const navigate = useNavigate();

    return (
        <article className={`confirm ${!open ? "confirm--close" : ""}`}>
            <p className="confirm__message">Your ingredients have been sucessfully added to your shopping list</p>
            <button className="confirm__button" onClick={() => navigate('/shoppinglist')}>View Shopping List</button>
            <img src={removeIcon} alt="close" className="confirm__close" onClick={handleClose} />
        </article>
    );
};
