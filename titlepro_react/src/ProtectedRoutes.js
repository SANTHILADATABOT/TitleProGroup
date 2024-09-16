import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import UserRightsRepository from "./repositories/UserRightsRepository";
import CommonVariables from "./layouts/CommonVariables";
export const ProtectedRoute = ({ children, unique }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to indicate "unknown" state
  const user = JSON.parse(localStorage.getItem("authData"));

  var [user_rights, set_user_rights] = useState({});

  const fetch_data = async () => {
    var response1 = await UserRightsRepository.get_user_rights({
      user_type_id: CommonVariables?.userDetails?.user_type_id,
      user_screen_id: unique,
    });
    if (response1) {
      if (response1?.status === "SUCCESS") {
        set_user_rights(response1?.get_user_rights);
      }
    }
  };
  useEffect(() => {
    fetch_data();
  }, [CommonVariables]);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  if (isAuthenticated === null) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PropagateLoader color="#4c85a9" />
      </div>
    );
  }
  if (user_rights?.view_rights === "0") {
    return <Navigate to="/" replace />;
  }
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" replace />;
};
