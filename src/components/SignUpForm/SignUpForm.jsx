import './SignUpForm.scss';


export const SignUpForm = ({ handleSubmit }) => {
    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form__group">
                <input
                    className="signup-form__input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username*"
                    autoComplete="username"
                />
                <input
                    className="signup-form__input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email*"
                    autoComplete="off"
                />
            </div>

            <div className="signup-form__group">
                <input
                    className="signup-form__input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password*"
                    autoComplete="new-password"
                />
                <input
                    className="signup-form__input"
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="confirm password*"
                    autoComplete="confirm-password"
                />
            </div>

            <button className="signup-form__button" type="submit">Sign Up</button>
        </form>
    );
};
