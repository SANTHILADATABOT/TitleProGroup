import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import $ from "jquery";
import DataRepository from "../../../../repositories/DataRepository";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import Swal from "sweetalert2";
import Select from "react-select";
import { Tabs } from "antd";
import TableRow from "./tableRow";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";
import DataTableComponent from "../../../inc/components/DataTableComponent";

const OrderTask = () => {
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
    "Timer",
    "Task Status",
    "Task Name",
    "Assigned User",
    "Assigned Type",
    "Assigned Date",
    "Completed By",
    "Completed Date",
    "Action",
  ]);
  const [tableRowValues, setTableRowValues] = useState([]);
  var [work_flow_group_list, set_work_flow_group_list] = useState([]);
  var [work_flow_list, set_work_flow_list] = useState([]);
  var [place_after_list, set_place_after_list] = useState([]);
  var [when_1_list, set_when_1_list] = useState([]);
  var [assign_type_list, set_assign_type_list] = useState([]);
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
  const { order_id } = useParams();
  const navigate = useNavigate();
  var [assignUserOptions, setAssignUserOptions] = useState([]);
  var [assignTypeId, setAssignTypeId] = useState("");
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [orders_task_id, setOrderTaskId] = useState("");

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
      var response1 = await UserRightsRepository.get_user_rights({user_type_id: CommonVariables?.userDetails?.user_type_id, user_screen_id: 63});
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_user_rights(response1?.get_user_rights);
        }
      }
    };
    fetch_data();
  }, [CommonVariables]);

  //tabs

  const onChange = (newActiveKey) => {
    navigate(`/order-entry/${newActiveKey}/orders-tasks`);
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
      navigate(`/order-entry/${newActiveKey}/orders-tasks`);
      setItems(newPanes);
      // setActiveKey(newActiveKey);
    }
  };
  const onEdit = (targetKey, action) => {
    remove(targetKey);
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
    if((user_rights?.edit_rights === '1') || (user_rights?.delete_rights === '1')){
      set_table_col([
        "Sno",
        "Timer",
        "Task Status",
        "Task Name",
        "Assigned User",
        "Assigned Type",
        "Assigned Date",
        "Completed By",
        "Completed Date",
        "Action",
      ]);
    }else{
      set_table_col([
        "Sno",
        "Timer",
        "Task Status",
        "Task Name",
        "Assigned User",
        "Assigned Type",
        "Assigned Date",
        "Completed By",
        "Completed Date",
      ]);
    }
    
    fetch_data();
  }, [order_id, user_rights]);

  const fetch_data = async () => {
    var response1 = await OrdersRepository.orders_task_index({
      order_id: order_id,
    });
    if (response1) {
      if(response1?.status === "SUCCESS"){
        setTableRowValues(response1?.orders_task_index || []);
      }
    }
  };
  
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
      var response1 = await OrdersRepository.orders_task_work_flow_group_create(
        {
          order_id: order_id,
        }
      );
      if (response1) {
        if (response1?.status === "SUCCESS") {
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

          const work_flow_group_id = response1?.work_flow_group_id;

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
        // work_flow_group_id: work_flow_group_id,
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
      var response1 = await OrdersRepository.orders_task_new_task_create({
        order_id: order_id,
        work_flow_id: work_flow_id,
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
          const work_flow_group_id = response1?.work_flow_group_id;
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
        // work_flow_group_id: work_flow_group_id,
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
              label: item?.user_name,
              value: item?.user_id,
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
  
  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6 main-header">
              <h2>
                Orders <span>Task</span>
              </h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              {/* <button
                className="btn btn-info"
                onClick={() => window.location.reload()}
              >
                <i className="fa fa-refresh"></i>
              </button> */}
              {/* <button
                className="btn btn-primary text-white ms-1"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#inputWorkFlowFormModal"
                onClick={() => openInputWorkFlowFormModal("")}
              >
                <i className="fa fa-plus text-white"></i> Add Work Flow
              </button> */}
            </div>
          </div>
          <div className="row" id="tabpanel">
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
            {loading ? (
              <LoadingSpinner />
            ) : (
        (tableRowValues.length > 0) ?
          tableRowValues.map((item, index1) => (
            <>
              <div className="row" key={index1}>
                <div className="col-lg-6 main-header">
                  <h4 style={{ color: "#3949ab" }}>{item?.work_flow_name}</h4>
                </div>
                <div className="col-lg-3" style={{ textAlign: "right" }}></div>
                <div className="col-lg-3" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-primary text-white ms-1"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#inputTaskFormModal"
                    onClick={() =>
                      openInputTaskFormModal("", item.work_flow_id)
                    }
                  >
                    <i className="fa fa-plus text-white"></i> Add Task
                  </button>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <DataTableComponent
                    column={table_col}
                    row_data={(item?.task_creation_index || []).map(
                      (subItem, index2) => {
                        const tb_row = (<TableRow
                          key={index2}
                          setOrderTaskId={setOrderTaskId}
                          orders_task_id={subItem?.orders_task_id}
                          index={index2}
                          taskId={subItem?.task_id}
                          start_time={subItem?.start_time}
                          stop_time={subItem?.stop_time}
                          task_status={subItem?.task_status}
                          subItem={subItem}
                          openInputTaskFormModal={openInputTaskFormModal}
                          deleteTaskDataRow={deleteTaskDataRow}
                          order_id={order_id}
                          user_rights={user_rights}
                        />);
                        return tb_row;
                        }
                    )}
                    exportColumns={[0,1,2,3,4,5,6,7]}
                    exportBtns={{excel:true,pdf:true}}
                    exportTitle="Orders-Task"
                  />
                </div>
              </div>
            </>
          )) : (<></>)
      )}

        {/* {tableContentDiv} */}
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
                type="text"
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

export default OrderTask;
