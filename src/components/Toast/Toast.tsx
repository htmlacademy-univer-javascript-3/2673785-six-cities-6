import {FC, useCallback, useEffect, useState} from 'react';
import styles from './Toast.module.scss';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: FC<ToastProps> = (
  {
    id,
    message,
    type,
    duration = 5000,
    onClose
  }
) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [handleClose, duration]);

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  const getToastClass = () => {
    const baseClass = styles.toast;
    const typeClass = styles[`toast__${type}`];
    const animationClass = isExiting ? styles.toast__exiting : '';

    return `${baseClass} ${typeClass} ${animationClass}`.trim();
  };

  return (
    <div className={getToastClass()} role="alert">
      <div className={styles.toast__icon}>{getToastIcon()}</div>
      <div className={styles.toast__content}>
        <p className={styles.toast__message}>{message}</p>
      </div>
      <button
        className={styles.toast__close}
        onClick={handleClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};
