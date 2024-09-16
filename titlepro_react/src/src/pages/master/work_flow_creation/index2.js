import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import DataTable from "../../../inc/components/DataTable";
import DataRepository from "../../../../repositories/DataRepository";
import Swal from "sweetalert2";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import Select from "react-select";
const WorkFlowCreation = () => {
  var [tableCol, setTableCol] = useState([
    "Sno",
    "Task Name",
    "Specific Task",
    "Status",
    "Action",
  ]);
  var [tableLoad, setTableLoad] = useState(true);
  var [tableContentDiv, setTableContentDiv] = useState([]);
  var [work_flow_group_list, set_work_flow_group_list] = useState([]);
  var [work_flow_list, set_work_flow_list] = useState([]);
  var [task_list, set_task_list] = useState([]);
  var [assign_type_list, set_assign_type_list] = useState([]);
  var [place_after_list, set_place_after_list] = useState([]);
  var [when_1_list, set_when_1_list] = useState([]);
  var [formWorkFlowData, setFormWorkFlowData] = useState({
    work_flow_id: "",
    work_flow_group_id: "",
    work_flow_name: "",
    place_after: "",
    description: "",
    status: "",
  });
  var [formTaskData, setFormTaskData] = useState({
    task_id: "",
    work_flow_group_id: "",
    work_flow_id: "",
    task_name: "",
    when_1: "",
    specific_task: "",
    assign_type_id: "",
    assign_task_group: "",
    assign_user_id: "",
    status: "",
  });
  const { work_flow_group_id } = useParams();
  var [assignUserOptions, setAssignUserOptions] = useState([]);
  var [assignTypeId, setAssignTypeId] = useState("");
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
    const textToCopy = `Entry Date: ${item.entry_date || ""}\nTask Name: ${
      item.task_name || ""
    }\nWhen: ${item.when_1 || ""}\nSpecific Task: ${
      item.specific_task || ""
    }\nStatus: ${item.status || ""}`;
    copyToClipboard(textToCopy);
    setSelectedItem(item);
  };
  useEffect(() => {
    if (assignTypeId) {
      const fetch_data = async () => {
        try {
          const response1 =
            await DataRepository.assign_type_creation_assign_type_dependency({
              assign_type_id: assignTypeId,
            });

          if (response1 && response1.status === "SUCCESS") {
            const userOptions = (response1.user_creation || []).map(
              (element) => ({
                value: element.user_id,
                label: element.user_name,
              })
            );
            setAssignUserOptions(userOptions);
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetch_data();
    }
  }, [assignTypeId]);

  useEffect(() => {
    const fetchData = async () => {
      setTableLoad(false);
      var response1 = await DataRepository.work_flow_creation_index({
        work_flow_group_id: work_flow_group_id,
      });
      if (response1 && response1.status === "SUCCESS") {
        var workFlowContentDiv1 = [];
        (response1?.work_flow_creation_index || []).forEach((element) => {
          var tableContentDiv1 = [];
          (element?.task_creation_index || []).forEach((taskElement, index) => {
            tableContentDiv1.push(
              <tr key={taskElement.task_id}>
                <td onClick={() => handleCopy(taskElement)}>{index + 1}</td>
                <td>{taskElement?.task_name || ""}</td>
                {/* <td>{taskElement?.when_1 || ""}</td> */}
                <td>{taskElement?.specific_task || ""}</td>
                <td>
                  <span
                    className={`badge badge-${
                      taskElement?.status === "active" ? "success" : "danger"
                    }`}
                  >
                    {taskElement?.status || ""}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#inputTaskFormModal"
                    onClick={() =>
                      openInputTaskFormModal(taskElement?.task_id || "", "")
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      deleteTaskDataRow(taskElement?.task_id || "")
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          });

          workFlowContentDiv1.push(
            <>
              <div className="row" key={element.work_flow_id}>
                <div className="col-lg-6 main-header">
                  <h2 style={{ color: "#3949ab" }}>
                    {element?.work_flow_name}
                  </h2>
                </div>
                <div className="col-lg-3" style={{ textAlign: "right" }}>
                  <button
                    className="btn btn-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#inputWorkFlowFormModal"
                    onClick={() =>
                      openInputWorkFlowFormModal(element?.work_flow_id || "")
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() =>
                      deleteWorkFlowDataRow(element?.work_flow_id || "")
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
                <div className="col-lg-3" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-primary text-white ms-1"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#inputTaskFormModal"
                    onClick={() =>
                      openInputTaskFormModal("", element.work_flow_id)
                    }
                  >
                    <i className="fa fa-plus text-white"></i> Add Task
                  </button>
                </div>
                <div className="col-sm-12">
                  {tableContentDiv1.length > 0 && (
                    <DataTable column={tableCol} row_data={tableContentDiv1} />
                  )}
                </div>
              </div>
              <br />
              <br />
              <br />
            </>
          );
        });
        setTableContentDiv(workFlowContentDiv1);
        setTableLoad(true);
      }
    };
    fetchData();
  }, []);

  const handleWorkFlowChange = (e) => {
    setFormWorkFlowData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTaskChange = (e) => {
    setFormTaskData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const assignTypeHandleChange = (selectedOption) => {
    const newAssignTypeId = selectedOption?.value || "";
    setAssignTypeId(newAssignTypeId);
    setFormTaskData((prevData) => ({
      ...prevData,
      assign_type_id: newAssignTypeId,
    }));
  };

  const openInputWorkFlowFormModal = async (id) => {
    $("#inputWorkFlowFormModal #ip_status_active").prop("checked", true);
    setFormWorkFlowData({
      work_flow_id: id,
      work_flow_group_id: "",
      work_flow_name: "",
      place_after: "",
      description: "",
      status: "active",
    });
    if (id === "") {
      $("#inputWorkFlowFormModal #workflowModalLabel").html(
        "Add Work Flow Creation"
      );
      $("#inputWorkFlowFormModal #ip_submit_btn").html(
        "Add Work Flow Creation"
      );
      var response1 = await DataRepository.work_flow_creation_create({
        work_flow_group_id: work_flow_group_id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          const wkFlowValues = response1?.work_flow_group_creation.map(
            (item) => ({
              label: item?.work_flow_group_name,
              value: item?.work_flow_group_id,
            })
          );
          set_work_flow_group_list(wkFlowValues);
          console.log(wkFlowValues);
          const wkFlowname = response1?.work_flow_creation.map((item) => ({
            label: item?.work_flow_name,
            value: item?.work_flow_id,
          }));
          set_work_flow_list(wkFlowname);
          const place_after = response1?.work_flow_creation.map((item) => ({
            label: item?.work_flow_name,
            value: item?.work_flow_id,
          }));
          const extendedPlaceAfterList = [
            { value: 0, label: "Start" },
            ...place_after,
          ];
          set_place_after_list(extendedPlaceAfterList);

          setFormWorkFlowData((prevData) => ({
            ...prevData,
            work_flow_group_id: work_flow_group_id,
          }));
        }
      }
    } else {
      $("#inputWorkFlowFormModal #workflowModalLabel").html(
        "Edit Work Flow Creation"
      );
      $("#inputWorkFlowFormModal #ip_submit_btn").html(
        "Update Work Flow Creation"
      );
      const response1 = await DataRepository.work_flow_creation_edit({
        work_flow_id: id,
        work_flow_group_id: work_flow_group_id,
      });
      if (response1 && response1.status === "SUCCESS") {
        const editData = response1?.work_flow_creation_edit || [];
        if (editData.length > 0) {
          const wkFlowValues = response1?.work_flow_group_creation.map(
            (item) => ({
              label: item?.work_flow_group_name,
              value: item?.work_flow_group_id,
            })
          );
          set_work_flow_group_list(wkFlowValues);
          const wkFlowname = response1?.work_flow_creation.map((item) => ({
            label: item?.work_flow_name,
            value: item?.work_flow_id,
          }));
          set_work_flow_list(wkFlowname);
          const place_after = response1?.work_flow_creation.map((item) => ({
            label: item?.work_flow_name,
            value: item?.work_flow_id,
          }));
          const extendedPlaceAfterList = [
            { value: 0, label: "Start" },
            ...place_after,
          ];
          set_place_after_list(extendedPlaceAfterList);
          setFormWorkFlowData({
            work_flow_id: id,
            work_flow_group_id: editData[0]?.work_flow_group_id || "",
            work_flow_name: editData[0]?.work_flow_name || "",
            place_after: editData[0]?.place_after || "",
            description: editData[0]?.description || "",
            status: editData[0]?.status,
          });
        }
      }
    }
  };

  const openInputTaskFormModal = async (id, work_flow_id) => {
    $("#inputTaskFormModal #ip_status_active").prop("checked", true);
    setFormTaskData({
      task_id: id,
      work_flow_group_id: "",
      work_flow_id: "",
      task_name: "",
      when_1: "",
      specific_task: "",
      assign_type_id: "",
      assign_task_group: "",
      assign_user_id: "",
      status: "active",
    });
    if (id === "") {
      $("#inputTaskFormModal #taskModalLabel").html("Add Task Creation");
      $("#inputTaskFormModal #ip_submit_btn").html("Add Task Creation");
      var response1 = await DataRepository.task_creation_create({
        work_flow_group_id: work_flow_group_id,
        work_flow_id: work_flow_id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          console.log(response1);
          const wkFlowValues = response1?.work_flow_group_creation.map(
            (item) => ({
              label: item?.work_flow_group_name,
              value: item?.work_flow_group_id,
            })
          );
          set_work_flow_group_list(wkFlowValues);
          const wkFlowname = response1?.work_flow_creation.map((item) => ({
            label: item?.work_flow_name,
            value: item?.work_flow_id,
          }));
          set_work_flow_list(wkFlowname);
          const taskValues = response1?.task_creation.map((item) => ({
            label: item?.task_name,
            value: item?.task_id,
          }));
          const extendedWhen1List = [
            { value: 0, label: "Start" },
            ...taskValues,
          ];
          set_when_1_list(extendedWhen1List);
          const assignValues = response1?.assign_type_creation.map((item) => ({
            label: item?.assign_type_name,
            value: item?.assign_type_id,
          }));
          set_assign_type_list(assignValues);
          setFormTaskData((prevData) => ({
            ...prevData,
            work_flow_group_id: work_flow_group_id || "",
            work_flow_id: work_flow_id || "",
          }));
        }
      }
    } else {
      $("#inputTaskFormModal #taskModalLabel").html("Edit Task Creation");
      $("#inputTaskFormModal #ip_submit_btn").html("Update Task Creation");
      var response1 = await DataRepository.task_creation_edit({
        task_id: id,
        work_flow_group_id: work_flow_group_id,
        work_flow_id: work_flow_id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          var edit_data = response1?.task_creation_edit || [];
          if (edit_data.length > 0) {
            const wkFlowValues = response1?.work_flow_group_creation.map(
              (item) => ({
                label: item?.work_flow_group_name,
                value: item?.work_flow_group_id,
              })
            );
            set_work_flow_group_list(wkFlowValues);
            const wkFlowname = response1?.work_flow_creation.map((item) => ({
              label: item?.work_flow_name,
              value: item?.work_flow_id,
            }));
            set_work_flow_list(wkFlowname);
            const taskValues = response1?.task_creation.map((item) => ({
              label: item?.task_name,
              value: item?.task_id,
            }));
            const extendedWhen1List = [
              { value: 0, label: "Start" },
              ...taskValues,
            ];
            set_when_1_list(extendedWhen1List);
            const assignValues = response1?.assign_type_creation.map(
              (item) => ({
                label: item?.assign_type_name,
                value: item?.assign_type_id,
              })
            );
            set_assign_type_list(assignValues);
            const assignUserValues = response1?.user_creation.map((item) => ({
              label: item?.user_id,
              value: item?.user_name,
            }));
            setAssignUserOptions(assignUserValues);
            setFormTaskData({
              task_id: id,
              work_flow_group_id: edit_data[0]?.work_flow_group_id || "",
              work_flow_id: edit_data[0]?.work_flow_id || "",
              task_name: edit_data[0]?.task_name || "",
              when_1: edit_data[0]?.when_1 || "",
              specific_task: edit_data[0]?.specific_task || "",
              assign_type_id: edit_data[0]?.assign_type_id || "",
              assign_task_group: edit_data[0]?.assign_task_group || "",
              assign_user_id: edit_data[0]?.assign_user_id || "",
              status: edit_data[0]?.status,
            });
          }
        }
      }
    }
  };

  const submitWorkFlowDataRow = async (e) => {
    e.preventDefault();
    let response1 = null;
    if (formWorkFlowData?.work_flow_id === "") {
      response1 = await DataRepository.work_flow_creation_insert(
        formWorkFlowData
      );
    } else {
      response1 = await DataRepository.work_flow_creation_update(
        formWorkFlowData
      );
    }
    if (response1 && response1.status === "SUCCESS") {
      window.location.reload();
    }
  };

  const deleteWorkFlowDataRow = async (id) => {
    if (id !== "") {
      Swal.fire({
        title: "Remove Work Flow Creation",
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
          const getInitDatas = async () => {
            const response1 = await DataRepository.work_flow_creation_delete({
              work_flow_id: id,
            });
            if (response1 && response1.status === "SUCCESS") {
              window.location.reload();
            }
          };
          getInitDatas();
        }
      });
    }
  };

  const submitTaskDataRow = async (e) => {
    e.preventDefault();
    var response1 = null;
    const task_id = formTaskData?.task_id;
    console.log(task_id);
    if (formTaskData?.task_id === "") {
      response1 = await DataRepository.task_creation_insert(formTaskData);
    } else {
      response1 = await DataRepository.task_creation_update(formTaskData);
    }
    if (response1) {
      if (response1?.status === "SUCCESS") {
        window.location.reload();
      }
    }
  };
  const deleteTaskDataRow = async (id) => {
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
  console.log(formWorkFlowData);
  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6 main-header">
              <h2>
                Work Flow <span>Creation</span>
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
                data-bs-target="#inputWorkFlowFormModal"
                onClick={() => openInputWorkFlowFormModal("")}
              >
                <i className="fa fa-plus text-white"></i> Add Work Flow
              </button>
            </div>
          </div>
        </div>
        {tableContentDiv}
      </div>
      <div
        className="modal fade"
        id="inputWorkFlowFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="workflowModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="workflowModalLabel">
                Modal title
              </h5>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={submitWorkFlowDataRow}>
              <input
                type="hidden"
                name="work_flow_id"
                value={formWorkFlowData?.work_flow_id}
                onChange={handleWorkFlowChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      Work Flow Group Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="select Work Flow Group Name"
                      id="work_flow_group_id"
                      className="form-control p-0 col-sm-12"
                      name="work_flow_group_id"
                      onChange={(selectedOptions) =>
                        setFormWorkFlowData((prev) => ({
                          ...prev,
                          work_flow_group_id: selectedOptions?.value,
                        }))
                      }
                      options={work_flow_group_list}
                      value={work_flow_group_list.filter((option) => {
                        if (formWorkFlowData?.work_flow_group_id) {
                          return (
                            formWorkFlowData?.work_flow_group_id ==
                            option?.value
                          );
                        }
                      })}
                      isDisabled={true}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      Work Flow Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="work_flow_name"
                      value={formWorkFlowData?.work_flow_name}
                      onChange={handleWorkFlowChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">
                      Place After <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="Select Place After"
                      id="place_after"
                      className="form-control p-0 col-sm-12"
                      name="place_after"
                      onChange={(selectedOptions) =>
                        setFormWorkFlowData((prev) => ({
                          ...prev,
                          place_after: selectedOptions?.value,
                        }))
                      }
                      options={place_after_list}
                      value={place_after_list.find(
                        (option) =>
                          formWorkFlowData?.place_after === option?.value
                      )}
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formWorkFlowData?.description}
                      onChange={handleWorkFlowChange}
                    />
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
                          onChange={handleWorkFlowChange}
                          value="active"
                          checked={formWorkFlowData?.status === "active"}
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
                          onChange={handleWorkFlowChange}
                          value="inactive"
                          checked={formWorkFlowData?.status === "inactive"}
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="ip_submit_btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="inputTaskFormModal"
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
            <form onSubmit={submitTaskDataRow}>
              <input
                type="hidden"
                name="task_id"
                value={formTaskData?.task_id}
                onChange={handleTaskChange}
              />
              <div className="modal-body">
                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Work Flow Group Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="select Work Flow Group Name"
                      id="work_flow_group_id"
                      className="form-control p-0 col-sm-12"
                      name="work_flow_group_id"
                      onChange={(selectedOptions) =>
                        setFormTaskData((prev) => ({
                          ...prev,
                          work_flow_group_id: selectedOptions?.value,
                        }))
                      }
                      options={work_flow_group_list}
                      value={work_flow_group_list.filter((option) => {
                        if (formTaskData?.work_flow_group_id) {
                          return (
                            formTaskData?.work_flow_group_id == option?.value
                          );
                        }
                      })}
                      isDisabled={true}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Work Flow Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="select Work Flow Name"
                      id="work_flow_id"
                      className="form-control p-0 col-sm-12"
                      name="work_flow_id"
                      onChange={(selectedOptions) =>
                        setFormTaskData((prev) => ({
                          ...prev,
                          work_flow_id: selectedOptions?.value,
                        }))
                      }
                      options={work_flow_list}
                      value={work_flow_list.filter((option) => {
                        if (formTaskData?.work_flow_id) {
                          return formTaskData?.work_flow_id == option?.value;
                        }
                      })}
                      isDisabled={true}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Task Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="task_name"
                      value={formTaskData?.task_name}
                      onChange={handleTaskChange}
                      type="text"
                      placeholder="Enter Task Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      When <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="Select When"
                      id="when_1"
                      className="form-control p-0 col-sm-12"
                      name="when_1"
                      onChange={(selectedOptions) =>
                        setFormTaskData((prev) => ({
                          ...prev,
                          when_1: selectedOptions?.value,
                        }))
                      }
                      options={when_1_list}
                      value={when_1_list.filter((option) => {
                        if (formTaskData?.when_1) {
                          return formTaskData?.when_1 == option?.value;
                        }
                      })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Specific Task Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="specific_task"
                      value={formTaskData?.specific_task}
                      onChange={handleTaskChange}
                      type="text"
                      placeholder="Enter Specific Task Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Assign Task Name <span className="text-danger">*</span>
                    </label>
                    <div className="ms-1">
                      <div
                        className="radio radio-success m-2"
                        style={{ display: "inline" }}
                      >
                        <input
                          id="ip_assign_task_group_user"
                          type="radio"
                          name="assign_task_group"
                          onChange={handleTaskChange}
                          value="user"
                          checked={formTaskData?.assign_task_group === "user"}
                        />
                        <label
                          className="form-label"
                          htmlFor="ip_assign_task_group_user"
                        >
                          User
                        </label>
                      </div>
                      <div
                        className="radio radio-danger m-2"
                        style={{ display: "inline" }}
                      >
                        <input
                          id="ip_assign_task_group_task_group"
                          type="radio"
                          name="assign_task_group"
                          onChange={handleTaskChange}
                          value="task_group"
                          checked={
                            formTaskData?.assign_task_group === "task_group"
                          }
                        />
                        <label
                          className="form-label"
                          htmlFor="ip_assign_task_group_task_group"
                        >
                          Task Group
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Assign Type Group Name{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="Select Assign Type Group Name"
                      id="assign_type_id"
                      className="form-control p-0 col-sm-12"
                      name="assign_type_id"
                      onChange={assignTypeHandleChange}
                      options={assign_type_list}
                      value={assign_type_list.filter((option) => {
                        if (formTaskData?.assign_type_id) {
                          return formTaskData?.assign_type_id == option?.value;
                        }
                      })}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Assign User Name <span className="text-danger">*</span>
                    </label>
                    <Select
                      placeholder="select Assign User Name"
                      id="assign_user_id"
                      className="form-control p-0 col-sm-12"
                      name="assign_user_id"
                      onChange={(selectedOptions) =>
                        setFormTaskData((prev) => ({
                          ...prev,
                          assign_user_id: selectedOptions?.value,
                        }))
                      }
                      options={assignUserOptions}
                      value={assignUserOptions.filter((option) => {
                        if (formTaskData?.assign_user_id) {
                          return formTaskData?.assign_user_id == option?.value;
                        }
                      })}
                      required
                    />
                    {/* <select className="form-select" name="assign_user_id" value={formTaskData?.assign_user_id} onChange={handleTaskChange} required>
                                            <option value="">Select Assign User Name</option>
                                            {(assignUserOptions.map((user, index) => (
                                                    <option value={user.user_id}>
                                                        {user.user_name}
                                                    </option>
                                                ))
                                            )}
                                        </select> */}
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
                          onChange={handleTaskChange}
                          value="active"
                          checked={formTaskData?.status === "active"}
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
                          onChange={handleTaskChange}
                          value="inactive"
                          checked={formTaskData?.status === "inactive"}
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

export default WorkFlowCreation;
