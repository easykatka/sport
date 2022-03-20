import React from 'react';
import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { MainForm } from './forms/Main';
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
        <Dialog open={visible} onClose={onClose} maxWidth='xs' fullWidth>
            <DialogContent>
                <div className={styles.content}>
                    <Typography className={styles.title}>
                    {formType === FormValues.LOGIN ? (
                        'Вход в СОЮЗ'
                    ) : (
                        <div onClick={() => setFormType(FormValues.LOGIN)} className={styles.backTitle}>
                            <ArrowBackIcon /> К авторизации
                        </div>
                    )}
                    </Typography>
                    {formType === FormValues.LOGIN && <LoginForm onOpenRegister={() => setFormType(FormValues.REGISTER)} />}
                    {formType === FormValues.REGISTER && <RegisterForm onOpenRegister={() => setFormType(FormValues.REGISTER)} onOpenLogin={() => setFormType(FormValues.LOGIN)}/>}
                </div>
            </DialogContent>
        </Dialog>
    );
};
