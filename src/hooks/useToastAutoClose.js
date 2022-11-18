import { useEffect, useRef, useState } from 'react';

export const useToastAutoClose = ({
    toasts,
    setToasts,
    autoClose,
    autoCloseTime,
}) => {
    const [removing, setRemoving] = useState('');
    const toastRef = useRef();

    useEffect(() => {
        if (removing) {
            setToasts((t) => t.filter((_t) => _t.id !== removing));
        }
    }, [removing, setToasts]);

    useEffect(() => {
        if (autoClose && toasts.length) {
            const id = toasts[toasts.length - 1].id;
            setTimeout(() => {
                setRemoving(id);
            }, autoCloseTime);
        } else {
            clearTimeout(toastRef.current);
            toastRef.current = null;
        }
    }, [toasts, autoClose, autoCloseTime]);

    useEffect(() => {
        return () => {
            clearTimeout(toastRef.current);
            toastRef.current = null;
        };
    }, []);
};
