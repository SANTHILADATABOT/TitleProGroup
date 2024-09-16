import CommonVariables from "../layouts/CommonVariables";

class UserRightsRepository {
  //get user rights
  static get_user_rights = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/get_user_rights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.ok ? response.json() : [];
  };
  static get_user_screen_rights = async (formData) => {
    const response = await fetch(
      `${CommonVariables.apiUrl}/get_user_screen_rights`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    return response.ok ? response.json() : [];
  };
}

export default UserRightsRepository;
