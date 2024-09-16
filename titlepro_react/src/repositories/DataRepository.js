import CommonVariables from "../layouts/CommonVariables";
class DataRepository {

  //signin
  static user_sign_in_check = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/user_sign_in_check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.ok ? response.json() : [];
  };

  //Company Creation
  static company_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/company_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static company_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    console.log(formDataLoad);
    const response = await fetch(`${CommonVariables.apiUrl}/company_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static company_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/company_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static company_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/company_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  static company_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/company_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  //note creation /orders_note_update /orders_note_delete
  static orders_note_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_note_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_note_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_note_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_note_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_note_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  //Order Entry
  static order_entry_index = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/order_entry_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.ok ? response.json() : [];
  };
  static orders_note_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_note_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_note_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_note_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_note_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_note_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  //Account Year Creation
  static account_year_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/account_year_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static account_year_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/account_year_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static account_year_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/account_year_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static account_year_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/account_year_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static account_year_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/account_year_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //State Creation
  static state_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/state_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static state_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/state_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static state_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/state_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static state_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/state_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static state_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/state_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static state_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/state_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //County Creation
  static county_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/county_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static county_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/county_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static county_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/county_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static county_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/county_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static county_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/county_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static county_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/county_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static county_creation_import_excel = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/county_creation_import_excel`, {
      method: "POST",
      body: formData,
    });
    return response.ok ? response.json() : [];
  };

  //Staff Category Creation
  static staff_category_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_category_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_category_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_category_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_category_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_category_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_category_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_category_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_category_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_category_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Data Source Creation
  static data_source_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/data_source_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static data_source_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/data_source_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static data_source_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/data_source_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static data_source_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/data_source_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static data_source_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/data_source_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static data_source_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/data_source_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static data_source_creation_state_dependency = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/data_source_creation_state_dependency`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static data_source_creation_import_excel = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/data_source_creation_import_excel`,
      {
        method: "POST",
        body: formData,
      }
    );
    return response.ok ? response.json() : [];
  };

  //Department Creation
  static department_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/department_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static department_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/department_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static department_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/department_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static department_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/department_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static department_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/department_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Expense Type Creation
  static expense_type_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/expense_type_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static expense_type_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/expense_type_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static expense_type_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/expense_type_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static expense_type_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/expense_type_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static expense_type_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/expense_type_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Tax Creation
  static tax_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/tax_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static tax_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/tax_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static tax_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/tax_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static tax_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/tax_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static tax_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/tax_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Assign Type Creation
  static assign_type_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/assign_type_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static assign_type_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/assign_type_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static assign_type_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/assign_type_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static assign_type_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/assign_type_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static assign_type_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/assign_type_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static assign_type_creation_assign_type_dependency = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/assign_type_creation_assign_type_dependency`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };

  //Task Type Creation
  static task_type_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_type_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_type_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_type_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_type_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_type_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static county_creation_county_dependency = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/county_creation_county_dependency`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static county_creation_state_dependency = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/county_creation_state_dependency`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static task_type_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_type_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_type_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_type_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Transaction Type Creation
  static transaction_type_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/transaction_type_creation_index`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static transaction_type_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/transaction_type_creation_insert`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static transaction_type_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/transaction_type_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static transaction_type_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/transaction_type_creation_update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static transaction_type_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/transaction_type_creation_delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };

  //Work Flow Group Creation
  static work_flow_group_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_group_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static work_flow_group_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/work_flow_group_creation_insert`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static work_flow_group_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_group_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static work_flow_group_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/work_flow_group_creation_update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static work_flow_group_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/work_flow_group_creation_delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static work_flow_group_creation_import_excel = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/work_flow_group_creation_import_excel`,
      {
        method: "POST",
        body: formData,
      }
    );
    return response.ok ? response.json() : [];
  };

  //Work Flow Creation
  static work_flow_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static work_flow_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static work_flow_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static work_flow_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static work_flow_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static work_flow_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/work_flow_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Task Creation
  static task_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static task_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/task_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  // email

  static emailTemplates = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/emailTemplates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static emailCreation = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/emailCreation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

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

  //Staff Creation
  static staff_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static staff_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/staff_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Contact Type Creation
  static contact_type_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_type_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_type_creation_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_type_creation_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_type_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_type_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_type_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_type_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_type_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_type_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static contact_type_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/contact_type_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };

  //Email Template Creation
  static order_email_view = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/order_email_view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static order_email_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/order_email_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  // static emailTemplates = async (formData) => {
  //   const formDataLoad = { ...formData, user_id: CommonVariables.userId };
  //   const response = await fetch(`${CommonVariables.apiUrl}/emailTemplates`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formDataLoad),
  //   });
  //   return response.ok ? response.json() : [];
  // };
  // static emailCreation = async (formData) => {
  //   const formDataLoad = { ...formData, user_id: CommonVariables.userId };
  //   const response = await fetch(`${CommonVariables.apiUrl}/emailCreation`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formDataLoad),
  //   });
  //   return response.ok ? response.json() : [];
  // };

  static order_email_insert = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/order_email_insert`, {
      method: "POST",
      body: formData,
      headers: {},
    });
    return response.ok ? response.json() : [];
  };
  static email_template_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/email_template_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static email_template_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/email_template_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static email_template_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/email_template_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static email_template_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/email_template_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static email_template_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/email_template_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  // Orders Invoice
  static orders_invoice_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_invoice_index`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_invoice_print = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_invoice_print`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  
  //Payee Creation
  static payee_creation_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/payee_creation_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static payee_creation_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/payee_creation_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static payee_creation_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/payee_creation_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static payee_creation_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/payee_creation_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static payee_creation_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/payee_creation_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
}

export default DataRepository;
