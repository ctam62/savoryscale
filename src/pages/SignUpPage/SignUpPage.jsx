
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoHeader } from '../../components/LogoHeader/LogoHeader';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';


export const SignUpPage = ({ apiUrl, open, setOpen, handleClose }) => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${apiUrl}/api/users/register`, {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
            })
            .then(() => {
                setSuccess(true);
                setOpen(true);
                setError("");
                event.target.reset();
            })
            .catch((error) => {
                setSuccess(false);
                setOpen(true);
                setError(error.response.data);
            });
    };

    return (
        <main className="login">

            {success && <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message="Your account has successfully been created."
                buttonText="Login Here"
                error={false}
                redirect={true}
                redirectPath="/login"
            />}

            {error && <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message={error}
                error={true}
                redirect={false}
            />}

            <LogoHeader />

            <section className="login__content">
                <h2 className="login__subheader">Register</h2>

                <SignUpForm
                    handleSubmit={handleSubmit}
                    success={success}
                    error={error}
                />

                <div className="login__links">
                    <Link to="/" className="login__nav-link">Forgot password?</Link>
                    <Link to="/login" className="login__nav-link">Already have an account? Login!</Link>
                </div>

                <p className="login__terms">By signing up, you are agreeing to our
                    <Link to="/" className="login__nav-link"> User Agreement</Link> and
                    <Link to="/" className="login__nav-link"> Privacy Policy</Link>
                </p>
            </section>
        </main>
    );
};

