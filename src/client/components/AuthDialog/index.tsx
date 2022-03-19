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
    MAIN = 'MAIN',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
    const [formType, setFormType] = React.useState<FormValues>(FormValues.MAIN);

    return (
        <Dialog open={visible} onClose={onClose} maxWidth='xs' fullWidth>
            <DialogContent>
                <DialogContentText>
                    <div className={styles.content}>
                        <Typography className={styles.title}>
                            {formType === FormValues.MAIN ? (
                                'Вход в СОЮЗ'
                            ) : (
                                <p onClick={() => setFormType(FormValues.MAIN)} className={styles.backTitle}>
                                    <ArrowBackIcon /> К авторизации
                                </p>
                            )}
                        </Typography>
                        {formType === FormValues.MAIN && <MainForm onOpenLogin={() => setFormType(FormValues.LOGIN)} />}
                        {formType === FormValues.LOGIN && (
                            <LoginForm onOpenRegister={() => setFormType(FormValues.REGISTER)} />
                        )}
                        {formType === FormValues.REGISTER && (
                            <RegisterForm
                                onOpenRegister={() => setFormType(FormValues.REGISTER)}
                                onOpenLogin={() => setFormType(FormValues.LOGIN)}
                            />
                        )}
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};
