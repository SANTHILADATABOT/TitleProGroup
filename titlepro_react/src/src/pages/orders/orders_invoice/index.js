import { useCallback, useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { Drawer, Progress, Tabs } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import DataTable from "../../../inc/components/DataTable";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import background from "./bg-img.png";
import DataRepository from "../../../../repositories/DataRepository";
// import { FilterOutlined } from "@ant-design/icons";
// import { Drawer } from "antd";
import { write, writeFile, utils } from "xlsx";
import * as XLSX from "xlsx";
import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import PrintPage from "../orders_invoice/printPage";


const OrdersInvoice = () => {
  var [table_col, set_table_col] = useState(["Sno", "Entry Date", "Order Number", "Invoice Number", "Description", "Action",]);
  var [table_Billed, set_table_col_biled] = useState(["Sno", "payee", "Transtion Type", "Cost Per Unit", "No Of Units", "Total",]);
 var [table_Expenses, set_table_col_Expenses] = useState([
   "Sno",
   "payee",
   "Transtion Type",
   "Cost Per Unit",
   "No Of Units",
   "Total",
 ]);
  var [table_pay_to_venor, set_table_col_pay_to_venor] = useState([
    "Sno",
    "payee",
    "Transtion Type",
    "Cost Per Unit",
    "No Of Units",
    "Total",
  ]);
  var [table_load, set_table_load] = useState(true);
  const [totalValue,setTotalValue] = useState(true);
   var [table_content_div_billed, set_table_content_div__bille] = useState([]);
var [table_content_div_expenses, set_table_content_div_expenses] = useState([]);
var [table_content_div_pay_vendor, set_table_content_div_pay_vendor] = useState([]);
  var [table_content_div, set_table_content_div] = useState([]);
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
  const newTabIndex = useRef(0);
  var { order_id } = useParams();
  const navigate = useNavigate();
const [emailAttached, setEmailAttached] = useState(false);
const [billedDisplay, SeBilledDisplay] = useState(false);
const [expensesDisplay, SetExpensesDisplay] = useState(false);
const [payVendorDisplay, SerPayVendorDisplay] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const getTabs = async (cTab) => {
    const result = await OrdersRepository.orders_tab_index();
    if (result?.status === "SUCCESS") {
      setItems(result?.orders_tab_index[0]?.items.reverse());
      setActiveKey(cTab || order_id);
    }
  };
  useEffect(() => {
    getTabs("");
  }, []);

  //tabs

  const onChange = (newActiveKey) => {
    navigate(`/order-entry/${newActiveKey}/orders-invoice`);
    setActiveKey(newActiveKey);
  };

  const remove = async (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    const dataTab = { tab_id: targetKey };
    const result = await OrdersRepository.orders_tab_delete(dataTab);
    if (result?.status === "SUCCESS") {
      items.forEach((item, i) => {
        if (item.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const newPanes = items.filter((item) => item.key !== targetKey);
      if (newPanes.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newPanes[lastIndex].key;
        } else {
          newActiveKey = newPanes[0].key;
        }
      }
      getTabs(newActiveKey);
      navigate(`/order-entry/${newActiveKey}/orders-invoice`);
      setItems(newPanes);
      // setActiveKey(newActiveKey);
    }
  };
  const onEdit = (targetKey, action) => {
    remove(targetKey);
  };

  
  // const fetch_index_table_data = async () => {
  //   var response1 = await OrdersRepository.orders_invoice_index({order_id: order_id});
  //   if (response1) {
  //     if (response1?.status === "SUCCESS") {
  //       console.log(response1);
  //       var table_content_div1 = [];
  //       (response1?.orders_invoice_index || []).forEach(
  //         (element, index) => {
  //           table_content_div1.push(
  //             <tr key={index}>
  //               <td
  //               //   onClick={() => handleCopy(element)}
  //               >
  //                 {index + 1}
  //               </td>
  //               <td style={{ whiteSpace: "nowrap" }}>
  //                 {moment(element?.entry_date).format("DD-MM-YYYY") || ""}
  //               </td>
  //               <td style={{ whiteSpace: "nowrap" }}>
  //                 {element?.order_number || ""}
  //               </td>
  //               <td style={{ whiteSpace: "nowrap" }}>
  //                 {element?.invoice_number || ""}
  //               </td>
  //               <td style={{ whiteSpace: "nowrap" }}>
  //                 {element?.description || ""}
  //               </td>
  //               <td className="text-center" style={{ whiteSpace: "nowrap" }}>
  //                 {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
  //                 <button
  //                   className="btn btn-primary m-1"
  //                   // data-bs-toggle="modal"
  //                   // data-bs-original-title="test"
  //                   // data-bs-target="#inputFormModal"
  //                   onClick={() =>
  //                     navigate(`/order-entry/${order_id}/orders-invoice/form/${element?.orders_invoice_mainlist_id || ""}`)
  //                   }
  //                 >
  //                   <i className="fa fa-edit"></i>
  //                 </button>
  //                 <button
  //                   className="btn btn-danger m-1"
  //                   onClick={() => deleteDataRow(element?.order_id || "")}
  //                 >
  //                   <i className="fa fa-trash"></i>
  //                 </button>
  //                 {/* </div> */}
  //               </td>
  //             </tr>
  //           );
  //         }
  //       );
  //       set_table_content_div(table_content_div1);
  //       set_table_load(true);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   set_table_load(false);
  //   fetch_index_table_data();
  // }, [order_id]);



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
    const textToCopy = `Entry Date: ${item.entry_date || ""}\nContact Name: ${
      item.contact_name || ""
    }\nAddress: ${item.address || ""}\nMobile Number: ${
      item.mobile_number || ""
    }\nEmail ID: ${item.email_id || ""}`;
    copyToClipboard(textToCopy);
    setSelectedItem(item);
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
     pdf.text("Assign Type Creation", 20, yPos);
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
     pdf.save("Assign Type Creation.pdf");
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
     data.push(["Assign Type Creation"]);

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
     a.download = "Assign Type Creation.xlsx";
     a.click();

     // Revoke the URL after download
     window.URL.revokeObjectURL(url);
   };


// "Sno",
//   "payee",
//   "Transtion Type",
//   "Cost Per Unit",
//   "No Of Units",
//   "Total",
console.log("sevale",totalValue)
  useEffect(() => {
    set_table_load(false);

    const fetch_data = async () => {
      try {
        var response1 = await DataRepository.orders_invoice_index({
          order_id: order_id,
        });
        setTotalValue(response1);
console.log("response1 invoice", response1);
        if (response1?.order_invoice_billed?.length > 0) {
          SeBilledDisplay(true); // Emails are attached
        } else {
          SeBilledDisplay(false); // No emails attached
        }

        if (response1?.status === "SUCCESS") {
          var table_content_div1 = [];

          (response1?.order_invoice_billed || []).forEach((element, index) => {
            table_content_div1.push(
              <tr key={index}>
                <td
                  onClick={() => {
                    handleCopy(element);
                  }}
                >
                  {index + 1}
                </td>
                <td>${element?.payee_name || ""}</td>
                <td>${element?.transaction_type_name || ""}</td>
                <td>${element?.cost_per_units || ""}</td>
                <td>${element?.no_of_units || ""}</td>
                <td>${element?.total || ""}</td>
              </tr>
            );
          });

          set_table_content_div__bille(table_content_div1);
          set_table_load(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch_data();
  }, [order_id]);

    useEffect(() => {
      set_table_load(false);

      const fetch_data = async () => {
        try {
          var response1 = await DataRepository.orders_invoice_index({
            order_id: order_id,
          });

          if (response1?.order_invoice_expense?.length > 0) {
            SetExpensesDisplay(true); // Emails are attached
          } else {
            SetExpensesDisplay(false); // No emails attached
          }

          if (response1?.status === "SUCCESS") {
            var table_content_div1 = [];

            (response1?.order_invoice_expense || []).forEach(
              (element, index) => {
                table_content_div1.push(
                  <tr key={index}>
                    <td
                      onClick={() => {
                        handleCopy(element);
                      }}
                    >
                      {index + 1}
                    </td>
                    <td>${element?.payee || ""}</td>
                    <td>${element?.transtiontype || ""}</td>
                    <td>${element?.cost_per_unit || ""}</td>
                    <td>${element?.no_of_units || ""}</td>
                    <td>${element?.total || ""}</td>
                  </tr>
                );
              }
            );

            set_table_content_div_expenses(table_content_div1);
            set_table_load(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetch_data();
    }, [order_id]);



      useEffect(() => {
        set_table_load(false);

        const fetch_data = async () => {
          try {
            var response1 = await DataRepository.orders_invoice_index({
              order_id: order_id,
            });
console.log("response1 pay", response1.total_billed);


            if (response1.order_invoice_pay_vendor > 0) {
              SerPayVendorDisplay(true); // Emails are attached
            } else {
              SerPayVendorDisplay(false); // No emails attached
            }

            if (response1?.status === "SUCCESS") {
              var table_content_div1 = [];

              (response1.order_invoice_pay_vendor || []).forEach(
                (element, index) => {
                  table_content_div1.push(
                    <tr key={index}>
                      <td
                        onClick={() => {
                          handleCopy(element);
                        }}
                      >
                        {index + 1}
                      </td>
                      <td>${element?.payee_name || ""}</td>
                      <td>${element?.transaction_type_name || ""}</td>
                      <td>${element?.cost_per_units || ""}</td>
                      <td>${element?.no_of_units || ""}</td>
                      <td>${element?.total || ""}</td>
                    </tr>
                  );
                }
              );

              set_table_content_div_pay_vendor(table_content_div1);
              set_table_load(true);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetch_data();
      }, [order_id]);


      const handlePrint = () => {
        setTimeout(() => {
          const printWindow = window.open('', '', 'height=600,width=800');
          printWindow.document.write('<html><head><title>Print</title>');
          printWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">');
          printWindow.document.write('</head><body >');
          printWindow.document.write(document.getElementById('print-content').innerHTML);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
        }, 100); // Adjust the timeout duration if needed
      };
      
  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row mb-3" id="tabpanel">
            <div className="col-lg-12">
              <Tabs
                hideAdd
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-6 main-header">
              {/* <h2>Order Entry</h2> */}
              <h2>
                Order <span style={{ color: "black" }}>Invoice</span>
              </h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              {/* <button
                className="btn btn-info"
                onClick={() => window.location.reload()}
              >
                <i className="fa fa-refresh"></i>
              </button>
              <button className="btn btn-warning ms-1" onClick={downloadExcel}>
                <i className="fa fa-download"></i> Excel
              </button>
              <button className="btn btn-danger ms-1" onClick={downloadPDF}>
                <i className="fa fa-file-pdf-o"></i> PDF
              </button> */}
              {/* <button
                className="btn btn-primary text-white ms-1"
                type="button"
                // data-bs-toggle="modal"
                // data-bs-original-title="test"
                // data-bs-target="#inputFormModal"
                onClick={() =>
                  navigate(`/order-entry/${order_id}/orders-invoice/form`)
                }
              >
                <i className="fa fa-plus text-white"></i> Add Order Entry
              </button> */}
              {/* <button className="btn btn-success ms-1" onClick={showDrawer}>
                <FilterOutlined /> Filters
              </button> */}
               <button className="btn btn-primary" onClick={handlePrint}>
        Print
      </button>
      <div id="print-content" style={{ display: 'none' }}>
        <PrintPage />
      </div>
            </div>
          </div>
          <div className="col-lg-12 xl-100" style={{ marginTop: "43px" }}>
            <div className="row ecommerce-chart-card">
              <div className="col-xl-3 col-md-3 box-col-3">
                <div className="card o-hidden">
                  <div className="card-bodyy tag-card">
                    <div className="ecommerce-chart">
                      <div className="d-flex ecommerce-small-chart">
                        <div className="small-bar">
                          <div className="small-chart1 flot-chart-container">
                            <img
                              style={{
                                borderRadius: "10px",
                                width: "100px",
                                height: "100px",
                                marginLeft: "-10px",
                                paddingLeft: "",
                              }}
                              src={`${
                                window.location.protocol +
                                "//" +
                                window.location.host
                              }/assets/img/dashboard/order.png?v=${Math.random()}`}
                              alt={"Order"}
                            />
                          </div>
                        </div>
                        <div className="sale-chart">
                          <div className="flex-grow-1 m-l-10">
                            <h4
                              className="mb-0 f-w-700 m-l-10"
                              style={{ color: "black" ,fontWeight:"800"}}
                            >
                              Billed
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="main">
                      <div
                        class="counter"
                        data-number_value={"100"}
                        data-speed="1000"
                        style={{ color: "#5885f5" ,marginLeft:"90%" }}
                      >
                        ${totalValue?.total_billed}
                      </div>
                    </div>
                    <Progress
                      percent={50}
                      strokeColor="#5885f5"
                      showInfo={false}
                    />
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-3 box-col-3">
                <div className="card  o-hidden">
                  <div className="card-bodyy tag-card">
                    <div className="ecommerce-chart">
                      <div className="d-flex ecommerce-small-chart">
                        <div className="small-bar">
                          <div className="small-chart2 flot-chart-container">
                            <img
                              style={{
                                borderRadius: "10px",
                                width: "100px",
                                height: "100px",
                                marginLeft: "-10px",
                              }}
                              src={`${
                                window.location.protocol +
                                "//" +
                                window.location.host
                              }/assets/img/dashboard/workflow.png?v=${Math.random()}`}
                              alt={"workFlow"}
                            />
                          </div>
                        </div>
                        <div className="sale-chart">
                          <div className="flex-grow-1 m-l-10">
                            <h4
                              className="mb-0 f-w-700 m-l-10"
                              style={{ color: "black",fontWeight:"800" }}
                            >
                              Pay To Vendor
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="main">
                      <div
                        class="counter"
                        data-number_value={"100"}
                        data-speed="1000"
                        style={{ color: "#7e2ab3", marginLeft:"90%"}}
                      >
                        ${totalValue?.total_pay_vendor}
                      </div>
                    </div>
                    <Progress
                      percent={50}
                      strokeColor="#7e2ab3"
                      showInfo={false}
                    />
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-3 box-col-3">
                <div className="card  o-hidden">
                  <div className="card-bodyy tag-card">
                    <div className="ecommerce-chart">
                      <div className="d-flex ecommerce-small-chart">
                        <div className="small-bar">
                          <div className="small-chart3 flot-chart-container">
                            <img
                              style={{
                                borderRadius: "10px",
                                width: "100px",
                                height: "100px",
                                marginLeft: "-10px",
                              }}
                              src={`${
                                window.location.protocol +
                                "//" +
                                window.location.host
                              }/assets/img/dashboard/pending.png?v=${Math.random()}`}
                              alt={"Pending"}
                            />
                          </div>
                        </div>
                        <div className="sale-chart">
                          <div className="flex-grow-1 m-l-10">
                            <h4
                              className="mb-0 f-w-700 m-l-10"
                              style={{ color: "black" ,fontWeight:"800"}}
                            >
                              Expenses
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="main">
                      <div
                        class="counter"
                        data-number_value={"100"}
                        data-speed="1000"
                        style={{ color: "#6fa6bb",marginLeft:"90%" }}
                      >
                       
                       ${totalValue?.total_expense}
                      </div>
                    </div>
                    <Progress
                      percent={50}
                      strokeColor="#6fa6bb"
                      showInfo={false}
                    />
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-3 box-col-3">
                <div className="card  o-hidden">
                  <div className="card-bodyy tag-card">
                    <div className="ecommerce-chart">
                      <div className="d-flex ecommerce-small-chart">
                        <div className="small-bar">
                          <div className="small-chart4 flot-chart-container">
                            <img
                              style={{
                                borderRadius: "10px",
                                width: "100px",
                                height: "100px",
                                marginLeft: "-10px",
                              }}
                              src={`${
                                window.location.protocol +
                                "//" +
                                window.location.host
                              }/assets/img/dashboard/completed.png?v=${Math.random()}`}
                              alt={"complete"}
                            />
                          </div>
                        </div>
                        <div className="sale-chart">
                          <div className="flex-grow-1 m-l-10">
                            <h4
                              className="mb-0 f-w-700 m-l-10"
                              style={{ color: "black",fontWeight:"800" }}
                            >
                              Net Revenue
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="main">
                      <div
                        class="counter"
                        data-number_value={"100"}
                        data-speed="1000"
                        style={{ color: "#e38051",marginLeft:"90%" }}
                      >
                        ${totalValue?.total_billed}
                      </div>
                    </div>
                    <Progress
                      percent={50}
                      strokeColor="#e38051"
                      showInfo={false}
                    />
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
           <div
              className="col-md-12 p-2 mb-3"
              style={{ backgroundColor: "#c5caec" }}
            >
              <h5 className="mb-0">Billed</h5>
            </div>
              
            <div className="row">
            
              <div className="col-sm-12">
                {table_load && (
                  <DataTable
                    column={table_Billed}
                    row_data={table_content_div_billed}
                  />
                )}
              </div>
            </div>
          </div>

          
          <div>
           <div
              className="col-md-12 p-2 mb-3"
              style={{ backgroundColor: "#c5caec" }}
            >
              <h5 className="mb-0">Pay Vendor</h5>
            </div>

            <div className="row">
              
              <div className="col-sm-12">
                {table_load && (
                  <DataTable
                    column={table_pay_to_venor}
                    row_data={table_content_div_pay_vendor}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <div
              className="col-md-12 p-2 mb-3"
              style={{ backgroundColor: "#c5caec" }}
            >
              <h5 className="mb-0">Expenses</h5>
            </div>
            <div className="row">
             
              <div className="col-sm-12">
                {table_load && (
                  <DataTable
                    column={table_Expenses}
                    row_data={table_content_div_expenses}
                  />
                )}
              </div>
            </div>
          </div>

          
        </div>
      </div>
      
    </>
  );
};

export default OrdersInvoice;
