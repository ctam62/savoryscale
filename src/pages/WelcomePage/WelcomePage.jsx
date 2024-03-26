import './WelcomePage.scss';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logos/justice-scale1.svg';
import googleIcon from '../../assets/icons/google.svg';


export const WelcomePage = () => {

    const navigate = useNavigate();

    return (
        <main className="welcome">
            <header className="welcome__header">
                <h1 className="welcome__logo">SavoryScale</h1>
                <img src={logo} alt="savory scale logo" className="header__logo-img" />
            </header>

            <section className="welcome__content">
                <h2 className="welcome__subheader">Welcome!</h2>
                <h3 className="welcome__subsubheader">Create an account or login</h3>

                <nav className="welcome__nav">
                    <button
                        className="welcome__nav-button welcome__nav-button--signup"
                        onClick={() => navigate('/signup')}>
                        Sign up
                    </button>
                    <button className="welcome__nav-button" onClick={() => navigate('/login')}>Login</button>

                    <p className="welcome__terms">By signing up, you are agreeing to our
                        <Link to="/" className="welcome__nav-link"> User Agreement</Link> and
                        <Link to="/" className="welcome__nav-link"> Privacy Policy</Link>
                    </p>
                </nav>
            </section>
        </main>
    );
};
