import { useEffect, useState } from "react";
import $ from "jquery";
import AdminRepository from "../../../../repositories/AdminRepository";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import Swal from "sweetalert2";
import Select from "react-select";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const UserCreation = () => {
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
    "User Type",
    "User Name",
    "Contact No",
    "Mail Id",
    "Description",
    "Status",
    "Action"
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    user_id: "",
    user_type_id: "",
    staff_id: "",
    assign_type_id: "[]",
    mobile_number: "",
    mail_id: "",
    user_name: "",
    password: "",
    confirm_password: "",
    description: "",
    status: "",
  });
  var [user_type_list, set_user_type_list] = useState([]);
  var [staff_list, set_staff_list] = useState([]);
  var [assign_type_list, set_assign_type_list] = useState([]);
  
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({user_type_id: CommonVariables?.userDetails?.user_type_id, user_screen_id: 23});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_user_rights(response1?.get_user_rights);
        }
      }
    };
    fetch_data();
  }, [CommonVariables]);

  useEffect(() => {
    if((user_rights?.edit_rights === '1') || (user_rights?.delete_rights === '1')){
      set_table_col(["Sno","Date","User Type","User Name","Contact No","Mail Id","Description","Status","Action"]);
    }else{
      set_table_col(["Sno","Date","User Type","User Name","Contact No","Mail Id","Description","Status"]);
    }
    
    fetch_data();
  }, [user_rights]);

  const fetch_data = async () => {
    var response1 = await AdminRepository.user_creation_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.user_creation_index || []).forEach((element, index) => {
          var tb_row = [index + 1, element?.entry_date || "", element?.user_type_name || "", element?.user_name || "", element?.mobile_number || "", element?.mail_id || "", element?.description || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>), ];
          if((user_rights?.edit_rights === '1') || (user_rights?.delete_rights === '1')){
            tb_row.push(<td className="text-center">
                {(user_rights?.edit_rights === '1') && (<button
                  className="btn btn-primary m-1"
                  data-bs-toggle="modal"
                  data-bs-original-title="test"
                  data-bs-target="#inputFormModal"
                  onClick={() => openInputFormModal(element?.user_id || "")}
                >
                  <i className="fa fa-edit"></i>
                </button>)}
                {(user_rights?.delete_rights === '1') && (<button
                  className="btn btn-danger m-1"
                  onClick={() => deleteDataRow(element?.user_id || "")}
                >
                  <i className="fa fa-trash"></i>
                </button>)}
              </td>);
          }
          table_content_div1.push(tb_row);
        });
        set_table_content_div(table_content_div1);
      }
    }
  };

  const handleChange = (e, id = "") => {
    if (id === "user_type_id" || id === "staff_id") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: e?.value,
      }));
    } else if (id === "assign_type_id") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: JSON.stringify(e?.map((option) => option.value) || []),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);
    $("#password").val("");
    $("#confirm_password").val("");
    setFormData({
      user_id: id,
      user_type_id: "",
      staff_id: "",
      assign_type_id: "[]",
      mobile_number: "",
      mail_id: "",
      user_name: "",
      password: "",
      confirm_password: "",
      description: "",
      status: "active",
    });
    var response1 = null;
    if (id === "") {
      $("#inputFormModal #exampleModalLabel").html("Add New User Creation");
      $("#inputFormModal #ip_submit_btn").html("Add User Creation");
      response1 = await AdminRepository.user_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var user_type_list1 = [{ value: "", label: "Select User Type" }];
          (response1?.user_type_creation || []).forEach((request1, index) => {
            user_type_list1.push({
              value: request1.user_type_id,
              label: request1.user_type_name,
            });
          });
          set_user_type_list(user_type_list1);
          const staffValue =
            response1?.staff_creation &&
            response1?.staff_creation.map((item) => ({
              value: item?.staff_id,
              label: item?.staff_name,
            }));
          set_staff_list(staffValue);
          var assign_type_list1 = [
            { value: "", label: "Select Assign Task Group" },
          ];
          (response1?.assign_type_creation || []).forEach((request1, index) => {
            assign_type_list1.push({
              value: request1.assign_type_id,
              label: request1.assign_type_name,
            });
          });
          set_assign_type_list(assign_type_list1);
        }
      }
    } else {
      $("#inputFormModal #exampleModalLabel").html("Edit User Creation");
      $("#inputFormModal #ip_submit_btn").html("Update User Creation");
      response1 = await AdminRepository.user_creation_edit({ user_id: id });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.user_creation_edit || [];
          if (edit_data.length > 0) {
            var user_type_list1 = [{ value: "", label: "Select User Type" }];
            (response1?.user_type_creation || []).forEach((request1, index) => {
              user_type_list1.push({
                value: request1.user_type_id,
                label: request1.user_type_name,
              });
            });
            set_user_type_list(user_type_list1);
            const staffValue =
              response1?.staff_creation &&
              response1?.staff_creation.map((item) => ({
                value: item?.staff_id,
                label: item?.staff_name,
              }));
            set_staff_list(staffValue);
            var assign_type_list1 = [
              { value: "", label: "Select Assign Task Group" },
            ];
            (response1?.assign_type_creation || []).forEach(
              (request1, index) => {
                assign_type_list1.push({
                  value: request1.assign_type_id,
                  label: request1.assign_type_name,
                });
              }
            );
            set_assign_type_list(assign_type_list1);
            setFormData({
              user_id: id,
              user_type_id: edit_data[0]?.user_type_id || "",
              staff_id: edit_data[0]?.staff_id || "",
              assign_type_id: edit_data[0]?.assign_type_id || "[]",
              mobile_number: edit_data[0]?.mobile_number || "",
              mail_id: edit_data[0]?.mail_id || "",
              user_name: edit_data[0]?.user_name || "",
              password: edit_data[0]?.password || "",
              confirm_password: edit_data[0]?.confirm_password || "",
              description: edit_data[0]?.description || "",
              status: edit_data[0]?.status || "",
            });
          }
        }
      }
    }
  };
  const submitDataRow = async (e) => {
    e.preventDefault();

    var response1 = null;
    const pwd = formData?.password || "";
    const cpwd = formData?.confirm_password || "";
    if (pwd || cpwd || formData?.user_id === "") {
      if (!pwd) {
        alert("Enter Password");
        $("#password").focus();
        return false;
      }
      if (!cpwd) {
        alert("Enter Confirm Password");
        $("#confirm_password").focus();
        return false;
      }
      if (pwd !== cpwd) {
        alert("Confirm Password Mismatched");
        $("#confirm_password").focus();
        return false;
      }
    }
    if (formData?.user_id === "") {
      response1 = await AdminRepository.user_creation_insert(formData);
    } else {
      response1 = await AdminRepository.user_creation_update(formData);
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        Swal.fire({
          title:
            formData?.user_id === ""
              ? "User Created Successfully"
              : "User Updated Successfully",
          //text: 'This alert will close in 3 seconds.',
          icon: "success",
          timer: 1000,
          timerProgressBar: true, // Show a progress bar indicating the remaining time
          showConfirmButton: false,
        }).then((result) => {
          refreshTable();
          $("#inputFormModal .btn-close").trigger({ type: "click" });
        });
      }
    }
  };
  const deleteDataRow = async (id) => {
    if (id !== "") {
      Swal.fire({
        title: "Remove User Creation",
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
            var response1 = await AdminRepository.user_creation_delete({
              user_id: id,
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
        <div className="page-header" style={{ paddingBottom: "0px" }}>
          <div className="row">
            <div className="col-lg-6 main-header">
              <h2>
                User <span>Creation</span>
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
              {(user_rights?.add_rights === '1') && (<button
                className="btn btn-primary text-white ms-1"
                type="button"
                data-bs-toggle="modal"
                data-bs-original-title="test"
                data-bs-target="#inputFormModal"
                onClick={() => openInputFormModal("")}
              >
                <i className="fa fa-plus text-white"></i> Add User Creation
              </button>)}
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
      </div>
      <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
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
                name="user_id"
                value={formData?.user_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      User Type <span className="text-danger">*</span>
                    </label>
                    <Select
                      required
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      onChange={(selectedOptions) =>
                        handleChange(selectedOptions, "user_type_id")
                      }
                      options={user_type_list}
                      value={user_type_list.filter((option) => {
                        if (formData?.user_type_id) {
                          return formData?.user_type_id === option?.value;
                        }
                      })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      User Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="user_name"
                      value={formData?.user_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter User Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Staff Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      required
                      id="staff_id"
                      className="form-control p-0 col-sm-12"
                      name="staff_id"
                      onChange={(selectedOptions) =>
                        handleChange(selectedOptions, "staff_id")
                      }
                      options={staff_list}
                      value={staff_list.filter((option) => {
                        if (formData?.staff_id) {
                          return formData?.staff_id === option?.value;
                        }
                      })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Assign Task Group <span className="text-danger">*</span>
                    </label>
                    <Select
                      required
                      id="assign_type_id"
                      className="form-control p-0 col-sm-12"
                      name="assign_type_id"
                      onChange={(selectedOptions) =>
                        handleChange(selectedOptions, "assign_type_id")
                      }
                      options={assign_type_list}
                      isMulti
                      value={assign_type_list.filter((option) => {
                        if (formData?.assign_type_id && option?.value !== "") {
                          return JSON.parse(formData?.assign_type_id).includes(
                            option?.value
                          );
                        }
                      })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Contact Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="mobile_number"
                      value={formData?.mobile_number}
                      onChange={handleChange}
                      type="tel"
                      placeholder="Enter Contact Number"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Mail Id <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="mail_id"
                      value={formData?.mail_id}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter Mail Id"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="confirm_password"
                      id="confirm_password"
                      onChange={handleChange}
                      type="password"
                      placeholder="Enter Confirm Password"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData?.description}
                      onChange={handleChange}
                      placeholder="Enter Description"
                    ></textarea>
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

export default UserCreation;
