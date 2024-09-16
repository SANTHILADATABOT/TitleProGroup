import { useEffect, useState } from "react";
import $ from "jquery";
import TreeTableSingleLevel from "../../../inc/components/TreeTableSingleLevel";
import AdminRepository from "../../../../repositories/AdminRepository";
import Swal from "sweetalert2";
import Select from "react-select";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const UserScreen = () => {
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
    "Screen Name" /* ,"Queue No" */,
    "More Options",
    "Remove Options",
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState({});
  var [formData, setFormData] = useState({
    user_screen_id: "",
    main_id: "0",
    screen_name: "",
    order_number: "",
    more_options: "[]",
    remove_options: "[]",
    description: "",
    status: "",
  });
  var [main_screen_list, set_main_screen_list] = useState([]);
  useEffect(() => {
    fetch_data();
  }, []);
  const fetch_data = async () => {
    var response1 = await AdminRepository.user_screen_creation_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        console.log("tb_data", response1?.user_screen_creation_index || []);
        var table_content_div1 = {};
        (response1?.user_screen_creation_index || []).forEach(
          (element, index) => {
            if (element?.user_screen_id) {
              const row_data = [
                element?.cnt || "",
                (element?.screen_name ? `${element?.screen_name} (${element?.user_screen_id})` : ""),
                /* (element?.order_number || ''), */
                (<div style={{ width: "250px" }}>
                  {(element?.more_options !== ""
                    ? JSON.parse(element?.more_options || "[]")
                    : []
                  ).join(", ")}
                </div>),
                (element?.remove_options !== ""
                  ? JSON.parse(element?.remove_options || "[]")
                  : []
                ).join(", "),
                (<span
                  className={`badge badge-${
                    element?.status === "active" ? "success" : "danger"
                  }`}
                >
                  {element?.status || ""}
                </span>),
                (<>
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-original-title="test"
                    data-bs-target="#inputFormModal"
                    onClick={() =>
                      openInputFormModal(element?.user_screen_id || "")
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      deleteDataRow(element?.user_screen_id || "")
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </>),
              ];
              if (element?.main_id === 0) {
                table_content_div1[element?.user_screen_id] = {
                  data: row_data,
                  children: [],
                };
              } else {
                table_content_div1[element?.main_id].children.push(row_data);
              }
            }
          }
        );
        set_table_content_div(table_content_div1);
      }
    }
  };

  const handleChange = (e, id = "") => {
    if (id === "main_id") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: e?.value,
      }));
    } else if (
      e.target.id === "option_view" ||
      e.target.id === "option_add" ||
      e.target.id === "option_edit" ||
      e.target.id === "option_delete"
    ) {
      var remove_options = [];
      if ($("#option_view").prop("checked") === true) {
        remove_options.push("view");
      }
      if ($("#option_add").prop("checked") === true) {
        remove_options.push("add");
      }
      if ($("#option_edit").prop("checked") === true) {
        remove_options.push("edit");
      }
      if ($("#option_delete").prop("checked") === true) {
        remove_options.push("delete");
      }
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: JSON.stringify(remove_options),
      }));
    } else if (e.target.id === "more_options") {
      var more_options = [];
      (e.target.value || "").split(",").forEach((valu1, index) => {
        if (valu1 !== "") {
          more_options.push(valu1);
        }
      });
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: JSON.stringify(more_options),
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
    $("#option_view").prop("checked", false);
    $("#option_add").prop("checked", false);
    $("#option_edit").prop("checked", false);
    $("#option_delete").prop("checked", false);
    $("#more_options").val("");
    setFormData({
      user_screen_id: id,
      main_id: "0",
      screen_name: "",
      order_number: "",
      more_options: "[]",
      remove_options: "[]",
      description: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #exampleModalLabel").html("Add New User Screen");
      $("#inputFormModal #ip_submit_btn").html("Add User Screen");
      var response1 = await AdminRepository.user_screen_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var main_screen_list1 = [
            { value: "0", label: "Select Main Screen Name" },
          ];
          (response1?.user_screen_creation_create || []).forEach(
            (request1, index) => {
              main_screen_list1.push({
                value: request1.user_screen_id,
                label: request1.screen_name,
              });
            }
          );
          set_main_screen_list(main_screen_list1);
        }
      }
    } else {
      $("#inputFormModal #exampleModalLabel").html("Edit User Screen");
      $("#inputFormModal #ip_submit_btn").html("Update User Screen");
      var response1 = await AdminRepository.user_screen_creation_edit({
        user_screen_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.user_screen_creation_edit || [];
          if (edit_data.length > 0) {
            var main_screen_list1 = [
              { value: "0", label: "Select Main Screen Name" },
            ];
            (response1?.Menu || []).forEach((request1, index) => {
              main_screen_list1.push({
                value: request1.user_screen_id,
                label: request1.screen_name,
              });
            });
            set_main_screen_list(main_screen_list1);

            var remove_options = JSON.parse(
              edit_data[0]?.remove_options || "[]"
            );
            $("#option_view").prop(
              "checked",
              remove_options.indexOf("view") !== -1
            );
            $("#option_add").prop(
              "checked",
              remove_options.indexOf("add") !== -1
            );
            $("#option_edit").prop(
              "checked",
              remove_options.indexOf("edit") !== -1
            );
            $("#option_delete").prop(
              "checked",
              remove_options.indexOf("delete") !== -1
            );

            var more_options = JSON.parse(edit_data[0]?.more_options || "[]");
            $("#more_options").val(more_options.join(","));

            setFormData({
              user_screen_id: id,
              main_id: edit_data[0]?.main_id || "0",
              screen_name: edit_data[0]?.screen_name || "",
              order_number: edit_data[0]?.order_number || "",
              more_options: edit_data[0]?.more_options || "[]",
              remove_options: edit_data[0]?.remove_options || "[]",
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
    if (formData?.user_screen_id === "") {
      response1 = await AdminRepository.user_screen_creation_insert(formData);
    } else {
      response1 = await AdminRepository.user_screen_creation_update(formData);
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        Swal.fire({
          title:
            formData?.user_screen_id === ""
              ? "User Screen Created Successfully"
              : "User Screen Updated Successfully",
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
        title: "Remove User Screen",
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
            var response1 = await AdminRepository.user_screen_creation_delete({
              user_screen_id: id,
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
                User <span>Screen</span>
              </h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              <button
                className="btn btn-info"
                onClick={() => refreshTable()}
              >
                <i className="fa fa-refresh"></i>
              </button>
              <button
                className="btn btn-primary text-white ms-1"
                type="button"
                data-bs-toggle="modal"
                data-bs-original-title="test"
                data-bs-target="#inputFormModal"
                onClick={() => openInputFormModal("")}
              >
                <i className="fa fa-plus text-white"></i> Add User Screen
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <TreeTableSingleLevel
                column={table_col}
                row_data={table_content_div}
              />
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
                name="user_screen_id"
                value={formData?.user_screen_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Main Screen Name</label>
                    <Select
                      id="main_id"
                      className="form-control p-0 col-sm-12"
                      name="main_id"
                      onChange={(selectedOptions) =>
                        handleChange(selectedOptions, "main_id")
                      }
                      options={main_screen_list}
                      value={main_screen_list.filter((option) => {
                        if (formData?.main_id) {
                          return formData?.main_id === option?.value;
                        }
                      })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Screen Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="screen_name"
                      value={formData?.screen_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Screen Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Queue Number <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="order_number"
                      value={formData?.order_number}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      placeholder="Enter Queue Number"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      More Options{" "}
                      <span className="text-danger">(Split by comma)</span>
                    </label>
                    <input
                      className="form-control"
                      name="more_options"
                      id="more_options"
                      data-role="tagsinput"
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter More Options"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Remove Options</label>
                    <br />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="option_view"
                        name="remove_options"
                        value="view"
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="option_view">
                        View
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="option_add"
                        name="remove_options"
                        value="add"
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="option_add">
                        Add
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="option_edit"
                        name="remove_options"
                        value="edit"
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="option_edit">
                        Edit
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="option_delete"
                        name="remove_options"
                        value="delete"
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="option_delete"
                      >
                        Delete
                      </label>
                    </div>
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
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
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

export default UserScreen;
