import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import DataTable from "../../../inc/components/DataTable";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
// import html2canvas from "html2canvas";
import { write, writeFile, utils } from "xlsx";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const TaskCreation = () => {
  var [table_col, set_table_col] = useState([
    "Sno",
    "Date",
    "Task Name",
    "Task Guidance",
    "Status",
    "Action",
  ]);
  var [table_load, set_table_load] = useState(true);
  var [table_content_div, set_table_content_div] = useState([]);
  var [work_flow_group_list, set_work_flow_group_list] = useState([]);
  var [work_flow_list, set_work_flow_list] = useState([]);
  var [assign_type_list, set_assign_type_list] = useState([]);
  var [formData, setFormData] = useState({
    task_id: "",
    work_flow_group_id: "",
    work_flow_id: "",
    task_name: "",
    when_1: "",
    specific_task: "",
    assign_type_id: "",
    assign_task_group: "",
    assign_user_id: "",
    due_date: "",
    vendor_management: "",
    task_guidance: "",
    status: "",
  });
  const id = useParams();
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
        Task Name: ${item?.task_name || ""}
        Task Guidance: ${item?.task_guidance || ""}
        Status: ${item?.status || ""}
    `;
    copyToClipboard(textToCopy);
    setSelectedItem(item);
  };
  useEffect(() => {
    set_table_load(false);
    const fetch_data = async () => {
      var response1 = await DataRepository.task_creation_index({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var table_content_div1 = [];
          (response1?.task_creation_index || []).forEach((element, index) => {
            table_content_div1.push(
              <tr key={index}>
                <td onClick={() => handleCopy(element)}>{index + 1}</td>
                <td>{element?.entry_date || ""}</td>
                <td>{element?.task_name || ""}</td>
                <td>{element?.task_guidance || ""}</td>
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
                    onClick={() => openInputFormModal(element?.task_id || "")}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => deleteDataRow(element?.task_id || "")}
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
      task_id: id,
      work_flow_group_id: "",
      work_flow_id: "",
      task_name: "",
      when_1: "",
      specific_task: "",
      assign_type_id: "",
      assign_task_group: "",
      assign_user_id: "",
      due_date: "",
      vendor_management: "",
      task_guidance: "",
      status: "active",
    });
    if (id === "") {
      $("#inputFormModal #taskModalLabel").html("Add Task Creation");
      $("#inputFormModal #ip_submit_btn").html("Add Task Creation");
      var response1 = await DataRepository.task_creation_create({});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_work_flow_group_list(response1?.work_flow_group_creation || []);
          set_work_flow_list(response1?.work_flow_creation || []);
          set_assign_type_list(response1?.assign_type_creation || []);
        }
      }
    } else {
      $("#inputFormModal #taskModalLabel").html("Edit Task Creation");
      $("#inputFormModal #ip_submit_btn").html("Update Task Creation");
      var response1 = await DataRepository.task_creation_edit({ task_id: id });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.task_creation_edit || [];
          if (edit_data.length > 0) {
            set_work_flow_group_list(response1?.work_flow_group_creation || []);
            set_work_flow_list(response1?.work_flow_creation || []);
            set_assign_type_list(response1?.assign_type_creation || []);
            setFormData({
              task_id: id,
              work_flow_group_id: edit_data[0]?.work_flow_group_id || "",
              work_flow_id: edit_data[0]?.work_flow_id || "",
              task_name: edit_data[0]?.task_name || "",
              when_1: edit_data[0]?.when_1 || "",
              specific_task: edit_data[0]?.specific_task || "",
              assign_type_id: edit_data[0]?.assign_type_id || "",
              assign_task_group: edit_data[0]?.assign_task_group || "",
              assign_user_id: edit_data[0]?.assign_user_id || "",
              due_date: edit_data[0]?.due_date || "",
              vendor_management: edit_data[0]?.vendor_management || "",
              task_guidance: edit_data[0]?.task_guidance || "",
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
    if (formData?.task_id === "") {
      response1 = await DataRepository.task_creation_insert(formData);
    } else {
      response1 = await DataRepository.task_creation_update(formData);
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
        title: "Remove Task Creation",
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
            var response1 = await DataRepository.task_creation_delete({
              task_id: id,
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
              <h2>Task Creation</h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              <button
                className="btn btn-info"
                onClick={() => window.location.reload()}
              >
                <i className="fa fa-refresh"></i>
              </button>
              <button className="btn btn-warning ms-1" onClick={downloadExcel}>
                <i className="fa fa-download"></i> Export
              </button>
              <button className="btn btn-danger ms-1" onClick={downloadPDF}>
                <i className="fa fa-file-pdf-o"></i> PDF
              </button>
              <button
                className="btn btn-primary text-white ms-1"
                type="button"
                data-bs-toggle="modal"
                data-bs-original-title="test"
                data-bs-target="#inputFormModal"
                onClick={() => openInputFormModal("")}
              >
                <i className="fa fa-plus text-white"></i> Add Task Creation
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
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taskModalLabel">
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
                name="task_id"
                value={formData?.task_id}
                onChange={handleChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Work Flow Group Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    {/* <select className="form-select" name="work_flow_group_id" value={formData?.work_flow_group_id} onChange={handleChange} required>
                                <option value="">Select Work Flow Group Name</option>
                                {work_flow_group_list.map((work_flow_group_list1, index) => {
                                    return (<option value={work_flow_group_list1?.work_flow_group_id}>{work_flow_group_list1?.work_flow_group_name}</option>);
                                })}
                            </select> */}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Work Flow Name <span className="text-danger">*</span>
                    </label>
                    {/* <select className="form-select" name="work_flow_id" value={formData?.work_flow_id} onChange={handleChange} required>
                                <option value="">Select Work Flow Name</option>
                                {work_flow_list.map((work_flow_list1, index) => {
                                    return (<option value={work_flow_list1?.work_flow_id}>{work_flow_list1?.work_flow_name}</option>);
                                })}
                            </select> */}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Task Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="task_name"
                      value={formData?.task_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Task Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      When <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="when_1"
                      value={formData?.when_1}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter When"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Specific Task Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="specific_task"
                      value={formData?.specific_task}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Specific Task Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Assign Type Name <span className="text-danger">*</span>
                    </label>
                    {/* <select className="form-select" name="assign_type_id" value={formData?.assign_type_id} onChange={handleChange} required>
                                <option value="">Select Assign Type Name</option>
                                {assign_type_list.map((assign_type_list1, index) => {
                                    return (<option value={assign_type_list1?.assign_type_id}>{assign_type_list1?.assign_type_name}</option>);
                                })}
                            </select> */}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Assign Task Group Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="assign_task_group"
                      value={formData?.assign_task_group}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Assign Task Group Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Assign User Id <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="assign_user_id"
                      value={formData?.assign_user_id}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Assign User Id"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Due Days <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="due_date"
                      value={formData?.due_date}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Due Days"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Vendor Management <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="vendor_management"
                      value={formData?.vendor_management}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter Vendor Management"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Task Guidance</label>
                    <textarea
                      className="form-control"
                      name="task_guidance"
                      value={formData?.task_guidance}
                      onChange={handleChange}
                      placeholder="Enter Task Guidance"
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

export default TaskCreation;
