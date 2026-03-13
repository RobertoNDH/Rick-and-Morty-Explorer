import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <h3 className="error-title">¡Ocurrió un problema!</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="btn-retry" onClick={onRetry}>
          Reintentar conexión
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;