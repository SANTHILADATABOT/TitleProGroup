import SignIn from "../src/pages/signin";

const AuthPage = ({page}) => {
    return (
        <div className="App">
            {(page === "Sign In Page") ? (<SignIn />) : (<></>)}
        </div>
    );
};

export default AuthPage;
  