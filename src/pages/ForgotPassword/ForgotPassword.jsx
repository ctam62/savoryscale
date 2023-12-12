import './../../styles/form-page.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LogoHeader } from '../../components/LogoHeader/LogoHeader';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';
import { ForgotPasswordForm } from '../../components/ForgotPasswordForm/ForgotPasswordForm';


export const ForgotPassword = ({ apiUrl, open, setOpen, handleClose, setFailAuth }) => {
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {

    }, []);

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

            <ForgotPasswordForm handleSubmit={handleSubmit} />
        </main>
    );
};
