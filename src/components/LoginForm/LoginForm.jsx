import './LoginForm.scss';


export const LoginForm = ({ handleSubmit }) => {
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                className="login-form__input"
                type="text"
                id="email"
                name="email"
                placeholder="email*"
                autoComplete="off"
            />
            <input
                className="login-form__input"
                type="password"
                id="password"
                name="password"
                placeholder="password*"
                autoComplete="confirm-password"
            />
            <button className="login-form__button" type="submit">Sign In</button>
        </form>
    );
};
