import './LoginForm.scss';

export const LoginForm = () => {
    return (
        <form className="login-form">
            <input
                className="login-form__input"
                type="email"
                name="email"
                placeholder="email"
                autoComplete="off"
            />
            <input
                className="login-form__input"
                type="password"
                name="password"
                placeholder="password"
                autoComplete="confirm-password"
            />
            <button className="login-form__button" type="submit">Login</button>
        </form>
    );
};
