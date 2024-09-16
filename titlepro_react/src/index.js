import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import "./assets/css/App.css";
import Web from "./routes/Web";
import reportWebVitals from "./reportWebVitals";
import "select2/dist/css/select2.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { AuthProvider } from "./utils/auth/authContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <Web />
        </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
