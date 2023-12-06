import './SignUpForm.scss';

export const SignUpForm = () => {
    return (
        <form className="signup-form">
            {/* <div className="signup-form__group"> */}
            <input
                className="signup-form__input"
                type="text" name="username"
                placeholder="username"
                autoComplete="username"
            />
            <input
                className="signup-form__input"
                type="email"
                name="email"
                placeholder="email address"
                autoComplete="off"
            />
            {/* </div> */}
            {/* <div className="signup-form__group"> */}
            <input
                className="signup-form__input"
                type="password"
                name="password"
                placeholder="password"
                autoComplete="new-password"
            />
            <input
                className="signup-form__input"
                type="password"
                name="confirm-password"
                placeholder="confirm password"
                autoComplete="confirm-password"
            />
            {/* </div> */}
            <button className="signup-form__button" type="submit">Sign Up</button>
        </form>
    );
};
