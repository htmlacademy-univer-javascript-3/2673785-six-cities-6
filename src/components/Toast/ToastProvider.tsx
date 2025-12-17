import {FC, createContext, useState, useCallback, ReactNode} from 'react';
import {Toast, ToastType} from './Toast.tsx';
import styles from './ToastProvider.module.scss';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const ToastProvider: FC<ToastProviderProps> = (
  {
    children,
    position = 'top-right'
  }
) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType, duration = 5000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    setToasts((prev) => [...prev, {id, message, type, duration}]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration + 300);
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  const showError = useCallback((message: string, duration?: number) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  const showInfo = useCallback((message: string, duration?: number) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  const getPositionClass = () => {
    switch (position) {
      case 'top-right':
        return styles.toastContainer__topRight;
      case 'top-left':
        return styles.toastContainer__topLeft;
      case 'bottom-right':
        return styles.toastContainer__bottomRight;
      case 'bottom-left':
        return styles.toastContainer__bottomLeft;
      default:
        return styles.toastContainer__topRight;
    }
  };

  return (
    <ToastContext.Provider value={{
      showToast,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}
    >
      {children}

      <div className={`${styles.toastContainer} ${getPositionClass()}`}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
