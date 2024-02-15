import './ForgotPasswordForm.scss';


export const ForgotPasswordForm = ({ handleSubmit }) => {
    return (
        <form className="forgot-password" onSubmit={handleSubmit}>
            <input
                className="signup-form__input"
                type="text"
                id="email"
                name="email"
                placeholder="email*"
                autoComplete="off"
            />
            <button
                className="forgot-password__button"
                type="submit"
            >
                Send Reset Link
            </button>
        </form>
    );
};
