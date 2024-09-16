import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Select from "react-select";
import CommonVariables from "../../../../layouts/CommonVariables";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { Tabs } from "antd";
import "react-multi-email/dist/style.css";
import { ReactMultiEmail } from "react-multi-email";
import { useNavigate } from "react-router-dom";
import DataRepository from "../../../../repositories/DataRepository";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import background from "./bg-img.png";
import sendEmail from "./send-mail.png";
import { FaPaperclip } from "react-icons/fa";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";

const OrderEmail = ({file_view1 }) => {
  const [loading, setLoading] = useState(false);
  const refreshTable = () => {
    setLoading(true);
    fetch_data();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  var [table_col, set_table_col] = useState([
    "Sno",
    "Entry Date",
    "To",
    "CC",
    "Subject",
    "View",
  ]);
  const [filePaths, setFilePaths] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  var [table_content_div, set_table_content_div] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressedSend, setIsPressedSend] = useState(false);
  const [isPressedEmail, setIsPressedEmail] = useState(false);

  const [emailAttached, setEmailAttached] = useState(false); // New state

  const fileInputRef = React.createRef();
  var { order_id } = useParams();

  const [formValues, setFormValues] = useState({
    orderId:order_id,
    // order_email_id:'',
    order_email_id: "",
    to_mail: [],
    cc_mail: [],
    email_template_id: "",
    subject: "",
    body:"",
    selectedFiles: [],
  });

   const navigate = useNavigate();
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
    fetch_data();
  }, [order_id, user_rights]);
  
  const fetch_data = async () => {
    var response1 = await DataRepository.order_email_index({order_id: order_id});
    if (response1?.order_email_index?.length > 0) {
      setEmailAttached(true); // Emails are attached
    } else {
      setEmailAttached(false); // No emails attached
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
     
        (response1?.order_email_index|| []).forEach(
          (element, index) => {
            var tb_row = [(<span onClick={() => {handleCopy(element);}}>{index + 1}</span>), element?.entry_date || "", ((element?.to_mail) ? JSON.parse(element.to_mail).join("<br/>") : ''), ((element?.cc_mail) ? JSON.parse(element.cc_mail).join("<br/>") : ""), (<div style={{minWidth:"200px"}}>{element?.subject || ""}</div>), (<button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-original-title="test"
                    data-bs-target="#inputFormModal"
                    onClick={() =>
                      openInputFormModal(element?.id || "")
                    }
                  >
                    <i className="fa fa-eye"></i>
                  </button>)];
            table_content_div1.push(tb_row);
          }
        );
        set_table_content_div(table_content_div1);
      }
    }
    const responseTemplate = await DataRepository.email_template_creation_index({});
    const templates1 = responseTemplate?.email_template_creation_index || [];
  
    setEmailTemplates(templates1);
   
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
    const textToCopy = `Entry Date: ${item.entry_date || ""}\nContact Name: ${
      item.contact_name || ""
    }\nAddress: ${item.address || ""}\nMobile Number: ${
      item.mobile_number || ""
    }\nEmail ID: ${item.email_id || ""}`;
    copyToClipboard(textToCopy);
  };
  const handleFileIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Combine existing files with new files, initializing selectedFiles if undefined
    setFormValues((prevValues) => ({
      ...prevValues,
      selectedFiles: [...(prevValues.selectedFiles || []), ...files],
    }));
    // Clear the file input value to allow re-selection of the same file
    e.target.value = "";
  };
  
  useEffect(() => {
    // Ensure file_view1 is available and parse the saved_file data
    if (file_view1?.saved_file) {
      try {
        const savedFiles = JSON.parse(file_view1.saved_file);
        const paths = savedFiles.map(fileName =>
          `${CommonVariables.file_path}/mail_attach/${fileName}`
        );
        setFilePaths(paths);
      } catch (error) {
        console.error('Error parsing saved_file:', error);
      }
    }
  }, [file_view1]);

  const openInputFormModal = async (id) => {
    try {
      setFormValues({
        orderId:order_id,
        // order_email_id:'',
        order_email_id: "",
        to_mail: [],
        cc_mail: [],
        email_template_id: "",
        subject: "",
        body:"",
        selectedFiles: [],
      });
      if (id === "" ) {
        $("#inputFormModal #companyModalLabel").html("Add Company Creation");
        $("#inputFormModal #ip_submit_btn").html("Add Company Creation");
      } else {
        $("#inputFormModal #companyModalLabel").html("Edit Company Creation");
        $("#inputFormModal #ip_submit_btn").html("Update Company Creation");

        // Fetch existing data for editing
        const response1 = await DataRepository.order_email_view({ order_email_id: id });
        
        if (response1?.status === "SUCCESS") {
          const edit_data = response1.order_email_view || {};
          const {
            // created_at,
            created_ipaddress,
            created_user_id,
            deleted_ipaddress,
            deleted_user_id,
            updated_ipaddress,
            updated_user_id,
            cc_mail,
            to_mail,
            saved_file, // Assuming saved_file needs to be used
            ...data
          } = edit_data;

          const parsedToMail = JSON.parse(to_mail || "[]");
          const parsedCcMail = JSON.parse(cc_mail || "[]");
          const parsedSavedFiles = JSON.parse(saved_file || "[]");
          const emailFiles=parsedSavedFiles.map((file)=>({name:file}));
          // Generate file paths
          const filePaths = parsedSavedFiles.map(fileName =>
            `${CommonVariables.file_path}/mail_attach/${fileName}`
          );
          // Update form values
          setFormValues({
            ...data,
            to_mail: parsedToMail,
            cc_mail: parsedCcMail,
            selectedFiles: emailFiles // Assuming you need to update selectedFiles
          });
        } else {
          console.error("Failed to fetch order email view data");
        }
      }
      
      // Check status
      $("#inputFormModal #ip_status_active").prop("checked", true);
    } catch (error) {
      console.error("Error fetching email data:", error);
    }
  };

  const handleTemplateChange = (selectedOption) => {
    if (selectedOption === null) {
      // Handle the case when no option is selected (i.e., when it's cleared)
      setFormValues((prevValues) => ({
        ...prevValues,
        email_template_id: "", // or null depending on your requirements
        subject: "",
        body: "",
      }));
      return; // Exit the function to avoid further processing
    }

    const selectedTemplateId = selectedOption.value;
    const selectedTemplate = emailTemplates.find(
      (template) => template.email_template_id === parseInt(selectedTemplateId)
    );
    if (selectedTemplate !== null) {
      setFormValues((prevValues) => ({
        ...prevValues,
        email_template_id: selectedTemplateId,
        subject: selectedTemplate.email_subject,
        body: selectedTemplate.email_content,
      }));
    }
  };

  const emailTemplateMap = Array.isArray(emailTemplates)
    ? emailTemplates.reduce((acc, template) => {
        acc[template.email_template_id] = template.email_template_name;
        return acc;
      }, {})
    : {};

  const emailTemplateOptions = Object.entries(emailTemplateMap).map(
    ([id, name]) => ({
      value: id,
      label: name,
    })
  );
  
  const initialFormValues = {
    to_mail: [],
    cc_mail: [],
    email_template_id: '',
    subject: '',
    body: '',
    selectedFiles: [],
    // Add other fields as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formValues.to_mail?.length) {
      alert("Please enter at least one recipient email.");
      return;
    }
    if (!formValues.subject.trim()) {
      alert("Please enter a subject.");
      return;
    }
    if (!formValues.body.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append('to_mail', JSON.stringify(formValues.to_mail || []));
      formData.append('cc_mail', JSON.stringify(formValues.cc_mail || []));
      formData.append('email_template_id', formValues.email_template_id || '');
      formData.append('subject', formValues.subject || '');
      formData.append('body', formValues.body || '');
      formData.append('order_id', order_id || '');
      
      // Append files (if any)
      if (formValues.selectedFiles && formValues.selectedFiles.length > 0) {
        formValues.selectedFiles.forEach((file) => {
          formData.append('selectedFiles[]', file); // Append each file to 'selectedFiles'
        });
      }

      // Submit the form data
      const response = await DataRepository.order_email_insert(formData);
      
      if (response && response.status === "SUCCESS") {
        // Reset form values to initial state
        setFormValues(initialFormValues);
        
        // Optionally, you can also reload the page or navigate elsewhere
        refreshTable();
        $("#inputFormModal .btn-close").trigger({ type: "click" });
        // navigate("/email-creation");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const onChange = (newActiveKey) => {
    navigate(`/order-entry/${newActiveKey}/email-creation`);
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
      navigate(`/order-entry/${newActiveKey}/email-creation`);
      setItems(newPanes);
      // setActiveKey(newActiveKey);
    }
  };
  const onEdit = (targetKey, action) => {
    remove(targetKey);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row mb-5">
            <div className="col-lg-6 main-header">
              {/* <h2>Order Entry</h2> */}
              <h2>
                Order <span style={{ color: "black" }}>Email</span>
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
            </div>
          </div>
          <div className="row" id='tabpanel'>
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
        </div>
        <div
          className="page-header"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            height: "200px",
            borderRadius: "40px",
            // marginTop: "120px",
          }}
        >
          <div className="row">
            <div className="col-lg-6 main-header">
              <div></div>
              {/* <h2 style={{ marginLeft: "50px", width: "110%" }}>
                No Email
                <span style={{ color: "black" }}>
                  has been attached{" "}
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={sendEmail}
                    alt="Send Email"
                  />{" "}
                </span>
              </h2> */}
              <h2 style={{ marginLeft: "50px", width: "110%" }}>
                {emailAttached ? "Email" : "No Email"}
                <span style={{ color: "black" }}>
                  {emailAttached ? " has been attached  " : " has been attached  "}
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={sendEmail}
                    alt="Send Email"
                  />
                </span>
              </h2>

              {(user_rights?.add_rights === '1') && (<div
                className="col-lg-6"
                style={{
                  textAlign: "left",
                  marginTop: "20px",
                  marginLeft: "40px",
                }}
              >
                <button
                  className="btn btn-primary text-white ms-1"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-original-title="test"
                  data-bs-target="#inputFormModal"
                  onClick={() => openInputFormModal("")}
                  style={{
                    transform: isPressedEmail ? "scale(0.95)" : "scale(1)",
                    transition: "transform 0.1s ease-in-out",
                  }}
                  onMouseDown={() => setIsPressedEmail(true)}
                  onMouseUp={() => setIsPressedEmail(false)}
                  onMouseLeave={() => setIsPressedEmail(false)}
                >
                  <i className="fa fa-plus text-white" style={{}}></i>
                  <span
                    style={{
                      borderRight: "1px solid white",
                      height: "20px", // Adjust this value as needed
                      marginRight: "10px", // Space between the line and the text
                      marginLeft: "10px", // Space between the line and the icon
                    }}
                  ></span>
                  Add New Email
                </button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
          <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4]} exportBtns={{excel:true,pdf:true}} exportTitle="Order-Email" />
            )}
          </div>
        </div>
      <div
        className="modal fade"
        id="inputFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="companyModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "820px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="emailModalLabel"
                style={{ fontWeight: "800" }}
              >
                <span style={{ color: "#3949ab" }}>Send </span> Message
              </h5>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  {/* To Emails Input */}
             {formValues?.id &&   <div className="col-md-12 mb-3">
                <label>User Name: {formValues?.created_user_name}</label><br/>
                <label>Created Date:  {formValues?.created_at}</label>
              </div>}
                  <div className="col-md-12 mb-3">
                    <div
                      className="email-input-container"
                      style={{ position: "relative" }}
                    >
                      <ReactMultiEmail
                      
                        className="form-control"
                        emails={formValues.to_mail}
                        onChange={(newEmails) =>
                          setFormValues((prevValues) => ({
                            ...prevValues,
                            to_mail: newEmails,
                          }))
                        }
                        getLabel={(email, index, removeEmail) => (
                          <div
                            data-tag
                            key={index}
                            style={{ backgroundColor: "#cccded" }}
                          >
                            {email}
                            <span
                              data-tag-handle
                              onClick={() => removeEmail(index)}
                            >
                              ×
                            </span>
                          </div>

                        )}
                        style={{ paddingLeft: "35px", height: "40px", pointerEvents:formValues?.id ? "none" : '' }}
                      />
                      <span
                        className="email-input-label"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "10px",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      >
                        To:
                      </span>
                    </div>
                  </div>

                  {/* CC Emails Input */}
                  <div className="col-md-12 mb-3">
                    <div
                      className="email-input-container"
                      style={{ position: "relative" }}
                    >
                      <ReactMultiEmail
                        className="form-control"
                        onDisabled={formValues?.id ? true :false}
                        emails={formValues.cc_mail}
                        onChange={(newEmails) =>
                          setFormValues((prevValues) => ({
                            ...prevValues,
                            cc_mail: newEmails,
                          }))
                        }
                        getLabel={(email, index, removeEmail) => (
                          <div
                            data-tag
                            key={index}
                            style={{ backgroundColor: "#cccded" }}
                          >
                            {email}
                            <span
                              data-tag-handle
                              onClick={() => removeEmail(index)}
                            >
                              ×
                            </span>
                          </div>
                        )}
                        style={{ paddingLeft: "35px", height: "40px",pointerEvents:formValues?.id ? "none" : '' }}
                      />
                      <span
                        className="email-input-label"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "10px",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      >
                        CC:
                      </span>
                    </div>
                  </div>

                  {/* Select Email Template */}
                  <div className="col-md-12 mb-3">
                    <Select
                      style={{ height: "40px" }}
                      isClearable={true}
                      value={emailTemplateOptions.find(
                        (item) => item?.value?.toString() === formValues?.email_template_id?.toString()
                      ) || null}  // Add a fallback to null
                      options={emailTemplateOptions}
                      placeholder="Select Email Template"
                      id="user_type_id"
                      className="form-control p-0 col-sm-12"
                      name="user_type_id"
                      onChange={handleTemplateChange}
                      isDisabled={formValues?.id ? true : false} // Disable based on formValues.id
                    />
                  </div>


                  {/* Subject Input */}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      value={formValues.subject}
                      onChange={(e) =>
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          subject: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Enter subject"
                      disabled={formValues?.id ? true : false}
                      required
                    />
                  </div>

                  {/* Message Input */}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      value={formValues.body}
                      style={{ height: "140px" }}
                      onChange={(e) =>
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          body: e.target.value,
                        }))
                      }
                      rows="4"
                      placeholder="Enter your message"
                      disabled={formValues?.id ? true : false}
                      // isDisabled={formValues?.id ? "true" : 'false'}
                    ></textarea>
                  </div>
              
                
                  <div className="col-md-12 mb-3">
                    <div className="d-flex flex-wrap mt-3">
                      {/* Display files from saved_file */}
                      {(formValues?.selectedFiles || []).length > 0 && (
                        <div className="col-md-12 mt-3">
                          {(formValues?.selectedFiles || []).map((fileName, index) => (
                            <a
                              key={index}
                              href={`${CommonVariables.file_path}/mail_attach/${fileName.name}`} 
                              download={fileName.name} // This triggers the download
                              className="btn btn-outline-secondary m-1"
                              style={{ height: "40px" }}
                            >
                              {fileName.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

             {!formValues?.id &&  <div className="modal-footer">
                <div className="d-flex justify-content-between w-100">
                  <button
                    style={{
                      height: "40px",
                      transform: isPressed ? "scale(0.95)" : "scale(1)",
                      transition: "transform 0.1s ease-in-out",
                    }}
                    className="btn btn-danger"
                    type="button"
                    data-bs-dismiss="modal"
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                    onMouseLeave={() => setIsPressed(false)} // To reset the state if the mouse leaves the button area
                  >
                    Cancel
                  </button>
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={handleFileIconClick}
                      style={{
                        marginLeft: "380px",
                        height: "40px",
                        width: "200px",
                      }}
                    >
                      <FaPaperclip style={{ marginRight: "8px" }} />
                      {(formValues?.selectedFiles?.length || 0) > 0
                        ? `${formValues.selectedFiles.length} file(s) selected`
                        : "No files selected"}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>

                  <button
                    style={{
                      height: "40px",
                      transform: isPressedSend ? "scale(0.95)" : "scale(1)",
                      transition: "transform 0.1s ease-in-out",
                    }}
                    // className="btn btn-danger"
                    // type="button"
                    // data-bs-dismiss="modal"
                    onMouseDown={() => setIsPressedSend(true)}
                    onMouseUp={() => setIsPressedSend(false)}
                    onMouseLeave={() => setIsPressedSend(false)} // To reset the state if the mouse leaves the button area
                    className="btn btn-success"
                    id="ip_send_btn"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderEmail;
