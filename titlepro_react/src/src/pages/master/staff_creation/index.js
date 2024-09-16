import { useEffect, useState } from "react";
import $ from "jquery";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import Select from "react-select";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const StaffCreation = () => {
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
    "Staff Name",
    "Address",
    "Contact Number",
    "Email Id",
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    staff_id: "",
    department_id: "",
    staff_category_id: "",
    staff_name: "",
    gender: "",
    marital_status: "",
    dob: "",
    email_id: "",
    mobile_number: "",
    emergency_mobile_number: "",
    city_name: "",
    state_id: "",
    county_id: "",
    address: "",
    zipcode: "",
    status: "",
  });
  var [department_list, set_department_list] = useState([]);
  var [staff_category_list, set_staff_category_list] = useState([]);
  var [county_list, set_county_list] = useState([]);
  var [state_list, set_state_list] = useState([]);

  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 48,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_user_rights(response1?.get_user_rights);
        }
      }
    };
    fetch_data();
  }, [CommonVariables]);
  
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
    const textToCopy = `
        Entry Date: ${item?.entry_date || ""}
        Staff Name: ${item?.staff_name || ""}
        Address: ${item?.address || ""}
        Mobile Number: ${item?.mobile_number || ""}
        Email ID: ${item?.email_id || ""}
        Status: ${item?.status || ""}
    `;
    copyToClipboard(textToCopy);
  };
  useEffect(() => {
    if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
      set_table_col([
        "Sno",
        "Date",
        "Staff Name",
        "Address",
        "Contact Number",
        "Email Id",
        "Status",
        "Action",
      ]);
    } else {
      set_table_col([
        "Sno",
        "Date",
        "Staff Name",
        "Address",
        "Contact Number",
        "Email Id",
        "Status",
      ]);
    }

    fetch_data();
  }, [user_rights]);
  const fetch_data = async () => {
    var response1 = await DataRepository.staff_creation_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.staff_creation_index || []).forEach((element, index) => {
          var tb_row = [(<span onClick={() => handleCopy(element)}>{index + 1}</span>), element?.entry_date || "", element?.staff_name || "", element?.address || "", element?.mobile_number || "", element?.email_id || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>)];
          if((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")){
            tb_row.push(<span className="text-center">
              {(user_rights?.edit_rights === "1") && (
                <button
                  className="btn btn-primary m-1"
                  data-bs-toggle="modal"
                  data-bs-original-title="test"
                  data-bs-target="#inputFormModal"
                  onClick={() => openInputFormModal(element?.staff_id || "")}
                >
                  <i className="fa fa-edit"></i>
                </button>
              )}
              {(user_rights?.delete_rights === "1") && (
                <button
                  className="btn btn-danger m-1"
                  onClick={() => deleteDataRow(element?.staff_id || "")}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}
            </span>);
          }
          table_content_div1.push(tb_row);
        });
        set_table_content_div(table_content_div1);
      }
    }
  };

  const handleChange = (e, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.name === "dob" ? date : e.target.value,
    }));
  };
  
  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);
    setFormData({
      staff_id: id,
      department_id: "",
      staff_category_id: "",
      staff_name: "",
      gender: "",
      marital_status: "",
      dob: "",
      email_id: "",
      mobile_number: "",
      emergency_mobile_number: "",
      city_name: "",
      state_id: "",
      county_id: "",
      address: "",
      zipcode: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #StaffModalLabel").html("Add Staff Creation");
      $("#inputFormModal #ip_submit_btn").html("Add Staff Creation");
      var response1 = await DataRepository.staff_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          const county = response1?.county_creation;
          const state = response1?.state_creation;
          const dep = response1?.department_creation;
          const cat = response1?.staff_category_creation;
          const countyValues =
            county &&
            county.map((item) => ({
              value: item?.county_id,
              label: item?.county_name,
            }));
          const stateValues =
            state &&
            state.map((item) => ({
              value: item?.state_id,
              label: item?.state_name,
            }));
          const depValues =
            dep &&
            dep.map((item) => ({
              value: item?.department_id,
              label: item?.department_name,
            }));
          const catValues =
            cat &&
            cat.map((item) => ({
              value: item?.staff_category_id,
              label: item?.staff_category_name,
            }));
          set_county_list(countyValues);
          set_state_list(stateValues);
          set_department_list(depValues);
          set_staff_category_list(catValues);
        }
      }
    } else {
      $("#inputFormModal #StaffModalLabel").html("Edit Staff Creation");
      $("#inputFormModal #ip_submit_btn").html("Update Staff Creation");
      var response1 = await DataRepository.staff_creation_edit({
        staff_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.staff_creation_edit || [];
          if (edit_data.length > 0) {
            const county = response1?.county_creation;
            const state = response1?.state_creation;
            const dep = response1?.department_creation;
            const cat = response1?.staff_category_creation;
            const countyValues =
              county &&
              county.map((item) => ({
                value: item?.county_id,
                label: item?.county_name,
              }));
            const stateValues =
              state &&
              state.map((item) => ({
                value: item?.state_id,
                label: item?.state_name,
              }));
            const depValues =
              dep &&
              dep.map((item) => ({
                value: item?.department_id,
                label: item?.department_name,
              }));
            const catValues =
              cat &&
              cat.map((item) => ({
                value: item?.staff_category_id,
                label: item?.staff_category_name,
              }));
            set_county_list(countyValues);
            set_state_list(stateValues);
            set_department_list(depValues);
            set_staff_category_list(catValues);
            setFormData({
              staff_id: id,
              department_id: edit_data[0]?.department_id || "",
              staff_category_id: edit_data[0]?.staff_category_id || "",
              staff_name: edit_data[0]?.staff_name || "",
              gender: edit_data[0]?.gender || "",
              marital_status: edit_data[0]?.marital_status || "",
              dob: edit_data[0]?.dob || "",
              email_id: edit_data[0]?.email_id || "",
              mobile_number: edit_data[0]?.mobile_number || "",
              emergency_mobile_number:
                edit_data[0]?.emergency_mobile_number || "",
              city_name: edit_data[0]?.city_name || "",
              state_id: edit_data[0]?.state_id || "",
              county_id: edit_data[0]?.county_id || "",
              address: edit_data[0]?.address || "",
              zipcode: edit_data[0]?.zipcode || "",
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
    if (formData?.staff_id === "") {
      response1 = await DataRepository.staff_creation_insert(formData);
    } else {
      response1 = await DataRepository.staff_creation_update(formData);
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
        title: "Remove Staff Creation",
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
            var response1 = await DataRepository.staff_creation_delete({
              staff_id: id,
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
                Staff <span style={{ color: "black" }}>Creation</span>
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
              {user_rights?.add_rights === "1" && (
                <button
                  className="btn btn-primary text-white ms-1"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-original-title="test"
                  data-bs-target="#inputFormModal"
                  onClick={() => openInputFormModal("")}
                >
                  <i className="fa fa-plus text-white"></i> Add Staff Creation
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
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4,5,6,7]} exportBtns={{excel:(user_rights?.more_rights?.["Excel"] === "1"),pdf:true}} exportTitle="Contact Creation" />
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="StaffModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg  extra-w" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="StaffModalLabel">
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
                name="staff_id"
                value={formData?.staff_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Department Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="select department name"
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          department_id: selectedOptions?.value,
                        }))
                      }
                      options={department_list}
                      value={department_list.filter((option) => {
                        if (formData?.department_id) {
                          return formData?.department_id === option?.value;
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Contact Type Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="contact_type_name"
                      value={formData?.contact_type_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Contact Type Name"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Zip Code <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="zipcode"
                      value={formData?.zipcode}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Zip Code"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Branch Code Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="branch_code"
                      value={formData?.branch_code}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Branch Code Name"
                      required
                    />
                  </div>
                </div>
                <div className="form-row row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Staff Category Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="select staff category"
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          staff_category_id: selectedOptions?.value,
                        }))
                      }
                      options={staff_category_list}
                      value={staff_category_list.filter((option) => {
                        if (formData?.staff_category_id) {
                          return formData?.staff_category_id === option?.value;
                        }
                      })}
                      required
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Staff Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="staff_name"
                      value={formData?.staff_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Staff Name"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Gender <span className="text-danger">*</span>
                    </label>
                    <div className="ms-1">
                      <div
                        className="radio radio-success m-2"
                        style={{ display: "inline" }}
                      >
                        <input
                          id="ip_gender_male"
                          type="radio"
                          name="gender"
                          onChange={handleChange}
                          value="male"
                          checked={formData?.gender === "male"}
                        />
                        <label className="form-label" htmlFor="ip_gender_male">
                          Male
                        </label>
                      </div>
                      <div
                        className="radio radio-danger m-2"
                        style={{ display: "inline" }}
                      >
                        <input
                          id="ip_gender_female"
                          type="radio"
                          name="gender"
                          onChange={handleChange}
                          value="female"
                          checked={formData?.gender === "female"}
                        />
                        <label
                          className="form-label"
                          htmlFor="ip_gender_female"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Marital Status <span className="text-danger">*</span>
                    </label>
                    <div className="ms-1">
                      <div
                        className="radio radio-success m-2"
                        style={{ display: "inline" }}
                      >
                        <input
                          id="ip_marital_status_married"
                          type="radio"
                          name="marital_status"
                          onChange={handleChange}
                          value="married"
                          checked={formData?.marital_status === "married"}
                        />
                        <label
                          className="form-label"
                          htmlFor="ip_marital_status_married"
                        >
                          Married
                        </label>
                      </div>
                      <div
                        className="radio radio-danger m-2"
                        style={{ display: "inline" }}
                      >
                        <input
                          id="ip_marital_status_unmarried"
                          type="radio"
                          name="marital_status"
                          onChange={handleChange}
                          value="unmarried"
                          checked={formData?.marital_status === "unmarried"}
                        />
                        <label
                          className="form-label"
                          htmlFor="ip_marital_status_unmarried"
                        >
                          Unmarried
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      DOB <span className="text-danger">*</span>
                    </label>
                    <br />
                    <DatePicker
                      closeOnScroll={(e) => e.target === document}
                      name="dob"
                      selected={formData?.dob || new Date()}
                      onChange={(date) =>
                        setFormData((prev) => ({ ...prev, dob: date }))
                      }
                      className="form-control"
                      placeholderText="Enter DOB"
                      dateFormat="yyyy-MM-dd"
                      calendarClassName="custom-calendar"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Email-Id <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="email_id"
                      value={formData?.email_id}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Email-Id Name"
                      required
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Contact Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="mobile_number"
                      value={formData?.mobile_number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Contact Number"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Alternate Contact Number{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="emergency_mobile_number"
                      value={formData?.emergency_mobile_number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Alternate Contact Number"
                      required
                    />
                  </div>
                </div>
                <div className="form-row row">
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
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      State Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="select state name"
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          state_id: selectedOptions?.value,
                        }))
                      }
                      options={state_list}
                      value={state_list.filter((option) => {
                        if (formData?.state_id) {
                          return formData?.state_id === option?.value;
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
                      placeholder="select county name"
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
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
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData?.address}
                      onChange={handleChange}
                      placeholder="Enter Address"
                      style={{ height: "100px", resize: "none" }}
                    ></textarea>
                  </div>
                </div>

                <div className="form-row">
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

export default StaffCreation;
