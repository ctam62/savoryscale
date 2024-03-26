import './ConfirmationAlert.scss';
import { useNavigate } from 'react-router-dom';
import removeIcon from '../../assets/icons/remove.svg';
import errorIcon from '../../assets/icons/error.svg';
import successIcon from '../../assets/icons/success.svg';


export const ConfirmationAlert = ({ open, handleClose, message, buttonText, error, redirect, redirectPath }) => {
    const navigate = useNavigate();

    return (
        <article className={`confirm ${!open ? "confirm--close" : ""} ${error && "confirm--error"}`}>
            <div className="confirm__content">
                <div className="confirm__content--left">
                    {error ? <img
                        className="confirm__icon"
                        src={errorIcon}
                        alt="error icon"
                    /> :
                        <img
                            className="confirm__icon"
                            src={successIcon}
                            alt="success icon"
                        />}
                    <div className="confirm__message">
                        <p>{message}</p>

                        {redirect && <button
                            className={`confirm__button ${error && "confirm__button--error"}`}
                            onClick={() => navigate(`${redirectPath}`)}>
                            {buttonText}
                        </button>}
                    </div>

                </div>
                <img
                    className="confirm__close"
                    src={removeIcon}
                    alt="close"
                    onClick={handleClose}
                />
            </div>
        </article>
    );
};
