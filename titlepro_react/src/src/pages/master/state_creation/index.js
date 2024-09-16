import { useEffect, useState } from "react";
import $ from "jquery";
import DataTable from "../../../inc/components/DataTable";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import Select from "react-select";
import Select2 from "react-select2-wrapper";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
// import Select from "react-select";
import { Drawer } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { write, writeFile, utils } from "xlsx";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
const StateCreation = () => {
  var [table_col, set_table_col] = useState([
    "Sno",
    "State Name",
    "County Name",
    "Description",
    "Status",
    "Action",
  ]);
  var [table_load, set_table_load] = useState(true);
  var [table_content_div, set_table_content_div] = useState([]);
  var [formData, setFormData] = useState({
    state_id: "",
    state_name: "",
    county_id: "",
    description: "",
    status: "",
  });
  const [selectedState, setSelectedState] = useState("");
  var [stateName, setStateName] = useState([]);
  var [state_list, set_state_list] = useState([]);
  // console.log(state_list,'Test');
  const [selectedItem, setSelectedItem] = useState(null);
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 32,
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
        State Name: ${item?.state_name || ""}
        County Name: ${item?.county_name || ""}
        Description: ${item?.description || ""}
        Status: ${item?.status || ""}
    `;
    copyToClipboard(textToCopy);
    setSelectedItem(item);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        set_table_load(false);

        if (
          user_rights?.edit_rights === "1" ||
          user_rights?.delete_rights === "1"
        ) {
          set_table_col([
            "Sno",
            "State Name",
            "County Name",
            "Description",
            "Status",
            "Action",
          ]);
        } else {
          set_table_col([
            "Sno",
            "State Name",
            "County Name",
            "Description",
            "Status",
          ]);
        }

        // Fetch state dependency data
        const stateDependency =
          await DataRepository.county_creation_state_dependency({});

        // Fetch state creation index data
        const response1 = await DataRepository.state_creation_index({});
        const allData = response1?.state_creation_index || [];

        if (stateDependency?.status === "SUCCESS") {
          // Map state options
          const stateOptions = (stateDependency?.state_creation || []).map(
            (element) => ({
              value: element.state_name,
              label: element.state_name,
            })
          );
          setStateName([...stateOptions, { value: "", label: "Show All" }]);

          // Filter data based on selected state
          const filteredData = selectedState
            ? allData.filter((element) => element.state_name === selectedState)
            : allData;

          // Create table rows
          const tableContent = filteredData.map((element, index) => (
            <tr key={index}>
              <td onClick={() => handleCopy(element)}>{index + 1}</td>
              <td>{element?.state_name || ""}</td>
              <td>{element?.county_name || ""}</td>
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
                        openInputFormModal(element?.state_id || "")
                      }
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  )}
                  {user_rights?.delete_rights === "1" && (
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => deleteDataRow(element?.state_id || "")}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  )}
                </td>
              )}
            </tr>
          ));

          set_table_content_div(tableContent);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        set_table_load(true);
      }
    };

    fetchData();
  }, [selectedState]);
  // useEffect(() => {
  //   set_table_load(false);
  //   const fetch_data = async () => {
  //     var response1 = await DataRepository.state_creation_index({});
  //     if (response1) {
  //       if (response1?.status === "SUCCESS") {
  //         var table_content_div1 = [];
  //         (response1?.state_creation_index || []).forEach((element, index) => {
  //           table_content_div1.push(
  //             <tr onClick={() => handleCopy(element)} key={index}>
  //               <td>{index + 1}</td>
  //               <td>{element?.state_name || ""}</td>
  //               <td>{element?.county_name || ""}</td>
  //               <td>{element?.description || ""}</td>
  //               <td>
  //                 <span
  //                   className={`badge badge-${
  //                     element?.status === "active" ? "success" : "danger"
  //                   }`}
  //                 >
  //                   {element?.status || ""}
  //                 </span>
  //               </td>
  //               <td className="text-center">
  //                 <button
  //                   className="btn btn-primary m-1"
  //                   data-bs-toggle="modal"
  //                   data-bs-original-title="test"
  //                   data-bs-target="#inputFormModal"
  //                   onClick={() => openInputFormModal(element?.state_id || "")}
  //                 >
  //                   <i className="fa fa-edit"></i>
  //                 </button>
  //                 <button
  //                   className="btn btn-danger m-1"
  //                   onClick={() => deleteDataRow(element?.state_id || "")}
  //                 >
  //                   <i className="fa fa-trash"></i>
  //                 </button>
  //               </td>
  //             </tr>
  //           );
  //         });
  //         set_table_content_div(table_content_div1);
  //         set_table_load(true);
  //       }
  //     }
  //   };
  //   fetch_data();
  // }, []);
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const openInputFormModal = async (id) => {
    $("#inputFormModal #ip_status_active").prop("checked", true);
    setFormData({
      state_id: id,
      state_name: "",
      county_id: "",
      description: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #stateModalLabel").html("Add State Creation");
      $("#inputFormModal #ip_submit_btn").html("Add State Creation");
      var response1 = await DataRepository.state_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_state_list(response1?.county_creation || []);
        }
      }
    } else {
      $("#inputFormModal #stateModalLabel").html("Edit State Creation");
      $("#inputFormModal #ip_submit_btn").html("Update State Creation");
      var response1 = await DataRepository.state_creation_edit({
        state_id: id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.state_creation_edit || [];
          if (edit_data.length > 0) {
            set_state_list(response1?.county_creation || []);
            setFormData({
              state_id: id,
              state_name: edit_data[0]?.state_name || "",
              county_id: edit_data[0]?.county_id || "",
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
    if (formData?.state_id === "") {
      response1 = await DataRepository.state_creation_insert(formData);
    } else {
      response1 = await DataRepository.state_creation_update(formData);
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
        title: "Remove State Creation",
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
            var response1 = await DataRepository.state_creation_delete({
              state_id: id,
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
  console.log(state_list, "Test");
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const downloadExcel = () => {
    // Get the table element
    const table = document.getElementById("output_table");

    if (!table) {
      console.error("Table element with ID 'output_table' not found.");
      return;
    }

    // // Log the values to verify correctness
    // console.log("Selected State ID:", selectedStateId);
    // console.log("Selected County ID:", selectedCountyId);
    // console.log("State Name County Array:", stateNameCounty);
    // console.log("Selected County Array:", selectedCounty);

    // // Extract selected state and county values
    // // const selectedStateName = stateNameCounty.find(state => state.value === selectedStateId)?.label || 'N/A';
    // // const selectedCountyName = selectedCounty.find(county => county.value === selectedCountyId)?.label || 'N/A';
    // const selectedStateName = stateNameCounty.find(state => state.value === Number(selectedStateId))?.label || 'N/A';
    // const selectedCountyName = selectedCounty.find(county => county.value === Number(selectedCountyId))?.label || 'N/A';

    // console.log("Extracted State Name:", selectedStateName);
    // console.log("Extracted County Name:", selectedCountyName);

    // Check if the IDs match any entry in the arrays
    // if (selectedStateName === 'N/A') {
    //     console.error("State ID does not match any state in the provided data.");
    // }
    // if (selectedCountyName === 'N/A') {
    //     console.error("County ID does not match any county in the provided data.");
    // }

    // Create a new workbook
    const wb = utils.book_new();

    // Get table rows and columns
    const rows = table.getElementsByTagName("tr");
    const data = [];

    // Add the title row
    data.push(["Company Creation"]);

    // Add state and county information
    // data.push(['Selected State:', selectedStateName]);
    // data.push(['Selected County:', selectedCountyName]);

    // // Add an empty row to separate title and selected values from table data
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
    a.download = "Company Creation.xlsx";
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

    // // Extract selected state and county values, ensuring type consistency
    // const selectedStateName = stateNameCounty.find(state => state.value === Number(selectedStateId))?.label || 'N/A';
    // const selectedCountyName = selectedCounty.find(county => county.value === Number(selectedCountyId))?.label || 'N/A';

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "pt", "a4");

    // Set initial Y position
    let yPos = 20;

    // Add title row
    pdf.setFontSize(14);
    pdf.text("Company Creation", 20, yPos);
    yPos += 20; // Move Y position down

    // Add selected state and county information
    pdf.setFontSize(12);
    // pdf.text(`Selected State: ${selectedStateName}`, 20, yPos);
    yPos += 20;
    // pdf.text(`Selected County: ${selectedCountyName}`, 20, yPos);
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
    pdf.save("Company Creation.pdf");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6 main-header">
              {/* <h2>State Creation</h2> */}
              <h2>
                State <span style={{ color: "black" }}>Creation</span>
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
                  <i className="fa fa-plus text-white"></i> Add State Creation
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
        <div className="row">
          <div className="col-sm-4">
            <label className="form-label">
              State Name <span className="text-danger">*</span>
            </label>
            <Select
              placeholder="select state name"
              id="user_type_id"
              className="form-control p-0 col-sm-12"
              name="user_type_id"
              onChange={(selectedOptions) =>
                setSelectedState(selectedOptions?.value)
              }
              options={stateName}
              value={stateName.filter((option) => {
                if (selectedState) {
                  return selectedState === option?.value;
                }
              })}
            />
            {/* <select
              style={{ width: "300px" }} // Corrected the style prop
              className="form-control"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                // fetch_data();
              }}
            >
              <option value="">Select State</option>
              {stateName.map((state, index) => (
                <option key={index} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select> */}
          </div>
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
        aria-labelledby="stateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="stateModalLabel">
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
                name="state_id"
                value={formData?.state_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      State Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="state_name"
                      value={formData?.state_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter State Name"
                      required
                    />
                  </div>
                  {/* <div className="col-md-12 mb-3">
                    <label className="form-label">
                      County Name <span className="text-danger">*</span>
                    </label>
                    <Select2
                      className="form-control"
                      value={"1"}
                      options={[
                        { id: "1", text: "Alerts" },
                        { id: "2", text: "Badges" },
                        { id: "3", text: "Buttons" },
                        { id: "4", text: "Cards" },
                        { id: "5", text: "Forms" },
                        { id: "6", text: "Modals" },
                      ]}
                      placeholder="Select County Name"
                      isRequired
                    />
                 
                  </div> */}
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

export default StateCreation;
