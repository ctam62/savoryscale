import { Link } from 'react-router-dom';
import { LogoHeader } from '../../components/LogoHeader/LogoHeader';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';


export const SignUpPage = () => {
    return (
        <main className="login">
            <LogoHeader />

            <section className="login__content">
                <h2 className="login__subheader">Register</h2>

                <SignUpForm />

                <div className="login__links">
                    <Link to="/" className="login__nav-link">Forgot password?</Link>
                    <Link to="/" className="login__nav-link">Already have an account? Login!</Link>
                </div>

                <p className="login__terms">By signing up, you are agreeing to our
                    <Link to="/" className="login__nav-link"> User Agreement</Link> and
                    <Link to="/" className="login__nav-link"> Privacy Policy</Link>
                </p>
            </section>
        </main>
    );
};

