import { useCallback, useEffect, useState } from "react";
import $ from "jquery";
import DataTable from "../../../inc/components/DataTable";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import Select from "react-select";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";
const CompanyCreation = () => {
  const [loading, setLoading] = useState(false);
  const refreshTable = () => {
    setLoading(true);
    fetch_data();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  var [table_col, set_table_col] = useState([
    "Sno",
    "Date",
    "Company Name",
    "Address",
    "Mobile Number",
    "Email Id",
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    company_id: "",
    company_name: "",
    address: "",
    mobile_number: "",
    phone_number: "",
    gst_number: "",
    tin_number: "",
    email_id: "",
    status: "",
  });
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
    const textToCopy = `Entry Date: ${item.entry_date || ""}\nCompany Name: ${
      item.company_name || ""
    }\nAddress: ${item.address || ""}\nMobile Number: ${
      item.mobile_number || ""
    }\nEmail ID: ${item.email_id || ""}`;
    copyToClipboard(textToCopy);
  };
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 29,
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
    if (
      (user_rights?.edit_rights === "1") ||
      (user_rights?.delete_rights === "1")
    ) {
      set_table_col([
        "Sno",
        "Date",
        "Company Name",
        "Address",
        "Mobile Number",
        "Email Id",
        "Status",
        "Action",
      ]);
    } else {
      set_table_col([
        "Sno",
        "Date",
        "Company Name",
        "Address",
        "Mobile Number",
        "Email Id",
        "Status",
      ]);
    }
    fetch_data();
  }, [user_rights]);

  const fetch_data = async () => {
    var response1 = await DataRepository.company_creation_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.company_creation_index || []).forEach(
          (element, index) => {
            var tb_row = [(<span onClick={() => {handleCopy(element);}}>{index + 1}</span>),element?.entry_date || "", element?.company_name || "", (<div style={{whiteSpace:"wrap"}}>{element?.address || ""}</div>), element?.mobile_number || "", element?.email_id || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>)];
            if((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")){
              tb_row.push(<span className="text-center">
                {(user_rights?.edit_rights === "1") && (
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-original-title="test"
                    data-bs-target="#inputFormModal"
                    onClick={() =>
                      openInputFormModal(element?.company_id || "")
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                )}
                {(user_rights?.delete_rights === "1") && (
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      deleteDataRow(element?.company_id || "")
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                )}
              </span>);
            }
            table_content_div1.push(tb_row);
          }
        );
        set_table_content_div(table_content_div1);
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);
    setFormData({
      company_id: id,
      company_name: "",
      address: "",
      mobile_number: "",
      phone_number: "",
      gst_number: "",
      tin_number: "",
      email_id: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #companyModalLabel").html("Add Company Creation");
      $("#inputFormModal #ip_submit_btn").html("Add Company Creation");
    } else {
      $("#inputFormModal #companyModalLabel").html("Edit Company Creation");
      $("#inputFormModal #ip_submit_btn").html("Update Company Creation");
      var response1 = await DataRepository.company_creation_edit({
        company_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.company_creation_edit || [];
          if (edit_data.length > 0) {
            setFormData({
              company_id: id,
              company_name: edit_data[0]?.company_name || "",
              address: edit_data[0]?.address || "",
              mobile_number: edit_data[0]?.mobile_number || "",
              phone_number: edit_data[0]?.phone_number || "",
              gst_number: edit_data[0]?.gst_number || "",
              tin_number: edit_data[0]?.tin_number || "",
              email_id: edit_data[0]?.email_id || "",
              status: edit_data[0]?.status,
            });
          }
        }
      }
    }
  };
  const submitDataRow = async (e) => {
    e.preventDefault();

    var response1 = null;
    if (formData?.company_id === "") {
      response1 = await DataRepository.company_creation_insert(formData);
    } else {
      response1 = await DataRepository.company_creation_update(formData);
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
            var response1 = await DataRepository.company_creation_delete({
              company_id: id,
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
          <div className="row">
            <div className="col-lg-6 main-header">
              <h2>
                Company <span style={{ color: "black" }}>Creation</span>
              </h2>
            </div>
            <div
              className="col-lg-6"
              style={{ textAlign: "right", width: "100%", marginTop: "10px" }}
            >
              <button
                className="btn btn-info"
                onClick={() => refreshTable()}
              >
                <i className="fa fa-refresh"></i>
              </button>
              {(user_rights?.add_rights === "1") && (
                <button
                  className="btn btn-primary text-white ms-1"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-original-title="test"
                  data-bs-target="#inputFormModal"
                  onClick={() => openInputFormModal("")}
                >
                  <i className="fa fa-plus text-white"></i> Add Company Creation
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4,5,6,7]} exportBtns={{excel:(user_rights?.more_rights?.["Excel"] === "1"),pdf:true}} exportTitle="Company Creation" />
            )}
          </div>
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
                name="company_id"
                value={formData?.company_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="company_name"
                      value={formData?.company_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Company Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      style={{ height: "100px", resize: "none" }}
                      className="form-control"
                      name="address"
                      value={formData?.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                    ></textarea>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="mobile_number"
                      value={formData?.mobile_number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Mobile Number"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="phone_number"
                      value={formData?.phone_number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      GST Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="gst_number"
                      value={formData?.gst_number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter GST Number"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Tin Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="tin_number"
                      value={formData?.tin_number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Tin Number"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Email-Id <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="email_id"
                      value={formData?.email_id}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter Email-Id"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
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
                        />
                        <label
                          className="form-label"
                          htmlFor="ip_status_active"
                        >
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
                        />
                        <label
                          className="form-label"
                          htmlFor="ip_status_inactive"
                        >
                          InActive
                        </label>
                      </div>
                    </div>
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
    </>
  );
};

export default CompanyCreation;
