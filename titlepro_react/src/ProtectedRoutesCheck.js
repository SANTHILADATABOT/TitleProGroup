export const ProtectedRoutesCheck = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("authData"));
  if (!user) {
    localStorage.removeItem("authData");
    return false;
  }else{
    return true;
  }
};

