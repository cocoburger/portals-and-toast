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

export const ToastPortal = forwardRef(({ autoClose, autoCloseTime }, ref) => {
    const [toasts, setToasts] = useState([]);
    const { loaded, portalId } = useToastPortal();
    const toastRef = useRef();
    useEffect(() => {
        if (toasts.length) {
            toastRef.current = setTimeout(() => {
                removeToast(toasts[toasts.length - 1].id);
            }, 2000);
        }
        return () => {
            clearTimeout(toastRef.current);
            toastRef.current = null;
        };
    }, [toasts]);

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
});
