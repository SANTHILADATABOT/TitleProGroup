class CommonVariables {
    //user type creation
    static project_title = "Title Pro";
    
    static userDetails = JSON.parse(localStorage.getItem("authData"))?.user_sign_in_check;
    static userId = this.userDetails?.id;
    
    // static apiUrl = `http://192.168.1.23:8000/api`;
    // static apiUrl = `http://192.168.1.48/titleprogroup_backend/public/api`;
    static apiUrl = `https://titlepro.santhilag.com/titleprogroup_backend/public/api`;
    
}

export default CommonVariables;
