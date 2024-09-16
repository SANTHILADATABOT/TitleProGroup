import { useCallback, useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import DataRepository from "../../../../repositories/DataRepository";
import { Drawer, Tabs } from "antd";
import { FaUser } from 'react-icons/fa';
import { toast } from "react-toastify";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
// import { BorrowerTable } from "./borrowerTable";
// import { SellerTable } from "./sellerTable";
import { FaUserPlus } from 'react-icons/fa'; // Import user icon from react-icons
import { useNavigate } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";
import DataTable from "../../../inc/components/DataTable";
import { write, writeFile, utils } from "xlsx";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";

const OrderNote = () => {
  const [loading, setLoading] = useState(false);
  const refreshTable = () => {
    setLoading(true);
    fetch_data();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [userName, setUserName] = useState([]);
  const [showUserField, setShowUserField] = useState(false);

  // Function to toggle the visibility of the "Taged User" field
  const toggleUserField = () => {
    setShowUserField(!showUserField);
  };
  var { order_id } = useParams();
  const navigate = useNavigate();
  const getTabs = async (cTab) => {
    // const userName =await
    const result = await OrdersRepository.orders_tab_index();
    if (result?.status === "SUCCESS") {
      setItems(result?.orders_tab_index[0]?.items.reverse());
      setActiveKey(cTab || order_id);
    }
  };
  useEffect(() => {
    getTabs("");
  }, []);

  const onChange = (newActiveKey) => {
    navigate(`/order-entry/${newActiveKey}/note-creation`);
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

  var [table_col, set_table_col] = useState([
    "Sno",
    "Date",
    "User Name ",
    "Important",
    "Resolved",
    "Tagged Users",
    // "Tagged User Groups",
    "Note",
    "Action",
  ]);
  var [table_load, set_table_load] = useState(true);
  // const [startDate, setStartDate] = useState(new Date());
  const [copiedId, setCopiedId] = useState([]);
  // const [data,setData] = useState([]);
  // const [allSelected, setAllSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // const []
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    order_id: order_id,
    orders_note_id: "",
    dob: "",
    user_creation_id: "",
    note: "",
  });

  const user = JSON.parse(localStorage.getItem("authData"));
  const userId = user.user_sign_in_check.id;
  const formatDataForClipboard = (item) => {
    return `Entry Date: ${item.entry_date || ""}\nCompany Name: ${
      item.company_name || ""
    }\nAddress: ${item.address || ""}\nMobile Number: ${
      item.mobile_number || ""
    }\nEmail ID: ${item.email_id || ""}`;
  };
  const handleCopy = (item) => {
    toast.success("Copied To Clipboard!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
    const formattedText = formatDataForClipboard(item);
    copyToClipboard(formattedText);
    setSelectedItem(item);
  };

  const emailTemplateMap = Array.isArray(userName)
    ? userName.reduce((acc, template) => {
        acc[template.user_creation_id] = template.user_name;
        return acc;
      }, {})
    : {};

  const userNames = Object.entries(emailTemplateMap).map(([id, name]) => ({
    value: id,
    label: name,
  }));
  
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 50,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_user_rights(response1?.get_user_rights);
        }
      }
    };
    fetch_data();
  }, [CommonVariables]);
  
  useEffect(() => {
    if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
      set_table_col([
        "Sno",
        "Date",
        "User Name ",
        "Important",
        "Resolved",
        "Tagged Users",
        // "Tagged User Groups",
        "Note",
        "Action",
      ]);
    } else {
      set_table_col([
        "Sno",
        "Date",
        "User Name ",
        "Important",
        "Resolved",
        "Tagged Users",
        // "Tagged User Groups",
        "Note",
      ]);
    }
    
    fetch_data();
  }, [order_id, user_rights]);

  const fetch_data = async () => {
    const userName = await DataRepository.orders_note_create();
    const userNameList = userName?.user_creation || [];
    const transedValue = userNameList.map((item) => ({
      value: item?.user_creation_id,
      label: item?.user_name,
    }));
    setUserName(transedValue);
    const response1 = await DataRepository.orders_note_index({order_id: order_id});
    if (response1?.status === "SUCCESS") {
      var table_content_div1 = [];
      (response1?.orders_note_index || []).forEach(
        (element, index) => {
          var tb_row = [index + 1, element.dob || "", userId || "", (<input type="checkbox" checked={element.Important} /* onChange={(e) => handleCheckboxChange(e, element.company_id, 'Important')} */ />), (<input type="checkbox" checked={element.Resolved} /* onChange={(e) => handleCheckboxChange(e, element.company_id, 'Resolved')} */ />), element.user_name  || "", element.note || "" ];
          if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
            tb_row.push(<span className="text-center">
              {(user_rights?.edit_rights === "1") && (<button
                className="btn btn-primary m-1"
                data-bs-toggle="modal"
                data-bs-original-title="test"
                data-bs-target="#inputFormModal"
                onClick={() =>
                  openInputFormModal(element.orders_note_id || "")
                }
              >
                <i className="fa fa-edit"></i>
              </button>)}
              {(user_rights?.delete_rights === "1") && (<button
                className="btn btn-danger m-1"
                onClick={() => deleteDataRow(element.orders_note_id || "")}
              >
                <i className="fa fa-trash"></i>
              </button>)}
            </span>);
          }
          table_content_div1.push(tb_row);
        }
      );
      set_table_content_div(table_content_div1);
    }
  };

  const handleChange = (e, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTemplateChange = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle the case when no option is selected (i.e., when it's cleared)
      setFormData((prevValues) => ({
        ...prevValues,
        orders_note_id: order_id,
        dob: "",
        user_creation_id: [],
        note: "",
      }));
    } else {
      setFormData((prevValues) => ({
        ...prevValues,
        user_creation_id: selectedOptions.map(option => option.value),
      }));
    }
  };
  
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };
  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);
    setFormData({
      order_id: order_id,
      orders_note_id: "",
      dob: "",
      user_creation_id: "",
      note: "",
    });
    if (id === "") {
      $("#inputFormModal #companyModalLabel").html("Add Latest Note");
      $("#inputFormModal #ip_submit_btn").html("Add Latest Note");
      
    } else {
      $("#inputFormModal #companyModalLabel").html("Edit Latest Note");
      $("#inputFormModal #ip_submit_btn").html("Update Latest Note");
      var response1 = await DataRepository.orders_note_edit({
        orders_note_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.orders_note_edit || [];
          if (edit_data.length > 0) {
            const userNameList = response1?.user_creation || [];
            const transedValue = userNameList.map((item) => ({
              value: item?.user_creation_id,
              label: item?.user_name,
            }));
            setUserName(transedValue);
            setFormData({
              order_id: order_id,
              orders_note_id: edit_data[0]?.orders_note_id || "",
              dob: edit_data[0]?.dob || "",
              user_creation_id: edit_data[0]?.user_creation_id || "",
              note: edit_data[0]?.note || "",
            });
          }
        }
      }
    }
  };
  const submitDataRow = async (e) => {
    e.preventDefault();

    var response1 = null;
    if (formData.orders_note_id === "") {
      response1 = await DataRepository.orders_note_insert(formData);
    } else {
      response1 = await DataRepository.orders_note_update(formData);
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        refreshTable();
        $("#inputFormModal .btn-close").trigger({ type: "click" });
      }
    }
  };
  
  const deleteDataRow = async (id) => {
    if (id !== "") {
      Swal.fire({
        title: "Remove Company Creation",
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
            var response1 = await DataRepository.orders_note_delete({
              orders_note_id: id,
            });
            if (response1) {
              if (response1?.status === "SUCCESS") {
                refreshTable();
              }
            }
          };
          get_init_datas();
        }
      });
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
        </div>

        <div className="row mb-3">
          <div className="col-lg-6 main-header">
            <h2>
            <span style={{ color: "#3949ab" ,fontWeight:"800"}}>Latest</span> <span style={{ color: "black" ,fontWeight:"800"}}>Note</span>
            </h2>
          </div>
          <div className="col-lg-6" style={{ textAlign: "right",width: "100%", marginTop: "10px"  }}>
            {/* <ExcelExport data={data} fileName="employees" /> */}
            <button
              className="btn btn-info"
              onClick={() => refreshTable()}
            >
              <i className="fa fa-refresh"></i>
            </button>
            {(user_rights?.add_rights === '1') && (<button
              className="btn btn-primary text-white ms-1"
              type="button"
              data-bs-toggle="modal"
              data-bs-original-title="test"
              data-bs-target="#inputFormModal"
              onClick={() => openInputFormModal("")}
            >
              <i className="fa fa-plus text-white"></i> Add Latest Note
            </button>)}

            <div className="col-md-6 mb-3 d-flex align-items-center">
        
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4,5,6,7]} exportBtns={{excel:true,pdf:true}} exportTitle="User Creation" />
            )}
          </div>
        </div>

        <div
          className="modal fade"
          id="inputFormModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="companyModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="companyModalLabel">
                  Modal title
                </h5>
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={submitDataRow}>
                <input
                  type="hidden"
                  name="orders_note_id"
                  value={formData?.orders_note_id}
                  onChange={handleChange}
                />
                <input
                  type="hidden"
                  name="order_id"
                  value={formData?.order_id}
                  onChange={handleChange}
                />
                <div className="modal-body">
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={toggleUserField}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <FaUserPlus style={{ marginRight: '8px', width: '50px' }} />
                      {showUserField ? '' : ''}
                    </button>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Date <span className="text-danger">*</span>
                      </label>
                      <br />
                      <DatePicker
                        style={{ width: "175%" }}
                        selected={formData?.dob} // Bind selected date to state
                        onChange={handleDateChange} // Use date-specific handler
                        className="form-control"
                        placeholderText="Enter DOB"
                        name="dob"
                        dateFormat="yyyy-MM-dd"
                        calendarClassName="custom-calendar"
                      />
                    </div>
                
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Note <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        name="note"
                        value={formData?.note}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter Description"
                        style={{ height: "100px" }}
                      ></textarea>
                    </div>
                    {/* Conditionally Render Taged User Field */}
                    {showUserField && (
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Taged User <span className="text-danger">*</span>
                        </label>
                        <Select
                          placeholder="Select User Name"
                          id="user_type_id"
                          className="form-control p-0 col-sm-12"
                          name="userName"
                          onChange={handleTemplateChange}
                          options={userName}
                          value={userName.filter(
                            (option) => formData.user_creation_id?.includes(option.value)
                          )}
                          isMulti
                        />
                      </div>
                    )}
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
                    <div
                      className="col-md-6 p-0"
                      style={{ textAlign: "right" }}
                    >
                      <button
                        className="btn btn-success"
                        id="ip_submit_btn"
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
        </div>
      </div>
    </>
  );
};

export default OrderNote;
