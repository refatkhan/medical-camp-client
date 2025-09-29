import React, { createContext, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AlertContext = createContext(null);
const MySwal = withReactContent(Swal);

export const AlertProvider = ({ children }) => {
  const showAlert = (options) => {
    return MySwal.fire(options);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook for easier usage
export const useAlert = () => useContext(AlertContext);
