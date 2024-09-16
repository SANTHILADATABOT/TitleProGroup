import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ContactsRepository from "../../../../repositories/ContactsRepository";

const CustomerFeesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  var [formDataMainList, setformDataMainList] = useState({
    customer_fees_id: id,
    state_id: "",
    county_id: "",
    customer_fees: "",
    description: "",
    status: "active",
  });
  var [formDataSubList, setformDataSubList] = useState({
    customer_fees_sublist_id: "",
    payee_id: "",
    contact_id: "",
    expense_type_id: "",
    transaction_type_id: "",
    cost_per_units: "",
    no_of_units: "",
    total: "",
    btn_txt: "Add",
  });
  const [state, setState] = useState([]);
  const [transactionType, setTransactionType] = useState([]);
  const [county, setCounty] = useState([]);
  const [expenseType, setExpenseType] = useState([]);
  const [contact, setContact] = useState([]);
  const [saleList, setSaleList] = useState([
    { value: 1, label: "Billed" },
    { value: 2, label: "Pay Vendor" },
    { value: 3, label: "Expenses" },
  ]);

  const fetchDataMainlist = async () => {
    try {
      const response = await ContactsRepository.customer_fees_creation_create({});
      if (response?.status === "SUCCESS") {
        const countyVal = response?.county_creation.map((d, i) => ({
          value: d?.county_id,
          label: d?.county_name,
        }));
        const stateVal = response?.state_creation.map((d, i) => ({
          value: d?.state_id,
          label: d?.state_name,
        }));
        const transVal = response?.transaction_type.map((d, i) => ({
          value: d?.transaction_type_id,
          label: d?.transaction_type_name,
        }));
        const expenseVal = response?.expense_type.map((d, i) => ({
          value: d?.expense_type_id,
          label: d?.expense_type_name,
        }));
        const contactVal = response?.contact_creation.map((d, i) => ({
          value: d?.contact_id,
          label: d?.contact_name,
        }));
        setExpenseType(expenseVal);
        setContact(contactVal);
        setTransactionType(transVal);
        setCounty(countyVal);
        setState(stateVal);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const get_orders_invoice_sublist_index = async () => {
    try {
      if(id)
      {
        const response = await ContactsRepository.customer_fees_creation_edit({customer_fees_id:id});
        if (response){
          if (response?.status === "SUCCESS") {
            setformDataMainList({
              customer_fees_id: response?.customer_fees_creation_edit?.customer_fees_id,
              state_id: response?.customer_fees_creation_edit?.state_id,
              county_id: response?.customer_fees_creation_edit?.county_id,
              customer_fees: response?.customer_fees_creation_edit?.customer_fees,
              description: response?.customer_fees_creation_edit?.description,
              status: response?.customer_fees_creation_edit?.status,
            });
            set_customer_fees_sublist(response?.customer_fees_sublist);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataMainlist();
    get_orders_invoice_sublist_index();
  }, []);

  const handleChange = (e) => {
    setformDataMainList((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeSub = (e) => {
    setformDataSubList((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const [customer_fees_sublist, set_customer_fees_sublist] = useState([]);
  const submitDataRowSublist = async (e) => {
    e.preventDefault();

    if(formDataMainList?.state_id === ""){
      return alert("Select State");
    }
    if(formDataMainList?.county_id === ""){
      return alert("Select County");
    }
    if(formDataMainList?.customer_fees === ""){
      return alert("Enter Customer Fees");
    }
    if(formDataMainList?.status === ""){
      return alert("Select Status");
    }
    
    if(formDataSubList?.payee_id === ""){
      return alert("Select Payee");
    }
    if(formDataSubList?.payee_id === 2){
      if(formDataSubList?.contact_id === ""){
        return alert("Select Contact");
      }
    }
    if(formDataSubList?.payee_id === 3){
      if(formDataSubList?.expense_type_id === ""){
        return alert("Select Expense Type");
      }
    }
    if((formDataSubList?.payee_id === 1) || (formDataSubList?.payee_id === 2)){
      if(formDataSubList?.transaction_type_id === ""){
        return alert("Select Transaction Type");
      }
      if(formDataSubList?.cost_per_units === ""){
        return alert("Enter Cost Per Units");
      }
      if(formDataSubList?.no_of_units === ""){
        return alert("Enter Number of Units");
      }
    }
    if(formDataSubList?.total === ""){
      return alert("Enter Total");
    }
    var response1 = null;
    if (formDataSubList?.customer_fees_sublist_id === ""){
      response1 = await ContactsRepository.customer_fees_sublist_insert({
        ...formDataMainList,
        customer_fees_sublist: formDataSubList,
      });
    }else{
      response1 = await ContactsRepository.customer_fees_sublist_update({
        ...formDataSubList
      });
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        if (!formDataMainList?.customer_fees_id){
          setformDataMainList({
            ...formDataMainList,
            customer_fees_id:
              response1?.customer_fees_creation?.customer_fees_id,
          });
        }
        set_customer_fees_sublist(response1?.customer_fees_sublist);
        setformDataSubList({
          customer_fees_sublist_id: "",
          payee_id: "",
          contact_id: "",
          expense_type_id: "",
          transaction_type_id: "",
          cost_per_units: "",
          no_of_units: "",
          total: "",
          btn_txt: "Add"
        });
      }
    }
  };

  const openSublist = async (customer_fees_sublist_id) => {
    var response1 = await ContactsRepository.customer_fees_sublist_edit({
      customer_fees_sublist_id: customer_fees_sublist_id,
    });
    if (response1) {
      if (response1?.status === "SUCCESS") {
        setformDataSubList({
          customer_fees_sublist_id:
            response1?.customer_fees_sublist?.customer_fees_sublist_id,
          payee_id: response1?.customer_fees_sublist?.payee_id,
          contact_id: response1?.customer_fees_sublist?.contact_id,
          expense_type_id: response1?.customer_fees_sublist?.expense_type_id,
          transaction_type_id:
            response1?.customer_fees_sublist?.transaction_type_id,
          cost_per_units: response1?.customer_fees_sublist?.cost_per_units,
          no_of_units: response1?.customer_fees_sublist?.no_of_units,
          total: response1?.customer_fees_sublist?.total,
          btn_txt: "Edit",
        });
      }
    }
  };

  const deleteSublist = async (customer_fees_sublist_id) => {
    if (customer_fees_sublist_id !== "") {
      Swal.fire({
        title: "Remove Customer Fees Sublist",
        text: "Make sure you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
        cancelButtonText: "No",
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const get_init_datas = async () => {
            var response1 =
              await ContactsRepository.customer_fees_sublist_delete({
                customer_fees_sublist_id: customer_fees_sublist_id,
              });
            if (response1) {
              if (response1?.status === "SUCCESS") {
                set_customer_fees_sublist(response1?.customer_fees_sublist);
                setformDataSubList({
                  customer_fees_sublist_id: "",
                  payee_id: "",
                  contact_id: "",
                  expense_type_id: "",
                  transaction_type_id: "",
                  cost_per_units: "",
                  no_of_units: "",
                  total: "",
                  btn_txt: "Add"
                });
              }
            }
          };
          get_init_datas();
        }
      });
    }
  };

  const submitDataRow = async (e) => {
    e.preventDefault();

    if(formDataMainList?.state_id === ""){
      return alert("Select State");
    }
    if(formDataMainList?.county_id === ""){
      return alert("Select County");
    }
    if(formDataMainList?.customer_fees === ""){
      return alert("Enter Customer Fees");
    }
    if(formDataMainList?.status === ""){
      return alert("Select Status");
    }
    
    var response1 = await ContactsRepository.customer_fees_creation_insert({
      ...formDataMainList
    });
    if (response1) {
      if (response1?.status === "SUCCESS") {
        navigate('/customer-fees-creation');
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row mb-3">
            <div className="col-lg-6 main-header">
              <h2>
                {!id ? "Add" : "Edit"}{" "}
                <span style={{ color: "black" }}>Customer Fees</span>
              </h2>
            </div>
            <div
              className="col-lg-6 main-header"
              style={{ textAlign: "right" }}
            >
              <button
                className="btn btn-primary"
                // id="ip_submit_modal_btn"
                // type="submit"
                onClick={() => navigate(`/customer-fees-creation`)}
              >
                <ArrowLeftOutlined /> Back
              </button>
            </div>
          </div>
        </div>
        <div id="inputFormOrderForm">
          {/* <form
          //  onSubmit={submitDataRow}
           > */}
          <div className="form-row">
            <div className="col-md-3 mb-3">
              <label className="form-label">
                State Name <span className="text-danger">*</span>
              </label>
              <Select
                id="user_type_id"
                className="form-control p-0 col-sm-12"
                name="user_type_id"
                placeholder="select state name"
                onChange={(selectedOptions) =>
                  setformDataMainList((prev) => ({
                    ...prev,
                    state_id: selectedOptions?.value,
                  }))
                }
                options={state}
                value={state.filter((option) => {
                  if (formDataMainList?.state_id) {
                    return formDataMainList?.state_id === option?.value;
                  }
                })}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                County Name <span className="text-danger">*</span>
              </label>
              <Select
                id="user_type_id"
                className="form-control p-0 col-sm-12"
                name="user_type_id"
                placeholder="select county name"
                onChange={(selectedOptions) =>
                  setformDataMainList((prev) => ({
                    ...prev,
                    county_id: selectedOptions?.value,
                  }))
                }
                options={county}
                value={county.filter((option) => {
                  if (formDataMainList?.county_id) {
                    return formDataMainList?.county_id === option?.value;
                  }
                })}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Customer Fees Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="customer_fees"
                value={formDataMainList?.customer_fees}
                onChange={handleChange}
                type="text"
                placeholder="Enter Customer Fees Name"
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formDataMainList?.description}
                onChange={handleChange}
                placeholder="Enter Description"
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Status <span className="text-danger">*</span>
              </label>
              <div className="ms-1">
                <div
                  className="radio radio-success m-2"
                  style={{ display: "inline" }}
                >
                  <input
                    id="ip_status_active"
                    type="radio"
                    name="status"
                    onChange={handleChange}
                    value="active"
                    checked={formDataMainList?.status === "active"}
                  />
                  <label className="form-label" htmlFor="ip_status_active">
                    Active
                  </label>
                </div>
                <div
                  className="radio radio-danger m-2"
                  style={{ display: "inline" }}
                >
                  <input
                    id="ip_status_inactive"
                    type="radio"
                    name="status"
                    onChange={handleChange}
                    value="inactive"
                    checked={formDataMainList?.status === "inactive"}
                  />
                  <label className="form-label" htmlFor="ip_status_inactive">
                    InActive
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%", overflow: "auto" }}>
            <div
              className="table-responsive"
              style={{ minHeight: "400px", height: "100%" }}
            >
              <table
                className="display output_table data-tabe"
                id="output_table"
              >
                <thead>
                  <tr>
                    <th className="p-2">SNo</th>
                    <th className="p-2">
                      Payee <span className="text-danger">*</span>
                    </th>
                    <th className="p-2">
                      Contact <span className="text-danger">*</span>
                    </th>
                    <th className="p-2">
                      Expense Type <span className="text-danger">*</span>
                    </th>
                    <th className="p-2">
                      Transaction Type <span className="text-danger">*</span>
                    </th>
                    <th className="p-2">
                      Cost Per Units <span className="text-danger">*</span>
                    </th>
                    <th className="p-2">
                      No Of units <span className="text-danger">*</span>
                    </th>
                    <th className="p-2">
                      Total <span className="text-danger">*</span>
                    </th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">
                      <div>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "150px",
                            }),
                          }}
                          options={saleList}
                          value={saleList.find(
                              (option) =>
                                option.value ===
                                parseInt(formDataSubList.payee_id)
                            ) || null}
                          isClearable={true}
                          placeholder="Select Payee"
                          id="payee_id"
                          // className="form-control p-0"
                          name="payee_id"
                          onChange={(selectedOption) =>
                            setformDataSubList({
                              ...formDataSubList,
                              payee_id: selectedOption
                                ? selectedOption.value
                                : "",
                            })
                          }
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "200px",
                            }),
                          }}
                          isClearable={true}
                          placeholder="Select Contact"
                          options={contact}
                          id="contact_id"
                          // className="form-control p-0"
                          name="contact_id"
                          value={
                            contact.find(
                              (option) =>
                                option.value ===
                                parseInt(formDataSubList.contact_id)
                            ) || null
                          }
                          onChange={(selectedOption) =>
                            setformDataSubList({
                              ...formDataSubList,
                              contact_id: selectedOption
                                ? selectedOption.value
                                : "",
                            })
                          }
                          // isDisabled={
                          //   formDataSubList?.payee_id === 1 ||
                          //   formDataSubList?.payee_id === 3
                          //     ? true
                          //     : false
                          // }
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "200px",
                            }),
                          }}
                          isClearable={true}
                          placeholder="Select Expense Type"
                          options={expenseType}
                          id="expense_type_id"
                          // className="form-control p-0"
                          name="expense_type_id"
                          value={
                            expenseType.find(
                              (option) =>
                                option.value ===
                                parseInt(formDataSubList.expense_type_id)
                            ) || null
                          }
                          onChange={(selectedOption) =>
                            setformDataSubList({
                              ...formDataSubList,
                              expense_type_id: selectedOption
                                ? selectedOption.value
                                : "",
                            })
                          }
                          // isDisabled={
                          //   formDataSubList?.payee_id === 1 ||
                          //   formDataSubList?.payee_id === 2
                          //     ? true
                          //     : false
                          // }
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "200px",
                            }),
                          }}
                          // width={'200px'}
                          isClearable={true}
                          placeholder="Select Transaction Type"
                          options={transactionType}
                          id="transaction_type"
                          // className="form-control p-0"
                          name="transaction_type"
                          value={
                            transactionType.find(
                              (option) =>
                                option.value ===
                                parseInt(formDataSubList.transaction_type_id)
                            ) || null
                          }
                          onChange={(selectedOption) =>
                            setformDataSubList({
                              ...formDataSubList,
                              transaction_type_id: selectedOption
                                ? selectedOption.value
                                : "",
                            })
                          }
                          // isDisabled={
                          //   formDataSubList?.payee_id === 3 ? true : false
                          // }
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <input
                          className="form-control"
                          name="cost_per_units"
                          type="text"
                          placeholder="Enter Cost per Unit"
                          value={formDataSubList.cost_per_units}
                          style={{ width: "200px", height: "40px" }}
                          onChange={handleChangeSub}
                          // disabled={
                          //   formDataSubList?.payee_id === 3 ? true : false
                          // }
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <input
                          className="form-control"
                          name="no_of_units"
                          value={formDataSubList.no_of_units}
                          type="text"
                          placeholder="Enter No of Units"
                          style={{ width: "200px", height: "40px" }}
                          onChange={handleChangeSub}
                          // disabled={
                          //   formDataSubList?.payee_id === 3 ? true : false
                          // }
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <input
                          className="form-control"
                          name="total"
                          type="text"
                          value={formDataSubList.total}
                          placeholder="total"
                          style={{ width: "200px", height: "40px" }}
                          onChange={handleChangeSub}
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <button
                        onClick={submitDataRowSublist}
                        className="btn btn-primary text-white ms-1"
                      >
                        {formDataSubList?.btn_txt}
                      </button>
                    </th>
                  </tr>
                  {customer_fees_sublist.length > 0 ? (
                    <>
                      {customer_fees_sublist.map(
                        (customer_fees_sublist1, index_sub) => (
                          <tr>
                            <td className="p-2">{index_sub + 1}</td>
                            <td className="p-2">
                              {saleList.map((saleList1) => {
                                if (
                                  saleList1?.value ===
                                  customer_fees_sublist1?.payee_id
                                ) {
                                  return saleList1?.label;
                                }
                              })}
                            </td>
                            <td className="p-2">
                              {customer_fees_sublist1?.contact_name}
                            </td>
                            <td className="p-2">
                              {customer_fees_sublist1?.expense_type_name}
                            </td>
                            <td className="p-2">
                              {customer_fees_sublist1?.transaction_type_name}
                            </td>
                            <td className="p-2">
                              ${customer_fees_sublist1?.cost_per_units}
                            </td>
                            <td className="p-2">
                              ${customer_fees_sublist1?.no_of_units}
                            </td>
                            <td className="p-2">
                              ${customer_fees_sublist1?.total}
                            </td>
                            <td className="p-2">
                              <button
                                onClick={() => openSublist(customer_fees_sublist1?.customer_fees_sublist_id)}
                                className="btn btn-primary text-white ms-1"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                onClick={() => deleteSublist(customer_fees_sublist1?.customer_fees_sublist_id)}
                                className="btn btn-danger text-white ms-1"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row w-100">
            <div className="col-md-6 p-0" style={{ textAlign: "left" }}>
              <button
                className="btn btn-danger"
                type="button"
                // data-bs-dismiss="modal"
                onClick={() => navigate(`/customer-fees-creation`)}
              >
                Cancel
              </button>
            </div>
            <div className="col-md-6 p-0" style={{ textAlign: "right" }}>
              <button
                className="btn btn-success"
                id="ip_submit_btn"
                // type="submit"
                onClick={submitDataRow}
              >
                Save changes
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default CustomerFeesForm;
