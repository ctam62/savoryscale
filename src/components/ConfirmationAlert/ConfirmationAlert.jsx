import './ConfirmationAlert.scss';
import removeIcon from '../../assets/icons/remove.svg';


export const ConfirmationAlert = ({ open, handleClose }) => {
    return (
        <article className={`confirm ${!open ? "confirm--close" : ""}`}>
            <p className="confirm__message">Your ingredients have been sucessfully added to your shopping list</p>
            <img src={removeIcon} alt="close" className="confirm__close" onClick={handleClose} />
        </article>
    );
};
