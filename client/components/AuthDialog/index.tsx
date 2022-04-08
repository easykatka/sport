import React from 'react';
import { Dialog, DialogContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoginForm } from './forms/Login';
import { RegisterForm } from './forms/Register';
import styles from './AuthDialog.module.scss';

interface AuthDialogProps {
    onClose: () => void;
    visible: boolean;
}

enum FormValues {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
    const [formType, setFormType] = React.useState<FormValues>(FormValues.LOGIN);
    return (
        <Dialog open={visible} onClose={onClose} fullWidth>
            <DialogContent>
                <div className={styles.content}>
                    <Typography className={styles.title}>
                        {formType === FormValues.LOGIN ? (
                            'Вход в СОЮЗ'
                        ) : (
                            <span onClick={() => setFormType(FormValues.LOGIN)} className={styles.backTitle}>
                                <ArrowBackIcon /> К авторизации
                            </span>
                        )}
                    </Typography>
                    {formType === FormValues.LOGIN && (
                        <LoginForm onOpenRegister={() => setFormType(FormValues.REGISTER)} onClose={onClose} />
                    )}
                    {formType === FormValues.REGISTER && <RegisterForm onClose={onClose} />}
                </div>
            </DialogContent>
        </Dialog>
    );
};
