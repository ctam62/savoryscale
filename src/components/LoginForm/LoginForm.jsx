import './LoginForm.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const LoginForm = ({ handleSubmit }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

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
            <div className="login-form__links">
                <label
                    htmlFor="remember"
                    className="login-form__checkbox-label">
                    <input
                        className="login-form__checkbox"
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                        id="remember"
                        name="remember"
                    />
                    Remember me
                </label>
                <Link
                    to="/forgot-password"
                    className="form-page__nav-link form-page__nav-link--forgot">
                    Forgot password?
                </Link>
            </div>
            <button className="login-form__button" type="submit">Sign In</button>
        </form>
    );
};
