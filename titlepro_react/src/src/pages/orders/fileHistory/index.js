import { useCallback, useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { Drawer, Tabs } from "antd";
// import { BorrowerTable } from "./borrowerTable";
// import { SellerTable } from "./sellerTable";
import { useNavigate } from "react-router-dom";
import { FilterOutlined, ProfileOutlined } from "@ant-design/icons";
import DataTable from "../../../inc/components/DataTable";
import { element } from "prop-types";
import CommonVariables from "../../../../layouts/CommonVariables";
import UserRightsRepository from '../../../../repositories/UserRightsRepository';

const FileHistory = () => {
 var [table_col, set_table_col] = useState([
   "Sno",
   "Date",
   "User",
   "Entity",
   "Operations",
   "Acion",
 ]);
   var [table_load, set_table_load] = useState(true);
   var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    order_id: "",
    order_number: "",
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
  var [formBorrowerOrSellerData, setBorrowerOrSellerFormData] = useState({
    order_borrower_or_seller_id: "",
    borrower_or_seller: "",
    name: "",
    ssn: "",
    dob: "",
  });
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
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
var [user_rights, set_user_rights] = useState({});
useEffect(() => {

  const fetch_data = async () => {
    var response1 = await UserRightsRepository.get_user_rights({
      user_type_id: CommonVariables?.userDetails?.user_type_id,
      user_screen_id: 36,
    });
    if (response1) {
      if (response1?.status === "SUCCESS") {
        set_user_rights(response1?.get_user_rights);
      }
    }
  };
  fetch_data();
}, [CommonVariables]);

console.log(user_rights);
   const fetch_data = async () => {
    
if (user_rights?.edit_rights === "1" || user_rights?.delete_rights === "1") {
  set_table_col(["Sno", "Date", "User", "Entity", "Operations", "Acion"]);
} else {
  set_table_col([
   "Sno",
   "Date",
   "User",
   "Entity",
   "Operations",
  ])
}
     var response1 = await OrdersRepository.orders_file_history_index({
       order_id:order_id,
     });
     if (response1) {
       if (response1?.status === "SUCCESS") {
         set_table_content_div(response1?.orders_file_history_index);
         set_table_load(true);
       }
     }
   };
   useEffect(() => {
     set_table_load(false);
     fetch_data();
   }, [order_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleBorrowerOrSellerChange = (e) => {
    const { name, value } = e.target;
    setBorrowerOrSellerFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    // setTab(tab);
    setBorrowerOrSellerFormData({
      order_borrower_or_seller_id: id,
      borrower_or_seller: tab,
      name: "",
      ssn: "",
      dob: "",
    });
    if (id === "") {
      $("#inputFormModal #BorrowerOrSellerModalLabel").html(`Add ${tab} Entry`);
      $("#inputFormModal #ip_submit_modal_btn").html(`Add ${tab} Entry`);
    } else {
      $("#inputFormModal #BorrowerOrSellerModalLabel").html(
        `Edit ${tab} Entry`
      );
      $("#inputFormModal #ip_submit_modal_btn").html(`Update ${tab} Entry`);
      var response1 =
        await OrdersRepository.order_entry_borrower_or_seller_edit({
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
  }, []);
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
  //tabs
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const newTabIndex = useRef(0);
  var { order_id } = useParams();
  // const navigate = useNavigate();

  // const [open, setOpen] = useState(false);

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // };
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
    navigate(`/order-entry/${newActiveKey}/file-history`);
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
      navigate(`/order-entry/${newActiveKey}/file-history`);
      setItems(newPanes);
      // setActiveKey(newActiveKey);
    }
  };
  const onEdit = (targetKey, action) => {
    remove(targetKey);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row mb-5">
            <div className="col-lg-6 main-header">
              {/* <h2>Order Entry</h2> */}
              <h2>
                Order <span style={{ color: "black" }}>File History</span>
              </h2>
            </div>
            <div
              className="col-lg-6 main-header"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button className="btn btn-success" onClick={showDrawer}>
                <FilterOutlined /> Add Order Entry
              </button>
            </div>
          </div>
          <div className="row" id="tabpanel">
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
        <div className="row">
          {/* <div className="col-sm-12"> */}
          {table_load && (
            <DataTable
              column={table_col}
              row_data={
                table_content_div &&
                table_content_div.map((element, index) => (
                  <tr key={index}>
                    <td
                    //   onClick={() => handleCopy(element)}
                    >
                      {index + 1}
                    </td>
                    {/* <td>
                      <ProfileOutlined />
                    </td> */}
                    <td style={{ whiteSpace: "nowrap" }}>
                      {element?.created_datetime || ""}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {element?.user_id || ""}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {element?.entry_name || ""}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {element?.action || ""}
                    </td>
                    {/* <td style={{ whiteSpace: "nowrap" }}>
                      {element?.county_name || ""}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {element?.active_workflow || ""}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {element?.work_flow_group_name || ""}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {element?.assigned_to || ""}
                    </td> */}
                    {/* <td>
                      <span
                        className={`badge badge-${
                          element?.status === "active" ? "success" : "danger"
                        }`}
                      >
                        {element?.status || ""}
                      </span>
                    </td> */}
                    {(user_rights?.edit_rights === "1" ||
                      user_rights?.delete_rights === "1") && (
                      <td className="text-center">
                        {user_rights?.edit_rights === "1" && (
                          <button
                            className="btn btn-primary m-1"
                            data-bs-toggle="modal"
                            data-bs-original-title="test"
                            data-bs-target="#inputFormModal"
                            // onClick={() =>
                            //   openInputFormModal(element?.user_id || "")
                            // }
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {user_rights?.delete_rights === "1" && (
                          <button
                            className="btn btn-danger m-1"
                            // onClick={() =>
                            //   deleteDataRow(element?.user_id || "")
                            // }
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              }
            />
          )}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default FileHistory;
