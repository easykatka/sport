import React from 'react';
import { Button } from '@material-ui/core';
import Image from 'next/image';

interface MainFormProps {
    onOpenLogin: () => void;
}

export const MainForm: React.FC<MainFormProps> = ({ onOpenLogin }) => {
    return (
        <>
            <div>
                <Button className='mb-15' variant='contained' fullWidth>
                    <Image src='/static/img/vk.svg' width='24' height='24' /> ВКонтакте
                </Button>
                <Button className='mb-15' variant='contained' fullWidth>
                    <Image src='/static/img/google.svg' width='24' height='24' /> Google
                </Button>
                <Button onClick={onOpenLogin} className='mb-15' variant='contained' fullWidth>
                    <Image src='/static/img/mail.svg' width='24' height='24' /> Через почту
                </Button>
            </div>
        </>
    );
};
