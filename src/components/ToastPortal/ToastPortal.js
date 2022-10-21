import { useToastPortal } from 'hooks';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Toast } from '../Toast';
import { uuidv4 } from '../../shared';

export const ToastPortal = forwardRef(
    ({ autoClose, autoCloseTime = 5000 }, ref) => {
        const [toasts, setToasts] = useState([]);
        const { loaded, portalId } = useToastPortal();
        const [removing, setRemoving] = useState('');

        const toastRef = useRef();

        useEffect(() => {
            if (removing) {
                setToasts((toast) =>
                    toast.filter((_toast) => _toast.id !== removing),
                );
            }
        }, [removing]);

        useEffect(() => {
            if (autoClose && toasts.length) {
                if (!toastRef.current) {
                    toastRef.current = setTimeout(() => {
                        const id = toasts[toasts.length - 1].id;
                        setRemoving(id);
                    }, autoCloseTime);
                }
            } else {
                if (toastRef.current) {
                    clearTimeout(toastRef.current);
                    toastRef.current = null;
                }
            }
            return () => {
                clearTimeout(toastRef.current);
                toastRef.current = null;
            };
        }, [toasts, autoClose, autoCloseTime]);

        const removeToast = (id) => {
            setToasts(toasts.filter((t) => t.id !== id));
        };

        // const addMessage = (toast) => {
        //     setToasts([...toasts, { ...toast, id: uuidv4() }]);
        // };

        useImperativeHandle(ref, () => ({
            addMessage(toast) {
                setToasts([...toasts, { ...toast, id: uuidv4() }]);
            },
        }));

        return loaded ? (
            ReactDOM.createPortal(
                <div className={styles.toastContainer}>
                    {toasts.map((t) => (
                        <Toast
                            key={t.id}
                            mode={t.mode}
                            message={t.message}
                            onClose={() => removeToast(t.id)}
                        />
                    ))}
                </div>,
                document.getElementById(portalId),
            )
        ) : (
            <></>
        );
    },
);
