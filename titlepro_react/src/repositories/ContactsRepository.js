import CommonVariables from "../layouts/CommonVariables";

class ContactsRepository {
  //Contact Creation
  static contact_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_creation_import_excel = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_creation_import_excel`, {
      method: "POST",
      body: formData,
    });
    return response.ok ? response.json() : [];
  };

    // customer fees type
    static customer_fees_creation_index = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_creation_index`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_creation_create = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_creation_create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_creation_insert = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_creation_insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_sublist_insert = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_sublist_insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_creation_edit = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_creation_edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_sublist_edit = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_sublist_edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_creation_update = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_creation_update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_sublist_update = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_sublist_update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_creation_delete = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_creation_delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_sublist_delete = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_sublist_delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };
    static customer_fees_creation_state_dependency = async (formData) => {
      const formDataLoad = { ...formData, user_id: CommonVariables.userId };
      const response = await fetch(`${CommonVariables.apiUrl}/customer_fees_creation_state_dependency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      });
      return response.ok ? response.json() : [];
    };

  }
  
  export default ContactsRepository;
  