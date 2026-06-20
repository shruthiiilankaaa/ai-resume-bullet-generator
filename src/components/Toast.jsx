import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === 'error';

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-glass border animate-slide-in"
      style={{
        background: isError ? 'rgba(127, 29, 29, 0.9)' : 'rgba(22, 25, 34, 0.95)',
        borderColor: isError ? 'rgba(248, 113, 113, 0.3)' : 'rgba(99, 102, 241, 0.3)',
        backdropFilter: 'blur(12px)',
      }}
      role="alert"
    >
      {isError ? (
        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      ) : (
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
      )}
      <span className="text-sm text-gray-100">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
