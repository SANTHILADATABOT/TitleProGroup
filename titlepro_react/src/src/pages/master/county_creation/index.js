import { useEffect, useState } from "react";
import $ from "jquery";
import DataTable from "../../../inc/components/DataTable";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { write, writeFile, utils } from "xlsx";
import * as XLSX from "xlsx";
import Select from "react-select";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
const CountyCreation = () => {
  var [table_col, set_table_col] = useState([
    "Sno",
    "County Name",
    "State Name",
    "Description",
    "Status",
    "Action",
  ]);
  var [table_load, set_table_load] = useState(true);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    county_id: "",
    county_name: "",
    // county_id: "",
    description: "",
    status: "",
  });
  var [county_list, set_county_list] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stateNameCounty, setStateNameCounty] = useState([]);
  var [fillterDate, setFillterDate] = useState([]);
  var [selectedStateId, setSelectedStateId] = useState([]);
  // var[selectedCountyId,setSectedCountyId]= useState([]);
  var [selectedCounty, setSelectedCounty] = useState([]);
  const [tableContent, setTableContent] = useState([]);
  const [tableLoad, setTableLoad] = useState(false);
  const [selectedCountyId, setSelectedCountyId] = useState("");
  const [data, setData] = useState(false);
var [user_rights, set_user_rights] = useState({});
useEffect(() => {
  const fetch_data = async () => {
    var response1 = await UserRightsRepository.get_user_rights({
      user_type_id: CommonVariables?.userDetails?.user_type_id,
      user_screen_id: 38,
    });
    if (response1) {
      if (response1?.status === "SUCCESS") {
        set_user_rights(response1?.get_user_rights);
      }
    }
  };
  fetch_data();
}, [CommonVariables]);
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
      const response = await DataRepository.county_creation_import_excel(
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
            County Name: ${item.county_name || ""}
            State Name: ${item.state_name || ""}
            Description: ${item.description || ""}
            Status: ${item.status || ""}
        `;
    copyToClipboard(textToCopy);
    setSelectedItem(item);
  };
  const fetch_data = async (selectedCountyId) => {
    set_table_load(false);
    
if (user_rights?.edit_rights === "1" || user_rights?.delete_rights === "1") {
  set_table_col([
    "Sno",
    "County Name",
    "State Name",
    "Description",
    "Status",
    "Action",
  ]);
} else {
  set_table_col([
    "Sno",
    "County Name",
    "State Name",
    "Description",
    "Status",
  ]);
}
    try {
      // Fetch state dependency data
      console.log("selectedStateId inside", selectedStateId);
      const state_id = selectedStateId;
      console.log("state_id", state_id);

      // Fetch state options
      const stateDependency =
        await DataRepository.county_creation_state_dependency();
      console.log("stateDependency", stateDependency);
      if (stateDependency?.status === "SUCCESS") {
        const stateOptions = (stateDependency?.state_creation || []).map(
          (element) => ({
            value: element.state_id,
            label: element.state_name,
          })
        );
        setStateNameCounty([...stateOptions, { value: "", label: "Show All" }]);
      }

      // Fetch county options
      const stateNames = await DataRepository.county_creation_county_dependency(
        {
          state_id: state_id,
        }
      );
      if (
        stateNames?.county_creation &&
        Array.isArray(stateNames.county_creation)
      ) {
        const countyOptions = stateNames.county_creation.map((element) => ({
          value: element.county_id,
          label: element.county_name,
        }));
        console.log("countyOptions", countyOptions);
        setSelectedCounty(countyOptions);
      } else {
        setSelectedCounty([]); // Ensure it's an array even if there's no data
      }

      // Fetch table data
      const response1 = selectedCountyId
        ? await DataRepository.county_creation_index({
            county_id: selectedCountyId,
          })
        : await DataRepository.county_creation_index({});
      if (response1?.status === "SUCCESS") {
        const table_content_div1 = (response1?.county_creation_index || []).map(
          (element, index) => (
            <tr key={element?.county_id || index}>
              <td onClick={() => handleCopy(element)}>{index + 1}</td>
              <td>{element?.county_name || ""}</td>
              <td>{element?.state_name || ""}</td>
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
              {(user_rights?.edit_rights === "1" ||
                user_rights?.delete_rights === "1") && (
                <td className="text-center">
                  {user_rights?.edit_rights === "1" && (
                    <button
                      className="btn btn-primary m-1"
                      data-bs-toggle="modal"
                      data-bs-target="#inputFormModal"
                      onClick={() =>
                        openInputFormModal(element?.county_id || "")
                      }
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  )}
                  {user_rights?.delete_rights === "1" && (
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => deleteDataRow(element?.county_id || "")}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  )}
                </td>
              )}
             
            </tr>
          )
        );
        set_table_content_div(table_content_div1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally set an error state to show user feedback
    } finally {
      set_table_load(true);
    }
  };

  useEffect(() => {
    fetch_data(selectedCountyId);
  }, [selectedCountyId, selectedStateId]);
  const downloadExcel = () => {
    // Get the table element
    const table = document.getElementById("output_table");

    if (!table) {
      console.error("Table element with ID 'output_table' not found.");
      return;
    }


    // Extract selected state and county values
    // const selectedStateName = stateNameCounty.find(state => state.value === selectedStateId)?.label || 'N/A';
    // const selectedCountyName = selectedCounty.find(county => county.value === selectedCountyId)?.label || 'N/A';
    const selectedStateName =
      stateNameCounty.find((state) => state.value === Number(selectedStateId))
        ?.label || "N/A";
    const selectedCountyName =
      selectedCounty.find((county) => county.value === Number(selectedCountyId))
        ?.label || "N/A";

    console.log("Extracted State Name:", selectedStateName);
    console.log("Extracted County Name:", selectedCountyName);

    // Check if the IDs match any entry in the arrays
    if (selectedStateName === "N/A") {
      console.error("State ID does not match any state in the provided data.");
    }
    if (selectedCountyName === "N/A") {
      console.error(
        "County ID does not match any county in the provided data."
      );
    }

    // Create a new workbook
    const wb = utils.book_new();

    // Get table rows and columns
    const rows = table.getElementsByTagName("tr");
    const data = [];

    // Add the title row
    data.push(["County Creation"]);

    // Add state and county information
    data.push(["Selected State:", selectedStateName]);
    data.push(["Selected County:", selectedCountyName]);

    // Add an empty row to separate title and selected values from table data
    data.push([]);

    // Extract table headers
    const headers = [];
    const headerCells = rows[0].getElementsByTagName("th");
    for (let i = 0; i < headerCells.length; i++) {
      headers.push(headerCells[i].innerText);
    }
    data.push(headers);

    // Extract table data
    for (let i = 1; i < rows.length; i++) {
      // Start from 1 to skip header row
      const cells = rows[i].getElementsByTagName("td");
      const rowData = [];
      for (let j = 0; j < cells.length; j++) {
        rowData.push(cells[j].innerText);
      }
      data.push(rowData);
    }

    // Convert the data to a worksheet
    const ws = utils.aoa_to_sheet(data);

    // Add the worksheet to the workbook
    utils.book_append_sheet(wb, ws, "Data");

    // Convert the workbook to a binary array
    const wbout = write(wb, { bookType: "xlsx", type: "array" });

    // Create a blob from the binary array
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and click it to download the file
    const a = document.createElement("a");
    a.href = url;
    a.download = "County Creation.xlsx";
    a.click();

    // Revoke the URL after download
    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    // Get the table element
    const input = document.getElementById("output_table"); // Adjust the ID to match your table's ID
    if (!input) {
      console.error("Table element with ID 'output_table' not found.");
      return;
    }

    // Extract selected state and county values, ensuring type consistency
    const selectedStateName =
      stateNameCounty.find((state) => state.value === Number(selectedStateId))
        ?.label || "N/A";
    const selectedCountyName =
      selectedCounty.find((county) => county.value === Number(selectedCountyId))
        ?.label || "N/A";

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "pt", "a4");

    // Set initial Y position
    let yPos = 20;

    // Add title row
    pdf.setFontSize(14);
    pdf.text("County Creation", 20, yPos);
    yPos += 20; // Move Y position down

    // Add selected state and county information
    pdf.setFontSize(12);
    pdf.text(`Selected State: ${selectedStateName}`, 20, yPos);
    yPos += 20;
    pdf.text(`Selected County: ${selectedCountyName}`, 20, yPos);
    yPos += 20;

    // Add a space between the information and the table
    yPos += 10;

    // Generate the canvas from the table and add it to the PDF
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    // Calculate the image dimensions to fit the table on the PDF
    const imgWidth = 560; // Width of the A4 page (595) minus some margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the table image to the PDF
    pdf.addImage(imgData, "PNG", 20, yPos, imgWidth, imgHeight);

    // Save the PDF
    pdf.save("County Creation.pdf");
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
      county_id: id,
      county_name: "",
      state_id: "",
      description: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #countyModalLabel").html("Add County Creation");
      $("#inputFormModal #ip_submit_btn").html("Add County Creation");
      var response1 = await DataRepository.county_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          const states = response1?.state_creation;
          const stateValues = states.map((item) => ({
            value: item?.state_id,
            label: item?.state_name,
          }));
          set_county_list(stateValues);
          // set_county_list(response1?.state_creation || []);
        }
      }
    } else {
      $("#inputFormModal #countyModalLabel").html("Edit County Creation");
      $("#inputFormModal #ip_submit_btn").html("Update County Creation");
      var response1 = await DataRepository.county_creation_edit({
        county_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.county_creation_edit || [];
          if (edit_data.length > 0) {
            const states = response1?.state_creation;
            const stateValues = states.map((item) => ({
              value: item?.state_id,
              label: item?.state_name,
            }));
            set_county_list(stateValues);
            // set_county_list(response1?.state_creation || []);
            setFormData({
              county_id: id,
              county_name: edit_data[0]?.county_name || "",
              state_id: edit_data[0]?.state_id || "",
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
    if (formData?.county_id === "") {
      response1 = await DataRepository.county_creation_insert(formData);
    } else {
      response1 = await DataRepository.county_creation_update(formData);
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
        title: "Remove County Creation",
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
            var response1 = await DataRepository.county_creation_delete({
              county_id: id,
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
              {/* <h2>County Creation</h2> */}
              <h2>
                County<span style={{ color: "black" }}>Creation</span>
              </h2>
            </div>
            <div
              className="col-lg-6"
              style={{ textAlign: "right", width: "100%", marginTop: "10px" }}
            >
              <button
                className="btn btn-info"
                onClick={() => window.location.reload()}
              >
                <i className="fa fa-refresh"></i>
              </button>
              {user_rights?.more_rights?.["Excel"] === "1" && (
                <button
                  className="btn btn-warning ms-1"
                  onClick={downloadExcel}
                >
                  <i className="fa fa-download"></i> Excel
                </button>
              )}
              <button className="btn btn-danger ms-1" onClick={downloadPDF}>
                <i className="fa fa-file-pdf-o"></i> PDF
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
                  <i className="fa fa-plus text-white"></i> Add County Creation
                </button>
              )}
              {/* <button className="btn btn-warning ms-1" onClick={downloadExcel}>
                <i className="fa fa-download"></i> Export
              </button>
              <button className="btn btn-danger ms-1" onClick={downloadPDF}>
                <i className="fa fa-file-pdf-o"></i> PDF
              </button> */}
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-sm-12">
            {table_load && (
              <DataTable column={table_col} row_data={table_content_div} />
            )}
          </div>
        </div> */}
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
          <div
            className="dropdown-container"
            style={{ display: "flex", gap: "15px", marginLeft: "-25px" }}
          >
            <div className="dropdown-item" style={{ width: "300px" }}>
              <label
                className="form-label"
                style={{ display: "block", width: "100%" }}
              >
                State Name <span className="text-danger">*</span>
              </label>
              <Select
                id="user_type_id"
                className="form-control p-0 col-sm-12"
                name="user_type_id"
                placeholder="select state name"
                onChange={(selectedOptions) =>
                  setSelectedStateId(selectedOptions?.value)
                }
                options={stateNameCounty}
                value={stateNameCounty.filter((option) => {
                  if (selectedStateId) {
                    return selectedStateId === option?.value;
                  }
                })}
                required
              />
            </div>

            <div className="dropdown-item" style={{ width: "300px" }}>
              <label
                className="form-label"
                style={{ display: "block", width: "100%" }}
              >
                County Name <span className="text-danger">*</span>
              </label>
              <Select
                id="user_type_id"
                className="form-control p-0 col-sm-12"
                name="user_type_id"
                placeholder="select county name"
                onChange={(selectedOptions) =>
                  setSelectedCountyId(selectedOptions?.value)
                }
                options={Array.isArray(selectedCounty) && selectedCounty}
                value={selectedCounty.filter((option) => {
                  if (selectedCountyId) {
                    return selectedCountyId === option?.value;
                  }
                })}
              />
              {/* <select
                className="form-control"
                style={{ width: "100%" }}
                onChange={(e) => setSelectedCountyId(e.target.value)} // Update the selected county ID
              >
                <option value="">Select County</option>
                {Array.isArray(selectedCounty) &&
                  selectedCounty.map((county, index) => (
                    <option key={index} value={county.value}>
                      {county.label}
                    </option>
                  ))}
              </select> */}
            </div>

            <div
              className="button-container"
              style={{
                display: "flex",
                alignItems: "right",
                gap: "10px",
                marginLeft: "300px",
                marginTop: "25px",
              }}
            ></div>
          </div>
          <div className="table-container mt-3">
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
        aria-labelledby="countyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="countyModalLabel">
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
                name="county_id"
                value={formData?.county_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      County Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="county_name"
                      value={formData?.county_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter State Name"
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
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
                      options={county_list}
                      value={county_list.filter((option) => {
                        if (formData?.state_id) {
                          return formData?.state_id === option?.value;
                        }
                      })}
                    />
                    {/* <select
                      className="form-select"
                      name="state_id"
                      value={formData?.state_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State Name</option>
                      {county_list.map((county_list1, index) => {
                        return (
                          <option value={county_list1?.state_id}>
                            {county_list1?.state_name}
                          </option>
                        );
                      })}
                    </select> */}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData?.description}
                      onChange={handleChange}
                      placeholder="Enter Description"
                      style={{ height: "100px", resize: "none" }}
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

export default CountyCreation;
