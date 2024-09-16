import CommonVariables from "../layouts/CommonVariables";

class OrdersRepository {
  //Order Entry
  static order_entry_index = async (formData) => {
    const response = await fetch(`${CommonVariables.apiUrl}/order_entry_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response.ok ? response.json() : [];
  };
  static orders_tab_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_tab_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  //timer
  static orders_task_start_timer = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_task_start_timer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_task_pause_timer = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_task_pause_timer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_task_stop_timer = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_task_stop_timer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_tab_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_tab_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_tab_index = async (formData) => {
    const formDataLoad = { user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_tab_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static order_entry_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/order_entry_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static order_entry_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/order_entry_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static order_entry_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/order_entry_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static order_entry_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/order_entry_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static order_entry_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/order_entry_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static order_entry_state_dependency = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/order_entry_state_dependency`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static order_entry_borrower_or_seller_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/order_entry_borrower_or_seller_index`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static order_entry_borrower_or_seller_insert = async (
    formData,
    formBorrowerOrSellerData
  ) => {
    var hello = {
      formData: formData,
      formBorrowerOrSellerData: formBorrowerOrSellerData,
    };
    console.log(hello);
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/order_entry_borrower_or_seller_insert`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static order_entry_borrower_or_seller_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/order_entry_borrower_or_seller_edit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static order_entry_borrower_or_seller_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/order_entry_borrower_or_seller_update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  }; 
  static orders_invoice_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_mainlist_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_mainlist_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_mainlist_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_mainlist_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_mainlist_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_mainlist_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_mainlist_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_mainlist_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_mainlist_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_mainlist_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_mainlist_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_mainlist_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_sublist_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_sublist_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_sublist_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_sublist_create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_sublist_insert = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_sublist_insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_sublist_edit = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_sublist_edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_sublist_update = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_sublist_update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_invoice_sublist_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_invoice_sublist_delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
  };

  static orders_invoice_main_list_create = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_invoice_main_list_create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_invoice_main_list_add = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_invoice_main_list_add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_file_history_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_file_history_index`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static order_entry_borrower_or_seller_delete = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/order_entry_borrower_or_seller_delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_task_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(`${CommonVariables.apiUrl}/orders_task_index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataLoad),
    });
    return response.ok ? response.json() : [];
  };
  static orders_summary_borrower_or_seller_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_summary_borrower_or_seller_index`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };
  static orders_summary_index = async (formData) => {
    const formDataLoad = { ...formData, user_id: CommonVariables.userId };
    const response = await fetch(
      `${CommonVariables.apiUrl}/orders_summary_index`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLoad),
      }
    );
    return response.ok ? response.json() : [];
  };

}

export default OrdersRepository;
