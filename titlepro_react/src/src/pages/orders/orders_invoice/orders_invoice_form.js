import { useCallback, useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { Table, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DataTable from "../../../inc/components/DataTable";

const OrderForm = () => {
  var { order_id } = useParams();
  var { orders_invoice_mainlist_id } = useParams();

  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState();
  const [OrderEntry, SetOrderEntry] = useState();
  const [selectedSale, setSelectedSale] = useState(null);
  const [orderEntry, setOrderEntry] = useState([]);
  const [contactCreation, setContactCreation] = useState([]);
  const [expenseTypeCreation, setExpenseTypeCreation] = useState([]);
  const [transactionTypeCreation, setTransactionTypeCreation] = useState([]);
  const [saleList, setSaleList] = useState([]);
  const [contactCreationOptions, setContactCreationOptions] = useState([]);
  const [mappedExpenseOptions, setMappedExpenseOptions] = useState([]);
  const [transactionTypeCreationOptions, setTransactionTypeCreationOptions] =
    useState([]);
  var [formDataMainList, setformDataMainList] = useState({
    orders_invoice_mainlist_id: "",
    order_id: "",
    order_number: "",
    invoice_number: "",
    description: ""
  });
  var [formDataSubList, setformDataSubList] = useState({
    orders_invoice_sublist_id: "",
    payee_id: "",
    contact_id: "",
    expense_type_id: "",
    transaction_type_id: "",
    cost_per_units: "",
    no_of_units: "",
    total: "",
  });
  const [tableVal, setTableVal] = useState([]);
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const newTabIndex = useRef(0);
  const [tableCol, setTableCol] = useState([
    "SNo",
    "Payee",
    "Contact",
    "Expense",
    "Trnsaction Type",
    "Cost Per Unit",
    "No Of Units",
    "Total",
    "Action",
  ]);
  const [open, setOpen] = useState(false);
  //  useEffect(() => {
  //    $(".output_table").DataTable();
  //  }, []);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const getTabs = async (cTab) => {
    const result = await OrdersRepository.orders_tab_index();
    if (result?.status === "SUCCESS") {
      setItems(result?.orders_tab_index[0]?.items.reverse());
      setActiveKey(cTab || order_id);
    }
  };
  useEffect(() => {
    getTabs("");
  }, []);

  //tabs
  const onChange = (newActiveKey) => {
    navigate(`/order-entry/${newActiveKey}/orders-invoice/form`);
    setActiveKey(newActiveKey);
  };

  const remove = async (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    const dataTab = { tab_id: targetKey };
    const result = await OrdersRepository.orders_tab_delete(dataTab);
    if (result?.status === "SUCCESS") {
      items.forEach((item, i) => {
        if (item.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const newPanes = items.filter((item) => item.key !== targetKey);
      if (newPanes.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newPanes[lastIndex].key;
        } else {
          newActiveKey = newPanes[0].key;
        }
      }
      getTabs(newActiveKey);
      navigate(`/order-entry/${newActiveKey}/orders-invoice`);
      setItems(newPanes);
      // setActiveKey(newActiveKey);
    }
  };
  const onEdit = (targetKey, action) => {
    remove(targetKey);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterData(event.target.value, entriesPerPage);
  };
  const handleEntriesPerPageChange = (selectedOption) => {
    setEntriesPerPage(selectedOption.value);
    filterData(searchQuery, selectedOption.value);
  };
  // console.log("formData",formData)
  const filterData = (query, entries) => {
    // let filtered = data.filter(item =>
    //   Object.values(item).some(val =>
    //     String(val).toLowerCase().includes(query.toLowerCase())
    //   )
    // );
    // setFilteredData(filtered.slice(0, entries));
  };
  console.log("tableVal", tableVal);
  const submitDataRow = async (e) => {
    e.preventDefault();

    var response1 = null;
    if (formDataMainList?.orders_invoice_mainlist_id === "") {
      response1 = await OrdersRepository.orders_invoice_mainlist_insert(
        formDataMainList
      );
    } else {
      response1 = await OrdersRepository.orders_invoice_mainlist_update(
        formDataMainList
      );
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        navigate(`/order-entry/${order_id}/orders-invoice`);
      }
    }
  };
  const deleteDataRow = async (id) => {
    if (id !== "") {
      Swal.fire({
        title: "Remove Transaction Type Creation",
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
              await OrdersRepository.transaction_type_creation_delete({
                transaction_type_id: id,
              });
            if (response1) {
              if (response1?.status === "SUCCESS") {
                window.location.reload();
              }
            }
          };
          get_init_datas();
        }
      });
    }
  };

  // console.log("formData",formData)
  const handleEdit = () => {
    alert("Edit button clicked!");
  };

  const handleDelete = () => {
    alert("Delete button clicked!");
  };

  const fetchDataMainlist = async () => {
    if (!orders_invoice_mainlist_id) {
      const orders_invoice_mainlist = await OrdersRepository.orders_invoice_mainlist_create({ order_id: order_id});
      if (orders_invoice_mainlist.status === "SUCCESS") {
        setOrderEntry(orders_invoice_mainlist.order_entry || []);
        var order_entry_data = orders_invoice_mainlist?.order_entry || [];
        var invoice_number = orders_invoice_mainlist?.invoice_number || "";
        if (order_entry_data.length > 0) {
          setformDataMainList({
            orders_invoice_mainlist_id: orders_invoice_mainlist_id,
            order_id: order_id,
            order_number: order_entry_data[0]?.order_number || "",
            invoice_number: invoice_number,
            description: ""
          });
        }
      }
    } else {
      const orders_invoice_mainlist = await OrdersRepository.orders_invoice_mainlist_edit({ orders_invoice_mainlist_id: orders_invoice_mainlist_id});
      if (orders_invoice_mainlist.status === "SUCCESS") {
        setOrderEntry(orders_invoice_mainlist.order_entry || []);
        var orders_invoice_mainlist_data = orders_invoice_mainlist?.orders_invoice_mainlist_edit || [];
        if (orders_invoice_mainlist_data.length > 0) {
          setformDataMainList({
            orders_invoice_mainlist_id: orders_invoice_mainlist_data[0]?.orders_invoice_mainlist_id || "",
            order_id: orders_invoice_mainlist_data[0]?.order_id || "",
            order_number: orders_invoice_mainlist_data[0]?.order_number || "",
            invoice_number: orders_invoice_mainlist_data[0]?.invoice_number || "",
            description: orders_invoice_mainlist_data[0]?.description || "",
          });
        }
      }
    }
    
  };

  useEffect(() => {
    fetchDataMainlist();
  }, []);

  const get_orders_invoice_sublist_index = async () => {
    const result = await OrdersRepository.orders_invoice_sublist_index({ orders_invoice_mainlist_id: orders_invoice_mainlist_id });
    if (result?.status === "SUCCESS") {
      const sublist_data = result?.orders_invoice_sublist_index || [];
      if (sublist_data.length > 0) {
        setTableVal(sublist_data);
      }
    }
  };

  useEffect(() => {
    get_orders_invoice_sublist_index();
  }, []);

  const fetchDataSublist = async (orders_invoice_sublist_id) => {
    if (!orders_invoice_sublist_id) {
      const orders_invoice_sublist =
      await OrdersRepository.orders_invoice_sublist_create({});
      if (orders_invoice_sublist.status === "SUCCESS") {
        setContactCreation(orders_invoice_sublist.contact_creation || []);
        setExpenseTypeCreation(
          orders_invoice_sublist.expense_type_creation || []
        );
        setTransactionTypeCreation(
          orders_invoice_sublist.transaction_type_creation || []
        );

        // Map options
        setMappedExpenseOptions(
          (orders_invoice_sublist.expense_type_creation || []).map(
            (expense) => ({
              value: expense.expense_type_id,
              label: expense.expense_type_name,
            })
          )
        );

        setTransactionTypeCreationOptions(
          (orders_invoice_sublist.transaction_type_creation || []).map(
            (transaction) => ({
              value: transaction.transaction_type_id,
              label: transaction.transaction_type_name,
            })
          )
        );

        setContactCreationOptions(
          (orders_invoice_sublist.contact_creation || []).map((contact) => ({
            value: contact.contact_id,
            label: contact.contact_name,
          }))
        );

        // Define saleList
        setSaleList([
          { value: "1", label: "Billed" },
          { value: "2", label: "Pay Vendor" },
          { value: "3", label: "Expenses" },
        ]);
      }
    } else {
      const orders_invoice_sublist =
      await OrdersRepository.orders_invoice_sublist_edit({ orders_invoice_sublist_id: orders_invoice_sublist_id });
      if (orders_invoice_sublist.status === "SUCCESS") {
        var orders_invoice_sublist_data = orders_invoice_sublist?.orders_invoice_sublist_edit || [];
        if (orders_invoice_sublist_data.length > 0) {
          setformDataSubList({
            orders_invoice_sublist_id: orders_invoice_sublist_data[0]?.orders_invoice_sublist_id || "",
            payee_id: orders_invoice_sublist_data[0]?.payee_id || "",
            contact_id: orders_invoice_sublist_data[0]?.contact_id || "",
            expense_type_id: orders_invoice_sublist_data[0]?.expense_type_id || "",
            transaction_type_id: orders_invoice_sublist_data[0]?.transaction_type_id || "",
            cost_per_units: orders_invoice_sublist_data[0]?.cost_per_units || "",
            no_of_units: orders_invoice_sublist_data[0]?.no_of_units || "",
            total: orders_invoice_sublist_data[0]?.total || "",
          });
        }
        setContactCreation(orders_invoice_sublist.contact_creation || []);
        setExpenseTypeCreation(
          orders_invoice_sublist.expense_type_creation || []
        );
        setTransactionTypeCreation(
          orders_invoice_sublist.transaction_type_creation || []
        );

        // Map options
        setMappedExpenseOptions(
          (orders_invoice_sublist.expense_type_creation || []).map(
            (expense) => ({
              value: expense.expense_type_id,
              label: expense.expense_type_name,
            })
          )
        );

        setTransactionTypeCreationOptions(
          (orders_invoice_sublist.transaction_type_creation || []).map(
            (transaction) => ({
              value: transaction.transaction_type_id,
              label: transaction.transaction_type_name,
            })
          )
        );

        setContactCreationOptions(
          (orders_invoice_sublist.contact_creation || []).map((contact) => ({
            value: contact.contact_id,
            label: contact.contact_name,
          }))
        );

        // Define saleList

        setSaleList([
          { value: "1", label: "Billed" },
          { value: "2", label: "Pay Vendor" },
          { value: "3", label: "Expenses" },
        ]);
      }
    }
    
  };
  useEffect(() => {
    fetchDataSublist("");
  }, []);
  console.log(
    "transactionTypeCreation list",
    transactionTypeCreation,
    expenseTypeCreation,
    contactCreation
  );

  console.log("transactionTypeCreation leo", formDataSubList);

  const handleChange = (e) => {
    setformDataSubList((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitDataRowSublist = async (e) => {
    
    e.preventDefault();
    var response1 = null;
    if (formDataSubList?.orders_invoice_sublist_id === "") {
      response1 = await OrdersRepository.orders_invoice_sublist_insert(
        formDataMainList, formDataSubList
      );
      if (response1) {
        if (response1?.status === "SUCCESS") {
          get_orders_invoice_sublist_index();
          setformDataSubList({
            orders_invoice_sublist_id: "",
            payee_id: "",
            contact_id: "",
            expense_type_id: "",
            transaction_type_id: "",
            cost_per_units: "",
            no_of_units: "",
            total: "",
          });
          navigate(`/order-entry/${order_id}/orders-invoice/form/${response1?.orders_invoice_mainlist_id}`);
        }
      }
    } else {
      response1 = await OrdersRepository.orders_invoice_sublist_update(
        formDataSubList
      );
      if (response1) {
        if (response1?.status === "SUCCESS") {
          get_orders_invoice_sublist_index();
          setformDataSubList({
            orders_invoice_sublist_id: "",
            payee_id: "",
            contact_id: "",
            expense_type_id: "",
            transaction_type_id: "",
            cost_per_units: "",
            no_of_units: "",
            total: "",
          });
        }
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row mb-3" id="tabpanel">
            <div className="col-lg-12">
              <Tabs
                hideAdd
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-6 main-header">
              {/* <h2>Order Entry</h2> */}
              <h2>
                Invoice <span style={{ color: "black" }}>Entry</span>
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
                onClick={() =>
                  navigate(`/order-entry/${order_id}/orders-invoice`)
                }
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
              <input
                className="form-control"
                name="orders_invoice_mainlist_id"
                value={formDataMainList?.orders_invoice_mainlist_id}
                onChange={handleChange}
                type="hidden"
              />
              <label className="form-label">
                Order Number <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="order_number"
                value={formDataMainList?.order_number}
                onChange={handleChange}
                type="text"
                placeholder="Enter Order Number"
                readOnly
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Invoice Number <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="order_number"
                value={formDataMainList?.invoice_number}
                onChange={handleChange}
                type="text"
                placeholder="Enter Invoice Number"
                readOnly
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Description <span className="text-danger">*</span>
              </label>
                <textarea
                  style={{ height: "100px", resize: "none" }}
                  className="form-control"
                  name="description"
                  value={formDataMainList?.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                ></textarea>
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
                      <div>
                        <label className="form-label">
                          Payee <span className="text-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "200px",
                            }),
                          }}
                          options={saleList}
                          isClearable={true}
                          placeholder="Select"
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
                        <label className="form-label">
                          Contact <span className="text-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "200px",
                            }),
                          }}
                          isClearable={true}
                          placeholder="Select"
                          options={contactCreationOptions}
                          id="contact_id"
                          // className="form-control p-0"
                          name="contact_id"
                          value={
                            contactCreationOptions.find(
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
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <label className="form-label">
                          Expense Type <span className="text-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "200px",
                            }),
                          }}
                          isClearable={true}
                          placeholder="Select"
                          options={mappedExpenseOptions}
                          id="expense_type_id"
                          // className="form-control p-0"
                          name="expense_type_id"
                          value={
                            mappedExpenseOptions.find(
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
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <label className="form-label">
                          Transaction Type{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            control: (base) => ({
                              ...base,

                              width: "200px",
                            }),
                          }}
                          // width={'200px'}
                          isClearable={true}
                          placeholder="Select"
                          options={transactionTypeCreationOptions}
                          id="transaction_type"
                          // className="form-control p-0"
                          name="transaction_type"
                          value={
                            transactionTypeCreationOptions.find(
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
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <label className="form-label">
                          Cost Per Units <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="cost_per_units"
                          type="text"
                          placeholder="Enter Cost per Unit"
                          value={formDataSubList.cost_per_units}
                          style={{ width: "200px", height: "40px" }}
                          onChange={handleChange}
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <label className="form-label">
                          No Of units <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="no_of_units"
                          value={formDataSubList.no_of_units}
                          type="text"
                          placeholder="Enter No of Units"
                          style={{ width: "200px", height: "40px" }}
                          onChange={handleChange}
                        />
                      </div>
                    </th>
                    <th className="p-2">
                      <div>
                        <label className="form-label">
                          Total <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="total"
                          type="text"
                          value={formDataSubList.total}
                          placeholder="total"
                          style={{ width: "200px", height: "40px" }}
                          onChange={handleChange}
                        />
                      </div>
                    </th>
                    <th className="p-2">Action</th>
                    <th className="p-2">
                      <button
                        onClick={submitDataRowSublist}
                        className="btn btn-primary text-white ms-1"
                      >
                        {!formDataSubList.orders_invoice_sublist_id ? 'Add' : 'Edit'}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableVal.map((row_data1, rowIndex) => (
                    <tr key={row_data1.orders_invoice_sublist_id}> {/* Use a unique key */}
                      <td className="p-2">{rowIndex + 1}</td>
                      <td className="p-2">{row_data1.payee_id}</td>
                      <td className="p-2">{row_data1.contact_name}</td>
                      <td className="p-2">{row_data1.expense_type_name}</td>
                      <td className="p-2">{row_data1.transaction_type_name}</td>
                      <td className="p-2">{row_data1.cost_per_units}</td>
                      <td className="p-2">{row_data1.no_of_units}</td>
                      <td className="p-2">{row_data1.total}</td>
                      <td className="text-center" style={{ whiteSpace: "nowrap" }}>
                        <button className="btn btn-primary m-1" onClick={() => fetchDataSublist(row_data1.orders_invoice_sublist_id)}>
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger m-1" onClick={() => deleteDataRow()}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>


              </table>
            </div>
            {/* <DataTable
              column={[
                ...tableCol,
               
              ]}
              row_data={row.map((item, i) => (
                <tr>
                 
                </tr>
              ))}
            /> */}
          </div>
          <div className="row w-100">
            <div className="col-md-6 p-0" style={{ textAlign: "left" }}>
              <button
                className="btn btn-danger"
                type="button"
                // data-bs-dismiss="modal"
                onClick={() =>
                  navigate(`/order-entry/${order_id}/orders-invoice`)
                }
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
                {!formDataMainList.orders_invoice_mainlist_id ? 'Save Changes' : 'Update Changes'}
                
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default OrderForm;
