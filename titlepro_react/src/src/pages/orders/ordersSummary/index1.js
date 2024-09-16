import { useCallback, useEffect, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { Table, Tabs } from "antd";
import { BorrowerTable } from "./borrowerTable";
import { SellerTable } from "./sellerTable";
import { useNavigate } from "react-router-dom";
import SummaryPrint from "../ordersSummary/summaryPrintPage";
const OrderSummary = () => {
  const [tab,setTab] = useState('Borrower');
   const [activeKey, setActiveKey] = useState("");
    const [items, setItems] = useState([]);
  var [form_load, set_form_load] = useState(true);
  var [formData, setFormData] = useState({order_id: "", order_number: "", contact_id: "", open_date: "", close_date: "", due_date: "", arrival_date: "", delivery_date: "", active_workflow: "", assigned_to: "", street_address: "", unit: "", city_name: "", state_id: "", county_id: "", zipcode: "", parcel_id: "", sub_division: "", block: "", lot: "", section: "", land_value: "", improvement_value: "", total_assessed_value: "", product_type: "", transaction_type_id: "", work_flow_group_id: "", property_type: "", data_source_id: "", add_in_product: "", customer_name: "", customer_address: "", customer_branch_code: "", lender_name: "", lender_address: "", lender_branch_code: "", file: "", loan: "", sales_price: "", loan_type: "", loan_date: "", loan_amount: "", description: "", status: "active"});
  var [formBorrowerOrSellerData, setBorrowerOrSellerFormData] = useState({order_borrower_or_seller_id: "", borrower_or_seller: "", name: "", ssn: "", dob: ""});
  var [contact_list, set_contact_list] = useState([]);
  var [work_flow_group_list, set_work_flow_group_list] = useState([]);
  var [transaction_type_list, set_transaction_type_list] = useState([]);
  var [data_source_list, set_data_source_list] = useState([]);
  var [county_list, set_county_list] = useState([]);
  var [state_list, set_state_list] = useState([]);
  var [stateId, setStateId] = useState("");
  var { order_id } = useParams();
  const navigate = useNavigate();
  const [dataSellerSource, setSellerDataSource] = useState([]);
  const [dataBorrowerSource, setBorrowerDataSource] = useState([]);
  const order_status = [
    { value: 'OPEN', label: 'OPEN' },
    { value: 'CLOSE', label: 'CLOSE' } // Fixed the label for CLOSE
  ];
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
  const fetch_borrower_data = async () => {
    try {
      const response1 = await OrdersRepository.order_entry_borrower_or_seller_index({
        order_id: order_id,
        borrower_or_seller: "Borrower",
      });

      if (response1 && response1.status === "SUCCESS") {
        const newDataSource = (response1?.order_borrower_or_seller_index || []).map(
          (element, index) => ({
            key: index,
            id: element?.order_borrower_or_seller_id, // Add the unique ID
            borrowerName: element?.name || "",
            ssn: element?.ssn || "",
            dob: element?.dob || "",
          })
        );
        setBorrowerDataSource(newDataSource); // Update the state with the new data
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  useEffect(() => {
    fetch_borrower_data();
  }, [order_id]);

  const fetch_seller_data = async () => {
    try {
      const response1 = await OrdersRepository.order_entry_borrower_or_seller_index({
        order_id: order_id,
        borrower_or_seller: "Seller",
      });

      if (response1 && response1.status === "SUCCESS") {
        const newDataSource = (response1?.order_borrower_or_seller_index || []).map(
          (element, index) => ({
            key: index,
            id: element?.order_borrower_or_seller_id, // Add the unique ID
            borrowerName: element?.name || "", // Assuming 'name' is the seller's name
            ssn: element?.ssn || "",
            dob: element?.dob || "",
          })
        );
        setSellerDataSource(newDataSource); // Update the state with the new data
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetch_seller_data();
  }, [order_id]);
 
  useEffect(() => {
    if (stateId) {
      const fetch_data = async () => {
        try {
          const response1 =
            await OrdersRepository.order_entry_state_dependency({
              state_id: stateId,
            });

          if (response1 && response1.status === "SUCCESS") {
            const county_creation = (response1.county_creation || []).map(
              (element) => ({
                value: element.county_id,
                label: element.county_name,
              })
            );
            set_county_list(county_creation);
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetch_data();
    }
  }, [stateId]);
  
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!order_id) {
        // Create new order
        const response = await OrdersRepository.order_entry_create({});
        console.log('Create API Response:', response); // Log response to debug

        if (response?.status === "SUCCESS") {
          const {
            order_number = "",
            contact_creation: contact = [],
            work_flow_group_creation: workFlowGroup = [],
            transaction_type_creation: transactionType = [],
            data_source_creation: dataSource = [],
            county_creation: county = [],
            state_creation: state = []
          } = response;

          set_contact_list(contact.map(item => ({
            value: item?.contact_id,
            label: item?.contact_name,
          })));

          set_work_flow_group_list(workFlowGroup.map(item => ({
            value: item?.work_flow_group_id,
            label: item?.work_flow_group_name,
          })));

          set_transaction_type_list(transactionType.map(item => ({
            value: item?.transaction_type_id,
            label: item?.transaction_type_name,
          })));

          set_data_source_list(dataSource.map(item => ({
            value: item?.data_source_id,
            label: item?.data_source_name,
          })));

          set_county_list(county.map(item => ({
            value: item?.county_id,
            label: item?.county_name,
          })));

          set_state_list(state.map(item => ({
            value: item?.state_id,
            label: item?.state_name,
          })));

          setFormData({
            order_id: "",
            order_number,
            order_status: "",
            contact_id: "",
            open_date: "",
            close_date: "",
            due_date: "",
            arrival_date: "",
            delivery_date: "",
            active_workflow: "",
            assigned_to: "",
            street_address: "",
            unit: "",
            city_name: "",
            state_id: "",
            county_id: "",
            zipcode: "",
            parcel_id: "",
            sub_division: "",
            block: "",
            lot: "",
            section: "",
            land_value: "",
            improvement_value: "",
            total_assessed_value: "",
            product_type: "",
            transaction_type_id: "",
            work_flow_group_id: "",
            work_flow_id: "",
            property_type: "",
            data_source_id: "",
            add_in_product: "",
            customer_name: "",
            customer_address: "",
            customer_branch_code: "",
            lender_name: "",
            lender_address: "",
            lender_branch_code: "",
            file: "",
            loan: "",
            sales_price: "",
            loan_type: "",
            loan_date: "",
            loan_amount: "",
            description: "",
            status: "active",
          });
        } else {
          console.error('Create API did not return success status');
        }
      } else {
        // Edit existing order
        const response = await OrdersRepository.order_entry_edit({ order_id });
        console.log('Edit API Response:', response); // Log response to debug

        if (response?.status === "SUCCESS") {
          const {
            contact_creation: contact = [],
            work_flow_group_creation: workFlowGroup = [],
            transaction_type_creation: transactionType = [],
            data_source_creation: dataSource = [],
            county_creation: county = [],
            state_creation: state = []
          } = response;

          set_contact_list(contact.map(item => ({
            value: item?.contact_id,
            label: item?.contact_name,
          })));

          set_work_flow_group_list(workFlowGroup.map(item => ({
            value: item?.work_flow_group_id,
            label: item?.work_flow_group_name,
          })));

          set_transaction_type_list(transactionType.map(item => ({
            value: item?.transaction_type_id,
            label: item?.transaction_type_name,
          })));

          set_data_source_list(dataSource.map(item => ({
            value: item?.data_source_id,
            label: item?.data_source_name,
          })));

          set_county_list(county.map(item => ({
            value: item?.county_id,
            label: item?.county_name,
          })));

          set_state_list(state.map(item => ({
            value: item?.state_id,
            label: item?.state_name,
          })));
          const editData = response?.order_entry_edit || [];
          if (editData.length > 0) {
            const [data] = editData;
            setFormData({
              order_id,
              order_number: data?.order_number || "",
              order_status: data?.order_status || "",
              contact_id: data?.contact_id || "",
              open_date: data?.open_date || "",
              close_date: data?.close_date || "",
              due_date: data?.due_date || "",
              arrival_date: data?.arrival_date || "",
              delivery_date: data?.delivery_date || "",
              active_workflow: data?.active_workflow || "",
              assigned_to: data?.assigned_to || "",
              street_address: data?.street_address || "",
              unit: data?.unit || "",
              city_name: data?.city_name || "",
              state_id: data?.state_id || "",
              county_id: data?.county_id || "",
              zipcode: data?.zipcode || "",
              parcel_id: data?.parcel_id || "",
              sub_division: data?.sub_division || "",
              block: data?.block || "",
              lot: data?.lot || "",
              section: data?.section || "",
              land_value: data?.land_value || "",
              improvement_value: data?.improvement_value || "",
              total_assessed_value: data?.total_assessed_value || "",
              product_type: data?.product_type || "",
              transaction_type_id: data?.transaction_type_id || "",
              work_flow_group_id: data?.work_flow_group_id || "",
              data_source_id: data?.data_source_id || "",
              property_type: data?.property_type || "",
              add_in_product: data?.add_in_product || "",
              customer_name: data?.customer_name || "",
              customer_address: data?.customer_address || "",
              customer_branch_code: data?.customer_branch_code || "",
              lender_name: data?.lender_name || "",
              lender_address: data?.lender_address || "",
              lender_branch_code: data?.lender_branch_code || "",
              file: data?.file || "",
              loan: data?.loan || "",
              sales_price: data?.sales_price || "",
              loan_type: data?.loan_type || "",
              loan_date: data?.loan_date || "",
              loan_amount: data?.loan_amount || "",
              description: data?.description || "",
              status: data?.status,
            });
          }
        } else {
          console.error('Edit API did not return success status');
        }
      }      
    };

    fetchOrderData();
  }, [order_id]);

  const handleChange = (e) => {
    const { name ,value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:value
    }));
  };
  const handleChangeOrderStatus = (selectedOptionOrderStatus) => {
    setFormData((prev) => ({
      ...prev,
      order_status: selectedOptionOrderStatus ? selectedOptionOrderStatus.value : ''
    }));
  }
  const handleBorrowerOrSellerChange = (e) => {
    const { name ,value } = e.target;
    setBorrowerOrSellerFormData((prevData) => ({
      ...prevData,
      [name]:value
    }));
  };
  const stateHandleChange = (option) => {
    const newStateId = option?.value;
    setStateId(newStateId);
    setFormData((prevData) => ({
      ...prevData,
      state_id: option?.value,
    }));
  };
  const openInputFormModal = useCallback(async (id, tab) => {
    setTab(tab);
    setBorrowerOrSellerFormData({order_borrower_or_seller_id: id, borrower_or_seller: tab, name: "", ssn: "", dob: ""});
    if (id === "") {
      $("#inputFormModal #BorrowerOrSellerModalLabel").html(
        `Add ${tab} Entry`
      );
      $("#inputFormModal #ip_submit_modal_btn").html(`Add ${tab} Entry`);
    } else {
      $("#inputFormModal #BorrowerOrSellerModalLabel").html(`Edit ${tab} Entry`);
      $("#inputFormModal #ip_submit_modal_btn").html(`Update ${tab} Entry`);
      var response1 = await OrdersRepository.order_entry_borrower_or_seller_edit({
        order_borrower_or_seller_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.order_borrower_or_seller_edit || [];
          console.log(edit_data);
          if (edit_data.length > 0) {
            setBorrowerOrSellerFormData({
              order_borrower_or_seller_id: id,
              borrower_or_seller: edit_data[0]?.borrower_or_seller || "",
              name: edit_data[0]?.name || "",
              ssn: edit_data[0]?.ssn || "",
              dob: edit_data[0]?.dob || "",
            });
          }
        }
      }
    }
  },[]);
  const openDeleteFormModal = useCallback(async (id, tab) => {
    if (id !== "") {
      Swal.fire({
        title: `Remove ${tab}`,
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
            var response1 = await OrdersRepository.order_entry_borrower_or_seller_delete({
              borrower_or_seller_id: id,
            });
            if (response1) {
              if (response1?.status === "SUCCESS") {
                fetch_borrower_data();
                fetch_seller_data();
              }
            }
          };
          get_init_datas();
        }
      });
    }
  },[]);
   const itemsTab = [
     {
       key: "1",
       label: (
         <>
           <label>Borrower</label>
         </>
       ),
       children: <BorrowerTable dataSource={dataBorrowerSource} openDeleteFormModal={openDeleteFormModal} openInputFormModal={openInputFormModal}  />,
     },
     {
       key: "2",
       label: (
         <>
           <label>Seller</label>
         </>
       ),
       children: (<SellerTable dataSource={dataSellerSource} openDeleteFormModal={openDeleteFormModal} openInputFormModal={openInputFormModal}/>),
     },
   ];
  const submitDataRow = async (e) => {
    e.preventDefault();
    var response1 = null;
    if (formData?.order_id === "") {
      response1 = await OrdersRepository.order_entry_insert(formData);
    } else {
      response1 = await OrdersRepository.order_entry_update(formData);
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        navigate("/order-entry");
      }
    }
  };
  const submitBorrowerOrSellerDataRow = async (e) => {
    e.preventDefault();
    var response1 = null;
    if (formBorrowerOrSellerData?.order_borrower_or_seller_id === "") {
      response1 = await OrdersRepository.order_entry_borrower_or_seller_insert(formData, formBorrowerOrSellerData);
      if (response1) {
        if (response1?.status === "SUCCESS") {
          $('#borrowerOrSellerModalClose').click();
          fetch_borrower_data();
          fetch_seller_data();
          navigate(`/order-entry/form/${response1?.order_id}`);
        }
      }
    } else {
      response1 = await OrdersRepository.order_entry_borrower_or_seller_update(formBorrowerOrSellerData);
      if (response1) {
        if (response1?.status === "SUCCESS") {
          $('#borrowerOrSellerModalClose').click();        
          // navigate(`/order-entry/form/${response1?.order_id}`);
          fetch_borrower_data();
          fetch_seller_data();
        }
      }
    }
  };

  const selectedOptionOrderStatus = order_status.find(option => option.value === formData?.order_status);
const onChange = (newActiveKey) => {
  navigate(`/order-entry/${newActiveKey}/order-summary`);
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
    navigate(`/order-entry/${newActiveKey}/order-summary`);
    setItems(newPanes);
    // setActiveKey(newActiveKey);
  }
};
const onEdit = (targetKey, action) => {
  remove(targetKey);
};

const handlePrint = () => {
  setTimeout(() => {
    const printWindow = window.open("", "", "height=600,width=800");

    // Write the HTML structure and include Bootstrap
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">'
    );

    // Add custom print styles for A4 size and border
    printWindow.document.write(`
     <style>
        @media print {
          @page {
            size: A4;
            margin: 20mm; /* Margins for the A4 page */
          }
          body {
            margin: 0; /* Ensure no additional margin on the body */
          }
          .print-area {
            border: 2px solid black; /* Border on all sides */
            padding: 10mm; /* Padding inside the border */
            margin: 0; /* Ensure no additional margin */
            box-sizing: border-box; /* Include border and padding in element's total width and height */
          }
        }
      </style>
    `);

    printWindow.document.write("</head><body>");

    // Wrap the print content inside a div with class print-area
    printWindow.document.write(
      <div class="print-area"> +
        document.getElementById("print-content").innerHTML +
        </div>
    );

    printWindow.document.write("</body></html>");

    // Close the document and print
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, 100); // Adjust the timeout duration if needed
};
  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
          <div className="col-lg-6 main-header">
              {/* <h2>Order Entry</h2> */}
              <h2>
                Order <span style={{ color: "black" }}>Summary</span>
              </h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
            
              <button className="btn btn-primary" onClick={handlePrint}>
                Print
              </button>
              <div id="print-content" style={{ display: "none" }}>
              <SummaryPrint />
              </div>
            </div>
            
          </div>
          <div className="row" id='tabpanel'>
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
        </div>
        <div id="inputFormOrderForm">
          {/* <form
          //  onSubmit={submitDataRow}
           > */}
          <div className="form-row">
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Order Number <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="order_number"
                value={formData?.order_number}
                onChange={handleChange}
                type="text"
                placeholder="Enter Order Number"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Customer Name <span className="text-danger">*</span>
              </label>
              <Select
                id="contact_id"
                className="form-control p-0 col-sm-12"
                name="contact_id"
                placeholder="select Customer Name"
                onChange={(selectedOptions) =>
                  setFormData((prev) => ({
                    ...prev,
                    contact_id: selectedOptions?.value,
                  }))
                }
                options={contact_list}
                value={contact_list.filter((option) => {
                  if (formData?.contact_id) {
                    return formData?.contact_id === option?.value;
                  }
                })}
                isDisabled={true}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Order Status <span className="text-danger">*</span>
              </label>
              <Select
                id="order_status"
                className="form-control p-0 col-sm-12"
                name="order_status"
                placeholder="Select Order Status"
                onChange={handleChangeOrderStatus}
                options={order_status}
                value={selectedOptionOrderStatus}
                isDisabled={true}
              />
            </div>
            <div className="col-md-3 mb-3 d-flex flex-column">
              <label className="form-label">
                Open Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                closeOnScroll={(e) => e.target === document}
                selected={formData?.open_date || new Date()}
                name="open_date"
                value={formData?.open_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, open_date: date }))
                }
                className="form-control"
                placeholderText="Enter Open Date"
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-calendar"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3 d-flex flex-column">
              <label className="form-label">
                Close Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                closeOnScroll={(e) => e.target === document}
                selected={formData?.close_date || new Date()}
                name="close_date"
                value={formData?.close_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, close_date: date }))
                }
                className="form-control"
                placeholderText="Enter Close Date"
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-calendar"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3 d-flex flex-column">
              <label className="form-label">
                Due Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                closeOnScroll={(e) => e.target === document}
                selected={formData?.due_date || new Date()}
                name="due_date"
                value={formData?.due_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, due_date: date }))
                }
                className="form-control"
                placeholderText="Enter Due Date"
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-calendar"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3 d-flex flex-column">
              <label className="form-label">
                Arrival Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                closeOnScroll={(e) => e.target === document}
                selected={formData?.arrival_date || new Date()}
                name="arrival_date"
                value={formData?.arrival_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, arrival_date: date }))
                }
                className="form-control"
                placeholderText="Enter Arrival Date"
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-calendar"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3 d-flex flex-column">
              <label className="form-label">
                Delivery Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                closeOnScroll={(e) => e.target === document}
                selected={formData?.delivery_date || new Date()}
                name="delivery_date"
                value={formData?.delivery_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, delivery_date: date }))
                }
                className="form-control"
                placeholderText="Enter Delivery Date"
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-calendar"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Active WorkFlow <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="active_workflow"
                value={formData?.active_workflow}
                onChange={handleChange}
                type="text"
                placeholder="Enter Active WorkFlow"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Assigned To <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="assigned_to"
                value={formData?.assigned_to}
                onChange={handleChange}
                type="text"
                placeholder="Enter Assigned To"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Street Address</label>
              <textarea
                className="form-control"
                name="street_address"
                value={formData?.street_address}
                onChange={handleChange}
                placeholder="Enter Street Address"
                style={{ height: "100px" }}
                disabled
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Unit <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="unit"
                value={formData?.unit}
                onChange={handleChange}
                type="text"
                placeholder="Enter Unit"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                City Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="city_name"
                value={formData?.city_name}
                onChange={handleChange}
                type="text"
                placeholder="Enter City Name"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                State Name <span className="text-danger">*</span>
              </label>
              <Select
                id="state_id"
                className="form-control p-0 col-sm-12"
                name="state_id"
                placeholder="select State Name"
                onChange={(selectedOptions) =>
                  stateHandleChange(selectedOptions)
                }
                options={state_list}
                value={state_list.filter((option) => {
                  if (formData?.state_id) {
                    return formData?.state_id === option?.value;
                  }
                })}
                isDisabled={true}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                County Name <span className="text-danger">*</span>
              </label>
              <Select
                id="county_id"
                className="form-control p-0 col-sm-12"
                name="county_id"
                placeholder="select County Name"
                onChange={(selectedOptions) =>
                  setFormData((prev) => ({
                    ...prev,
                    county_id: selectedOptions?.value,
                  }))
                }
                options={county_list}
                value={county_list.filter((option) => {
                  if (formData?.county_id) {
                    return formData?.county_id === option?.value;
                  }
                })}
                isDisabled={true}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                ZipCode <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="zipcode"
                value={formData?.zipcode}
                onChange={handleChange}
                type="text"
                placeholder="Enter ZipCode"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Parcel Id <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="parcel_id"
                value={formData?.parcel_id}
                onChange={handleChange}
                type="text"
                placeholder="Enter Parcel Id"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Sub Division <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="sub_division"
                value={formData?.sub_division}
                onChange={handleChange}
                type="text"
                placeholder="Enter Sub Division"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Block <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="block"
                value={formData?.block}
                onChange={handleChange}
                type="text"
                placeholder="Enter Block"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Lot <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="lot"
                value={formData?.lot}
                onChange={handleChange}
                type="text"
                placeholder="Enter Lot"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Section <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="section"
                value={formData?.section}
                onChange={handleChange}
                type="text"
                placeholder="Enter Section"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Land Value <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="land_value"
                value={formData?.land_value}
                onChange={handleChange}
                type="text"
                placeholder="Enter Land Value"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Improvement Value <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="improvement_value"
                value={formData?.improvement_value}
                onChange={handleChange}
                type="text"
                placeholder="Enter Improvement Value"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Total Assessed Value <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="total_assessed_value"
                value={formData?.total_assessed_value}
                onChange={handleChange}
                type="text"
                placeholder="Enter Total Assessed Value"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData?.description}
                onChange={handleChange}
                placeholder="Enter Description"
                style={{ height: "100px" }}
                disabled
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
                    checked={formData?.status === "active"}
                    disabled
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
                    checked={formData?.status === "inactive"}
                    disabled
                  />
                  <label className="form-label" htmlFor="ip_status_inactive">
                    InActive
                  </label>
                </div>
              </div>
            </div>
            <div
              className="col-md-12 p-2 mb-3"
              style={{ backgroundColor: "#c5caec" }}
            >
              <h5 className="mb-0">Orders Setup</h5>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Product Type <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="product_type"
                value={formData?.product_type}
                onChange={handleChange}
                type="text"
                placeholder="Enter Product Type Value"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Transaction Type <span className="text-danger">*</span>
              </label>
              <Select
                id="county_id"
                className="form-control p-0 col-sm-12"
                name="transaction_type_id"
                placeholder="select Transaction Type"
                onChange={(selectedOptions) =>
                  setFormData((prev) => ({
                    ...prev,
                    transaction_type_id: selectedOptions?.value,
                  }))
                }
                options={transaction_type_list}
                value={transaction_type_list.filter((option) => {
                  if (formData?.transaction_type_id) {
                    return formData?.transaction_type_id === option?.value;
                  }
                })}
                isDisabled={true}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                work Flow Group <span className="text-danger">*</span>
              </label>
              <Select
                id="work_flow_group_id"
                className="form-control p-0 col-sm-12"
                name="work_flow_group_id"
                placeholder="select work Flow Group"
                onChange={(selectedOptions) =>
                  setFormData((prev) => ({
                    ...prev,
                    work_flow_group_id: selectedOptions?.value,
                  }))
                }
                options={work_flow_group_list}
                value={work_flow_group_list.filter((option) => {
                  if (formData?.work_flow_group_id) {
                    return formData?.work_flow_group_id === option?.value;
                  }
                })}
                isDisabled={true}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Property Type <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="property_type"
                value={formData?.property_type}
                onChange={handleChange}
                type="text"
                placeholder="Enter Property Type"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Data Source<span className="text-danger">*</span>
              </label>
              <Select
                id="data_source_id"
                className="form-control p-0 col-sm-12"
                name="data_source_id"
                placeholder="select  Data Source"
                onChange={(selectedOptions) =>
                  setFormData((prev) => ({
                    ...prev,
                    data_source_id: selectedOptions?.value,
                  }))
                }
                options={data_source_list}
                value={data_source_list.filter((option) => {
                  if (formData?.data_source_id) {
                    return formData?.data_source_id === option?.value;
                  }
                })}
                isDisabled={true}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Add-in Product/Service <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="add_in_product"
                value={formData?.add_in_product}
                onChange={handleChange}
                type="text"
                placeholder="Add Product/Service"
                disabled
              />
            </div>
            <div
              className="col-md-12 p-2 mb-3"
              style={{ backgroundColor: "#c5caec" }}
            >
              <h5 className="mb-0">Transaction Details</h5>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Customer Name<span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="customer_name"
                value={formData?.customer_name}
                onChange={handleChange}
                type="text"
                placeholder="Enter Customer Name"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Address<span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                name="customer_address"
                value={formData?.customer_address}
                onChange={handleChange}
                placeholder="Enter Address"
                style={{ height: "100px" }}
                disabled
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Branch Code<span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="branch_code"
                value={formData?.branch_code}
                onChange={handleChange}
                type="text"
                placeholder="Enter Branch Code"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Lender <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="lender"
                value={formData?.lender}
                onChange={handleChange}
                type="text"
                placeholder="Enter Lender"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Address<span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                name="lender_address"
                value={formData?.lender_address}
                onChange={handleChange}
                placeholder="Enter Address"
                style={{ height: "100px" }}
                disabled
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Branch Code<span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="lender_branch_code"
                value={formData?.lender_branch_code}
                onChange={handleChange}
                type="text"
                placeholder="Enter Branch Code"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                File <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="file"
                value={formData?.file}
                onChange={handleChange}
                type="text"
                placeholder="Enter file"
                disabled
              />
            </div>{" "}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Loan <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="loan"
                value={formData?.loan}
                onChange={handleChange}
                type="text"
                placeholder="Enter loan"
                disabled
              />
            </div>{" "}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Sales Price <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="sales_price"
                value={formData?.sales_price}
                onChange={handleChange}
                type="number"
                placeholder="Enter sales price"
                min="0"
                disabled
              />
            </div>{" "}
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Loan Type <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="loan_type"
                value={formData?.loan_type}
                onChange={handleChange}
                type="text"
                placeholder="Enter Loan Type"
                disabled
              />
            </div>{" "}
            <div className="col-md-3 mb-3 d-flex flex-column">
              <label className="form-label">
                Loan Date <span className="text-danger">*</span>
              </label>
              <DatePicker
                closeOnScroll={(e) => e.target === document}
                selected={formData?.loan_date || new Date()}
                name="loan_date"
                value={formData?.loan_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, loan_date: date }))
                }
                className="form-control"
                placeholderText="Enter Loan Date"
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-calendar"
                disabled
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Loan Amount <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="loan_amount"
                value={formData?.loan_amount}
                onChange={handleChange}
                type="number"
                placeholder="Enter Loan Amount"
                min="0"
                disabled
              />
            </div>
            <div className="col-md-12 mb-3">
              <Tabs
                defaultActiveKey="1"
                items={itemsTab}
                // onChange={onChange}
              />
            </div>
          </div>
          {/* <div className="row w-100">
              <div className="col-md-6 p-0" style={{ textAlign: "left" }}>
                <button
                  className="btn btn-danger"
                  type="button"
                  // data-bs-dismiss="modal"
                  onClick={() => navigate("/order-entry")}
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
            </div> */}
          {/* </form> */}
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="BorrowerOrSellerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="BorrowerOrSellerModalLabel">
                Add {tab}  Details
              </h5>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                id="borrowerOrSellerModalClose"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={submitBorrowerOrSellerDataRow}>
              <input
                type="hidden"
                name="order_borrower_or_seller_id"
                value={formBorrowerOrSellerData?.order_borrower_or_seller_id}
                onChange={handleBorrowerOrSellerChange}
              />
              <input
                type="hidden"
                name="borrower_or_seller"
                value={formBorrowerOrSellerData?.borrower_or_seller}
                onChange={handleBorrowerOrSellerChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      {tab} Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="name"
                      value={formBorrowerOrSellerData?.name}
                      onChange={handleBorrowerOrSellerChange}
                      type="text"
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">SSN</label>
                    <input
                      className="form-control"
                      name="ssn"
                      value={formBorrowerOrSellerData?.ssn}
                      onChange={handleBorrowerOrSellerChange}
                      type="text"
                      placeholder="Enter SSN"
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3 d-flex flex-column">
                    <label className="form-label">
                      DOB <span className="text-danger">*</span>
                    </label>
                    <DatePicker
                      closeOnScroll={(e) => e.target === document}
                      selected={formBorrowerOrSellerData?.dob || new Date()}
                      name="dob"
                      value={formBorrowerOrSellerData?.dob}
                      onChange={(date) =>
                        setBorrowerOrSellerFormData((prev) => ({ ...prev, dob: date }))
                      }
                      className="form-control"
                      placeholderText="Enter DOB"
                      dateFormat="yyyy-MM-dd"
                      calendarClassName="custom-calendar"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="row w-100">
                  <div className="col-md-6 p-0" style={{ textAlign: "left" }}>
                    <button
                      className="btn btn-danger"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-md-6 p-0" style={{ textAlign: "right" }}>
                    <button
                      className="btn btn-success"
                      id="ip_submit_modal_btn"
                      type="submit"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OrderSummary;
