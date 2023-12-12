import './../../styles/form-page.scss';
import axios from 'axios';
import { useState } from 'react';
import { LogoHeader } from '../../components/LogoHeader/LogoHeader';
import { ConfirmationAlert } from '../../components/ConfirmationAlert/ConfirmationAlert';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';
import { formControlClasses } from '@mui/material';


export const ResetPassword = ({ apiUrl, open, setOpen, handleClose, setFailAuth }) => {
    const [error, setError] = useState("");
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

            <ResetPasswordForm />
        </main>
    );
};
