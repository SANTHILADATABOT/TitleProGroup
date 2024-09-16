import { useEffect, useState } from "react";
import $ from "jquery";
import DataTable from "../../../inc/components/DataTable";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";

const TaxCreation = () => {
  var [table_col, set_table_col] = useState([
    "Sno",
    "Date",
    "Tax Name",
    "Description",
    "Status",
    "Action",
  ]);
  var [table_load, set_table_load] = useState(true);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    tax_id: "",
    tax_name: "",
    description: "",
    status: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
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
        Tax Name: ${item?.tax_name || ""}
        Description: ${item?.description || ""}
        Status: ${item?.status || ""}
    `;
    copyToClipboard(textToCopy);
    setSelectedItem(item);
  };

  useEffect(() => {
    set_table_load(false);
    const fetch_data = async () => {
      var response1 = await DataRepository.tax_creation_index({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var table_content_div1 = [];
          (response1?.tax_creation_index || []).forEach((element, index) => {
            table_content_div1.push(
              <tr key={index}>
                <td onClick={() => handleCopy(element)}>{index + 1}</td>
                <td>{element?.entry_date || ""}</td>
                <td>{element?.tax_name || ""}</td>
                <td>{element?.description || ""}</td>
                <td>
                  <span
                    className={`badge badge-${
                      element?.status === "active" ? "success" : "danger"
                    }`}
                  >
                    {element?.status || ""}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-original-title="test"
                    data-bs-target="#inputFormModal"
                    onClick={() => openInputFormModal(element?.tax_id || "")}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => deleteDataRow(element?.tax_id || "")}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          });
          set_table_content_div(table_content_div1);
          set_table_load(true);
        }
      }
    };
    fetch_data();
  }, []);
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);
    setFormData({
      tax_id: id,
      tax_name: "",
      description: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #taxModalLabel").html("Add Tax Creation");
      $("#inputFormModal #ip_submit_btn").html("Add Tax Creation");
    } else {
      $("#inputFormModal #taxModalLabel").html("Edit Tax Creation");
      $("#inputFormModal #ip_submit_btn").html("Update Tax Creation");
      var response1 = await DataRepository.tax_creation_edit({ tax_id: id });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.tax_creation_edit || [];
          if (edit_data.length > 0) {
            setFormData({
              tax_id: id,
              tax_name: edit_data[0]?.tax_name || "",
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
    if (formData?.tax_id === "") {
      response1 = await DataRepository.tax_creation_insert(formData);
    } else {
      response1 = await DataRepository.tax_creation_update(formData);
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        window.location.reload();
      }
    }
  };
  const deleteDataRow = async (id) => {
    if (id !== "") {
      Swal.fire({
        title: "Remove Tax Creation",
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
            var response1 = await DataRepository.tax_creation_delete({
              tax_id: id,
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

  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6 main-header">
              {/* <h2>Tax Creation</h2> */}
              <h2>
                Tax <span style={{ color: "black" }}>Creation</span>
              </h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              <button
                className="btn btn-info"
                onClick={() => window.location.reload()}
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
                <i className="fa fa-plus text-white"></i> Add Tax Creation
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {table_load && (
              <DataTable column={table_col} row_data={table_content_div} />
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="taxModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taxModalLabel">
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
                name="tax_id"
                value={formData?.tax_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      Tax Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="tax_name"
                      value={formData?.tax_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Tax Name"
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
                      style={{ height: "100px" }}
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

export default TaxCreation;
