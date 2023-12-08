import './Modal.scss';

export const Modal = ({ open, handleClose, form, validForm, modalTitle, modalMessage }) => {
    return (
        <ariticle className={`modal__overlay ${open ? "" : "modal--close"}`}>
            <div className="modal">
                <p className={`modal__header ${form && !validForm ? "modal--invalid" : "modal--valid"}`}>{modalTitle}</p>
                <p className="modal__body">{modalMessage}</p>
                <div className="modal__footer">
                    <button className={`modal__confirm ${form && !validForm ? "modal--invalid" : "modal--valid"}`} onClick={handleClose}></button>
                </div>
            </div>
        </ariticle>
    );
};
