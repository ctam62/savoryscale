import './../../styles/form-page.scss';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoHeader } from '../../components/LogoHeader/LogoHeader';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';
import { ForgotPasswordForm } from '../../components/ForgotPasswordForm/ForgotPasswordForm';


export const ForgotPassword = ({ apiUrl, open, setOpen, handleClose }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        axios
            .post(`${apiUrl}/api/user`, {
                email: email,
            })
            .then((response) => {
                const userEmail = response.data.email;
                setSuccess(true);
                setOpen(true);
                console.log(`User with email exits! Send email to ${userEmail}`);
            })
            .catch((error) => {
                setSuccess(false);
                setOpen(true);
                setError(error.response.data);
            });
    }

    return (
        <main className="form-page">
            {success && <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message="An email has been sent to reset your password."
                error={false}
                redirect={false}
            />}

            {error && <ConfirmationAlert
                open={open}
                handleClose={handleClose}
                message={error}
                error={true}
                redirect={false}
            />}

            <LogoHeader />

            <section className="form-page__content">
                <h2 className="form-page__subheader">Forgot password</h2>

                <ForgotPasswordForm
                    handleSubmit={handleSubmit}
                    success={success}
                    error={error}
                />

                <div className="form-page__links">
                    <Link to="/login" className="form-page__nav-link form-page__nav-link--forgot">Back to Login</Link>
                </div>
            </section>
        </main>
    );
};
