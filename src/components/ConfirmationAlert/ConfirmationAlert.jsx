import './ConfirmationAlert.scss';
import { useNavigate } from 'react-router-dom';
import removeIcon from '../../assets/icons/remove.svg';


export const ConfirmationAlert = ({ open, handleClose, message, buttonText, redirectPath }) => {
    const navigate = useNavigate();

    return (
        <article className={`confirm ${!open ? "confirm--close" : ""}`}>
            <p className="confirm__message">{message}</p>
            <button className="confirm__button" onClick={() => navigate(`${redirectPath}`)}>{buttonText}</button>
            <img src={removeIcon} alt="close" className="confirm__close" onClick={handleClose} />
        </article>
    );
};
