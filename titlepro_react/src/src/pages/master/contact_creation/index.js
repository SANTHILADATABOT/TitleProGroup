import { useEffect, useState } from "react";
import $ from "jquery";
import ContactsRepository from "../../../../repositories/ContactsRepository";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const ContactCreation = () => {
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
    "Contact Name",
    "Address",
    "Mobile Number",
    "Email Id",
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    contact_id: "",
    contact_name: "",
    contact_type_name: "",
    customer_fees_id: "",
    address: "",
    branch_code: "",
    unit: "",
    city_name: "",
    state_id: "",
    county_id: "",
    zipcode: "",
    mobile_number: "",
    alternate_mobile_number: "",
    email_id: "",
    ein: "",
    eo_exp_date: "",
    status: "",
  });
  var [county_list, set_county_list] = useState([]);
  var [state_list, set_state_list] = useState([]);
  var [customer_fees_list, set_customer_fees_list] = useState([]);
  
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
    const textToCopy = `Entry Date: ${item.entry_date || ""}\nContact Name: ${item.contact_name || ""
      }\nAddress: ${item.address || ""}\nMobile Number: ${item.mobile_number || ""
      }\nEmail ID: ${item.email_id || ""}`;
    copyToClipboard(textToCopy);
  };
  var [contact_type_list, set_contact_type_list] = useState([]);
  var [state_list, set_state_list] = useState([]);
  var [stateId, setStateId] = useState("");
  var [county_list, set_county_list] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 47,
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
            await ContactsRepository.customer_fees_creation_state_dependency({
              state_id: stateId,
            });

          if (response1 && response1.status === "SUCCESS") {
            const county_creation = (response1.county_creation || []).map(
              (element) => ({
                county_id: element.county_id,
                county_name: element.county_name,
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
      const response = await ContactsRepository.contact_creation_import_excel(
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
     if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
       set_table_col([
         "Sno",
         "Date",
         "Contact Name",
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
         "Contact Name",
         "Address",
         "Mobile Number",
         "Email Id",
         "Status",
       ]);
     }
    fetch_data();
  }, [user_rights]);
  const fetch_data = async () => {
    var response1 = await ContactsRepository.contact_creation_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.contact_creation_index || []).forEach(
          (element, index) => {
            var tb_row = [(<span onClick={() => {handleCopy(element);}}>{index + 1}</span>),element?.entry_date || "", element?.contact_name || "", element?.address || "", element?.mobile_number || "", element?.email_id || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>)];
            if((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")){
              tb_row.push(<span className="text-center">
                {(user_rights?.edit_rights === "1") && (
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-original-title="test"
                    data-bs-target="#inputFormModal"
                    onClick={() =>
                      openInputFormModal(element?.contact_id || "")
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                )}
                {(user_rights?.delete_rights === "1") && (
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      deleteDataRow(element?.contact_id || "")
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

  const handleChange = (e, date) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "radio"
          ? value
          : name === "dob" || name === "eo_exp_date"
            ? date
            : value,
    }));

    if (name === "state_id") {
      setStateId(value);
    }

    if (name === "eo_exp_date") {
      setStartDate(date);
    }
  };

  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);

    if (id === "") {
      setFormData({
        contact_id: id,
        contact_name: "",
        contact_type_name: "",
        customer_fees_id: "",
        address: "",
        branch_code: "",
        unit: "",
        city_name: "",
        state_id: "",
        county_id: "",
        zipcode: "",
        mobile_number: "",
        alternate_mobile_number: "",
        email_id: "",
        ein: "",
        eo_exp_date: "",
        status: "active",
      });
      $("#inputFormModal #contactModalLabel").html("Add Contact Creation");
      $("#inputFormModal #ip_submit_btn").html("Add Contact Creation");
      var response1 = await ContactsRepository.contact_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          const county = response1?.county_creation;
          const state = response1?.state_creation;
          const contactType = response1?.contact_type_creation;
          const customer_fees = response1?.customer_fees_creation;
          const contactTypeVal =
            contactType &&
            contactType.map((item) => ({
              value: item?.contact_type_id,
              label: item?.contact_type_name,
            }));
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
          const customer_feesValues =
            customer_fees &&
            customer_fees.map((item) => ({
              value: item?.customer_fees_id,
              label: item?.customer_fees,
            }));
          set_county_list(countyValues);
          set_state_list(stateValues);
          set_contact_type_list(contactTypeVal);
          set_customer_fees_list(customer_feesValues);
          // set_county_list(response1?.county_creation || []);
          // set_state_list(response1?.state_creation || []);
        }
      }
    } else {
      var response1 = await ContactsRepository.contact_creation_edit({
        contact_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.contact_creation_edit || [];
          if (edit_data.length > 0) {
            const county = response1?.county_creation;
            const state = response1?.state_creation;
            const contactType = response1?.contact_type_creation;
            const customer_fees = response1?.customer_fees_creation;
            const contactTypeVal =
              contactType &&
              contactType.map((item) => ({
                value: item?.contact_type_id,
                label: item?.contact_type_name,
              }));
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
            const customer_feesValues =
              customer_fees &&
              customer_fees.map((item) => ({
                value: item?.customer_fees_id,
                label: item?.customer_fees,
              }));
            set_county_list(countyValues);
            set_state_list(stateValues);
            set_contact_type_list(contactTypeVal);
            set_customer_fees_list(customer_feesValues);
            setFormData({
              contact_id: id,
              contact_name: edit_data[0]?.contact_name || "",
              contact_type_name: edit_data[0]?.contact_type_name || "",
              customer_fees_id: edit_data[0]?.customer_fees_id || "",
              address: edit_data[0]?.address || "",
              branch_code: edit_data[0]?.branch_code || "",
              unit: edit_data[0]?.unit || "",
              city_name: edit_data[0]?.city_name || "",
              state_id: edit_data[0]?.state_id || "",
              county_id: edit_data[0]?.county_id || "",
              zipcode: edit_data[0]?.zipcode || "",
              mobile_number: edit_data[0]?.mobile_number || "",
              alternate_mobile_number:
                edit_data[0]?.alternate_mobile_number || "",
              email_id: edit_data[0]?.email_id || "",
              ein: edit_data[0]?.ein || "",
              eo_exp_date: edit_data[0]?.eo_exp_date || "",
              status: edit_data[0]?.status,
            });
          }
          $("#inputFormModal #contactModalLabel").html("Edit Contact Creation");
          $("#inputFormModal #ip_submit_btn").html("Update Contact Creation");
        }
      }
    }
  };
  const submitDataRow = async (e) => {
    e.preventDefault();

    var response1 = null;
    if (formData?.contact_id === "") {
      response1 = await ContactsRepository.contact_creation_insert(formData);
    } else {
      response1 = await ContactsRepository.contact_creation_update(formData);
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
        title: "Remove Contact Creation",
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
            var response1 = await ContactsRepository.contact_creation_delete({
              contact_id: id,
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
              {/* <h2>Contact Creation</h2> */}
              <h2>
                Contact<span style={{ color: "black" }}>Creation</span>
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
                  <i className="fa fa-plus text-white"></i> Add Contact Creation
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
            <div className="dropdown-item" style={{ width: "300px" }}>
              <input
                type="file"
                id="file_input"
                name="file"
                className="form-control"
                accept=".xls,.xlsx"
              />
            </div>
            <div className="dropdown-item" style={{ width: "300px" }}>
              <button className="btn btn-secondary" onClick={importFileUpload}>
                Import
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4,5,6]} exportBtns={{excel:(user_rights?.more_rights?.["Excel"] === "1"),pdf:true}} exportTitle="Contact Creation" />
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg extra-w" role="document">
          <div className="modal-content" style={{ width: "100%" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="contactModalLabel">
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
                name="contact_id"
                value={formData?.contact_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                {/* First row with four fields */}
                <div className="form-row row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Contact Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="contact_name"
                      value={formData?.contact_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Contact Name"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Contact Type Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      placeholder="select contact type"
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact_type_name: selectedOptions?.value,
                        }))
                      }
                      options={contact_type_list}
                      value={contact_type_list.filter((option) => {
                        if (formData?.contact_type_name) {
                          return (
                            Number(formData?.contact_type_name) ===
                            option?.value
                          );
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Customer Fees Type Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Select
                      id="customer_fees_id"
                      className="form-control p-0 col-sm-12"
                      name="customer_fees_id"
                      placeholder="select Customer Fees"
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          customer_fees_id: selectedOptions?.value,
                        }))
                      }
                      options={customer_fees_list}
                      value={customer_fees_list.filter((option) => {
                        if (formData?.customer_fees_id) {
                          return (
                            Number(formData?.customer_fees_id) === option?.value
                          );
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
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Unit Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="unit"
                      value={formData?.unit}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Unit Name"
                      required
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
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      State Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      placeholder="select state name"
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
                </div>

                {/* Second row with three fields */}
                <div className="form-row row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      County Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      placeholder="select county name"
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
                      Contact Number <span className="text-danger">*</span>
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
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Alternate Contact Number{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="alternate_mobile_number"
                      value={formData?.alternate_mobile_number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Alternate Mobile Number"
                      required
                    />
                  </div>
                </div>

                {/* Third row with three fields */}
                <div className="form-row row">
                  <div className="col-md-3 mb-3">
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
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      Ein <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="ein"
                      value={formData?.ein}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Ein"
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">
                      E&O Exp Date <span className="text-danger">*</span>
                    </label>
                    <br />
                    <DatePicker
                      closeOnScroll={(e) => e.target === document}
                      selected={startDate}
                      name="eo_exp_date"
                      value={formData?.eo_exp_date}
                      onChange={(date) =>
                        setFormData((prev) => ({ ...prev, eo_exp_date: date }))
                      }
                      className="form-control"
                      placeholderText="Enter  E&O Exp Date"
                      dateFormat="yyyy-MM-dd"
                      calendarClassName="custom-calendar"
                      required
                    />
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
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row row"></div>

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

export default ContactCreation;
