import React, { useEffect } from 'react';

function Alert({msg, type, showAlert, list }) {
  useEffect(() => {
    let alertTimeout = setTimeout(() => {
      showAlert();
    }, 2000);
    return () => clearTimeout(alertTimeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default Alert;