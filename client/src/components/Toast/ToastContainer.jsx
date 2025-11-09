const iconByType = {
  success: '✓',
  danger: '⚠',
  warning: '⚠',
  info: 'ℹ',
};

const ToastContainer = ({ toasts, onDismiss }) => (
  <div className="toast-container">
    {toasts.map((toast) => (
      <div key={toast.id} className={`toast ${toast.type}`}>
        <div className="toast-icon">{iconByType[toast.type] ?? 'ℹ'}</div>
        <div className="toast-content">
          <h4>{toast.title}</h4>
          <p>{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: '16px',
            cursor: 'pointer',
            marginLeft: '8px',
          }}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    ))}
  </div>
);

export default ToastContainer;
