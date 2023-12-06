import './LoginPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LogoHeader } from '../../components/LogoHeader/LogoHeader';
import { LoginForm } from '../../components/LoginForm/LoginForm';


export const LoginPage = ({ apiUrl }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${apiUrl}/api/users/login`, {
            email: event.target.email.value,
            password: event.target.password.value
        })
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                navigate('/');
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

    return (
        <main className="login">
            <LogoHeader />

            <section className="login__content">
                <h2 className="login__subheader">Login</h2>

                <LoginForm handleSubmit={handleSubmit} error={error} />

                <div className="login__links">
                    <Link to="/" className="login__nav-link">Forgot password?</Link>
                    <Link to="/" className="login__nav-link">Create an account!</Link>
                </div>

                <p className="login__terms">By logging in, you are agreeing to our
                    <Link to="/" className="login__nav-link"> User Agreement</Link> and
                    <Link to="/" className="login__nav-link"> Privacy Policy</Link>
                </p>
            </section>
        </main>
    );
};
