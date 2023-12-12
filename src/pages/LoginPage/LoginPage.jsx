import './LoginPage.scss';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoHeader } from '../../components/LogoHeader/LogoHeader';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';
import googleIcon from '../../assets/icons/google.svg';


export const LoginPage = ({ apiUrl, open, setOpen, handleClose, setFailedAuth }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${apiUrl}/api/user/login`, {
                email: event.target.email.value,
                password: event.target.password.value
            })
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                setFailedAuth(false);
                setOpen(true);
                navigate('/');
            })
            .catch((error) => {
                setOpen(true);
                setError(error.response?.data);
                setFailedAuth(true);
            });


    };

    return (
        <main className="login">
            {error && <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message={error}
                error={true}
                redirect={false}
            />}

            <LogoHeader />

            <section className="login__content">
                <h2 className="login__subheader">Login</h2>

                <LoginForm handleSubmit={handleSubmit} error={error} />

                <button
                    className="login__button login__button--google"
                    onClick={() => navigate('/')}>
                    <img className="login__button-icon" src={googleIcon} alt="google icon" />
                    Sign In with Google
                </button>

                <div className="login__links">
                    <Link to="/welcome" className="login__nav-link">Forgot password?</Link>
                    <Link to="/signup" className="login__nav-link">Don't have an account? Register</Link>
                </div>

                <p className="login__terms">By logging in, you are agreeing to our
                    <Link to="/" className="login__nav-link"> User Agreement</Link> and
                    <Link to="/" className="login__nav-link"> Privacy Policy</Link>
                </p>
            </section>
        </main>
    );
};
