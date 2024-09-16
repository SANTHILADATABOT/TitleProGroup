import { useEffect, useState } from "react";
import $ from "jquery";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import Select from "react-select";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const WorkFlowGroupCreation = () => {
  const [loading, setLoading] = useState(false);
  const refreshTable = () => {
    setLoading(true);
    fetch_data();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const navigate = useNavigate();
  var [table_col, set_table_col] = useState([
    "Sno",
    "Work Flow Group Name",
    "Created By",
    "Created On",
    "Updated By",
    "Updated On",
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    work_flow_group_id: "",
    work_flow_group_name: "",
    description: "",
    status: "",
  });
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 46,
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
    const textToCopy = `Work Flow Group Name: ${item.work_flow_group_name || ""
      }\nCreated User ID: ${item.created_user_id || ""}\nCreated At: ${item.created_at || ""
      }\nUpdated User ID: ${item.updated_user_id || ""}\nUpdated At: ${item.updated_at || ""
      }\nStatus: ${item.status || ""}`;
    copyToClipboard(textToCopy);
  };
  const importFileUpload = async () => {
    const fileInput = document.getElementById("file_input");
    const file = fileInput?.files[0];

    if (!file) {
      Swal.fire({
        title: "No file selected",
        icon: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response =
        await DataRepository.work_flow_group_creation_import_excel(formData);

      if (response?.status === "SUCCESS") {
        Swal.fire({
          title: "Excel Import Success",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Import Failed",
          text: response?.message || "An unknown error occurred",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Import Failed",
        text: error.message || "An unknown error occurred",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
      set_table_col([
        "Sno",
        "Work Flow Group Name",
        "Created By",
        "Created On",
        "Updated By",
        "Updated On",
        "Status",
        "Action",
      ]);
    } else {
      set_table_col([
        "Sno",
        "Work Flow Group Name",
        "Created By",
        "Created On",
        "Updated By",
        "Updated On",
        "Status",
      ]);
    }
    fetch_data();
  }, [user_rights]);
  const fetch_data = async () => {
    var response1 = await DataRepository.work_flow_group_creation_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.work_flow_group_creation_index || []).forEach(
          (element, index) => {
            var tb_row = [(<span onClick={() => { handleCopy(element); }}>{index + 1}</span>), (<span className={`badge badge-primary`} onClick={() => handleRowClick(element?.work_flow_group_id)}> {element?.work_flow_group_name || ""} </span>), element?.created_user_id || "", (<div style={{whiteSpace:"wrap"}}>{element?.created_at || ""}</div>), element?.updated_user_id || "", (<div style={{whiteSpace:"wrap"}}>{element?.updated_at || ""}</div>), (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>),];
            if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
              tb_row.push(<span className="text-center">
                {(user_rights?.edit_rights === "1") && (
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-original-title="test"
                    data-bs-target="#inputFormModal"
                    onClick={() =>
                      openInputFormModal(
                        element?.work_flow_group_id || ""
                      )
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                )}
                {(user_rights?.delete_rights === "1") && (
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      deleteDataRow(element?.work_flow_group_id || "")
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
  const handleRowClick = (id) => {
    navigate(`/work-flow-creation/${id}`);
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
      work_flow_group_id: id,
      work_flow_group_name: "",
      description: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #workflowgroupModalLabel").html(
        "Add Work Flow Group Creation"
      );
      $("#inputFormModal #ip_submit_btn").html("Add Work Flow Group Creation");
    } else {
      $("#inputFormModal #workflowgroupModalLabel").html(
        "Edit Work Flow Group Creation"
      );
      $("#inputFormModal #ip_submit_btn").html(
        "Update Work Flow Group Creation"
      );
      var response1 = await DataRepository.work_flow_group_creation_edit({
        work_flow_group_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.work_flow_group_creation_edit || [];
          if (edit_data.length > 0) {
            setFormData({
              work_flow_group_id: id,
              work_flow_group_name: edit_data[0]?.work_flow_group_name || "",
              description: edit_data[0]?.description || "",
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
    const work_flow_group_id = formData?.work_flow_group_id;
    console.log(work_flow_group_id);
    if (formData?.work_flow_group_id === "") {
      response1 = await DataRepository.work_flow_group_creation_insert(
        formData
      );
    } else {
      response1 = await DataRepository.work_flow_group_creation_update(
        formData
      );
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
        title: "Remove Work Flow Group Creation",
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
              await DataRepository.work_flow_group_creation_delete({
                work_flow_group_id: id,
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
                Work Flow Group<span> Creation</span>
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
                  <i className="fa fa-plus text-white"></i> Add Work Flow Group
                  Creation
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
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0, 1, 2, 3, 4, 5]} exportBtns={{ excel: (user_rights?.more_rights?.["Excel"] === "1"), pdf: true }} exportTitle="Workflow Group Creation" />
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="workflowgroupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="workflowgroupModalLabel">
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
                name="work_flow_group_id"
                value={formData?.work_flow_group_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      Work Flow Group Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="work_flow_group_name"
                      value={formData?.work_flow_group_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Work Flow Group Name"
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData?.description}
                      onChange={handleChange}
                      placeholder="Enter Description"
                    ></textarea>
                  </div>
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

export default WorkFlowGroupCreation;
