import { useEffect, useState } from "react";
import $ from "jquery";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import Select from "react-select";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const DataSourceCreation = () => {
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
    "Data Source Name",
    "Description",
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  var [county_list, set_county_list] = useState([]);
  var [state_list, set_state_list] = useState([]);
  var [formData, setFormData] = useState({
    data_source_id: "",
    state_id: "",
    county_id: "",
    data_source_name: "",
    description: "",
    status: "",
  });
  var [stateId, setStateId] = useState("");
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 40,
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
    if (stateId) {
      const fetch_data = async () => {
        try {
          const response1 =
            await DataRepository.data_source_creation_state_dependency({
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
    const textToCopy =
      `Entry Date: ${item?.entry_date || ""}\n` +
      `Data Source Name: ${item?.data_source_name || ""}\n` +
      `Description: ${item?.description || ""}\n` +
      `Status: ${item?.status || ""}`;
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
      const response = await DataRepository.data_source_creation_import_excel(
        formData
      );

      if (response?.status === "SUCCESS") {
        Swal.fire({
          title: "Excel Import Success",
          icon: "success",
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
    if (
      (user_rights?.edit_rights === "1") ||
      (user_rights?.delete_rights === "1")
    ) {
      set_table_col([
        "Sno",
        "Date",
        "Data Source Name",
        "Description",
        "Status",
        "Action",
      ]);
    } else {
      set_table_col([
        "Sno",
        "Date",
        "Data Source Name",
        "Description",
        "Status",
      ]);
    }   
    fetch_data();
  }, [user_rights]);
  const fetch_data = async () => {
    var response1 = await DataRepository.data_source_creation_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.data_source_creation_index || []).forEach(
          (element, index) => {
            var tb_row = [(<span onClick={() => {handleCopy(element);}}>{index + 1}</span>),element?.entry_date || "", element?.data_source_name || "", element?.description || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>),];
            if((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")){
              tb_row.push(<span className="text-center">
                {(user_rights?.edit_rights === "1") && (
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-original-title="test"
                    data-bs-target="#inputFormModal"
                    onClick={() =>
                      openInputFormModal(element?.data_source_id || "")
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                )}
                {(user_rights?.delete_rights === "1") && (
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      deleteDataRow(element?.data_source_id || "")
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
  const stateHandleChange = (option) => {
    const newStateId = option?.value;
    setStateId(newStateId);
    setFormData((prevData) => ({
      ...prevData,
      state_id: option?.value,
    }));
  };
  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);
    setFormData({
      data_source_id: id,
      state_id: "",
      county_id: "",
      data_source_name: "",
      description: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #datasourceModalLabel").html(
        "Add Data Source Creation"
      );
      $("#inputFormModal #ip_submit_btn").html("Add Data Source Creation");
      var response1 = await DataRepository.data_source_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          const county = response1?.county_creation;
          const state = response1?.state_creation;
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
          set_county_list(countyValues);
          set_state_list(stateValues);
          // set_county_list(response1?.county_creation || []);
          // set_state_list(response1?.state_creation || []);
        }
      }
    } else {
      $("#inputFormModal #datasourceModalLabel").html(
        "Edit Data Source Creation"
      );
      $("#inputFormModal #ip_submit_btn").html("Update Data Source Creation");
      var response1 = await DataRepository.data_source_creation_edit({
        data_source_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.data_source_creation_edit || [];
          if (edit_data.length > 0) {
            const county = response1?.county_creation;
            const state = response1?.state_creation;
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
            set_county_list(countyValues);
            set_state_list(stateValues);
            // set_county_list(response1?.county_creation || []);
            // set_state_list(response1?.state_creation || []);
            setFormData({
              data_source_id: id,
              state_id: edit_data[0]?.state_id || "",
              county_id: edit_data[0]?.county_id || "",
              data_source_name: edit_data[0]?.data_source_name || "",
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
    if (formData?.data_source_id === "") {
      response1 = await DataRepository.data_source_creation_insert(formData);
    } else {
      response1 = await DataRepository.data_source_creation_update(formData);
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
        title: "Remove Data Source Creation",
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
            var response1 = await DataRepository.data_source_creation_delete({
              data_source_id: id,
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
                Data Source <span>Creation</span>
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
                  <i className="fa fa-plus text-white"></i> Add Data Source
                  Creation
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="dropdown-container"
            style={{ display: "flex", gap: "15px", marginLeft: "-25px" }}
          >
            <div className="dropdown-item" style={{ width: "300px" }}></div>
            <div className="dropdown-item" style={{ width: "300px" }}></div>
            {/* <div className="dropdown-item" style={{ width: "300px" }}>
              <input
                type="file"
                id="file_input"
                name="file"
                className="form-control"
                accept=".xls,.xlsx"
              />
            </div> */}
            {/* <div className="dropdown-item" style={{ width: "300px" }}>
              <button className="btn btn-secondary" onClick={importFileUpload}>
                Import
              </button>
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4]} exportBtns={{excel:(user_rights?.more_rights?.["Excel"] === "1"),pdf:true}} exportTitle="Data Source Creation" />
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="datasourceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="datasourceModalLabel">
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
                name="data_source_id"
                value={formData?.data_source_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      State Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      placeholder="select state name"
                      onChange={(selectedOptions) =>
                        stateHandleChange(selectedOptions)
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      County Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      placeholder="select state name"
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
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      Data Source Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="data_source_name"
                      value={formData?.data_source_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Data Source Name"
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

export default DataSourceCreation;
