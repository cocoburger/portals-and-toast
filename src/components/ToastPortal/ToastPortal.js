import { useToastPortal, useToastAutoClose } from 'hooks';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Toast } from '../Toast';
import { uuidv4 } from '../../shared';

export const ToastPortal = forwardRef(
    ({ autoClose, autoCloseTime = 5000 }, ref) => {
        const [toasts, setToasts] = useState([]);
        const { loaded, portalId } = useToastPortal();

        const removeToast = (id) => {
            setToasts(toasts.filter((t) => t.id !== id));
        };

        useToastAutoClose({
            toasts,
            setToasts,
            autoClose,
            autoCloseTime,
        });

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
