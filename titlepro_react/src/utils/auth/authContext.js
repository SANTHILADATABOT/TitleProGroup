import React, { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Define the initial state of the authentication
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Define action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Create a reducer function to handle actions
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { isAuthenticated: true, user: action.payload };
    case LOGOUT:
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Define actions
  const loginAuth = (userData) => {
    dispatch({ type: LOGIN, payload: userData });
    // Save to localStorage or cookie if needed
  };

  const logoutAuth = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ state, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
