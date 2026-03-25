import { useState, useCallback } from 'react';

const useFlashMessage = () => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error' | ''>('');

    const setFlashMessage = useCallback((msg: string, msgType: 'success' | 'error') => {
        setMessage(msg);
        setType(msgType);

        setTimeout(() => {
            setMessage('');
            setType('');
        }, 3000);
    }, []);

    return { message, type, setFlashMessage };
};

export default useFlashMessage;
