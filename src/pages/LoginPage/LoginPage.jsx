import '../../styles/form-page.scss';
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
        <main className="form-page">
            {error && <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message={error}
                error={true}
                redirect={false}
            />}

            <LogoHeader />

            <section className="form-page__content">
                <h2 className="form-page__subheader">Login</h2>

                <LoginForm handleSubmit={handleSubmit} error={error} />

                <button
                    className="form-page__button form-page__button--google"
                    onClick={() => navigate('/')}>
                    <img className="form-page__button-icon" src={googleIcon} alt="google icon" />
                    Sign In with Google
                </button>

                <div className="form-page__links">
                    <Link to="/forgot-password" className="form-page__nav-link">Forgot password?</Link>
                    <Link to="/signup" className="form-page__nav-link">Don't have an account? Register</Link>
                </div>

                <p className="form-page__terms">By logging in, you are agreeing to our
                    <Link to="/" className="form-page__nav-link"> User Agreement</Link> and
                    <Link to="/" className="form-page__nav-link"> Privacy Policy</Link>
                </p>
            </section>
        </main>
    );
};
