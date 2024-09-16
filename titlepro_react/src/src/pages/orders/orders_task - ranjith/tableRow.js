import { useStopwatch } from "react-timer-hook";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { useEffect, useState } from "react";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { useParams } from "react-router-dom";

const TableRow = ({
  subItem,
  index,
  taskId,
  start_time,
  stop_time,
  task_status,
  deleteTaskDataRow,
  openInputTaskFormModal,
  orders_task_id,
  setOrderTaskId,
  order_id,
  user_rights
}) => {
  const [timerState, setTimerState] = useState({
    status: task_status,
    task_id: taskId,
    order_id: order_id,
  });

   const convertSeconds = (startTime) => {
     const startDate = new Date(startTime);
     const date = new Date();
     const diffValue = date - startDate;
     const diffInSeconds = diffValue / 1000;
    return diffInSeconds;
   }
    const convertSecondsStop = (startTime,stopTime) => {
      const startDate = new Date(startTime);
      const date = new Date(stopTime);
      const diffValue = date - startDate;
      const diffInSeconds = diffValue / 1000;
      return diffInSeconds;
    };
  const { seconds, minutes, hours, start, pause, reset, isRunning } =
    useStopwatch({
      autoStart: task_status === "Started" ? true : false,
      offsetTimestamp: new Date().setSeconds(
        task_status === "Started"
          ? convertSeconds(start_time)
          : task_status === "Completed"
          ? convertSecondsStop(start_time,stop_time)
          : 0
      ),
    });
  
  const handleStart = async () => {
    try {
      const result = await OrdersRepository.orders_task_start_timer(timerState);
      if (result?.status === "SUCCESS") {
        setTimerState((prevState) => ({
          ...prevState,
          status: "Started",
        }));
        start();
      }
    } catch (error) {
      console.error("Failed to start the timer:", error);
    }
  };

  const handleStop = async () => {
    pause();
    try {
      const result = await OrdersRepository.orders_task_stop_timer({
        orders_task_id: orders_task_id,
      }); 
      if (result?.status === "SUCCESS") {
        setTimerState((prevState) => ({
          status: "Completed",
        }));
      }
    } catch (error) {
      console.error("Failed to stop the timer:", error);
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
    });
    const textToCopy = `Entry Date: ${item.entry_date || ""}\nTask Name: ${
      item.task_name || ""
    }\nWhen: ${item.when_1 || ""}\nSpecific Task: ${
      item.specific_task || ""
    }\nStatus: ${item.status || ""}`;
    copyToClipboard(textToCopy);
  };
  var tb_row = [
    (<span onClick={() => handleCopy(subItem)}><p>{index + 1}</p></span>),
    (<div>
      <section className="time-container" style={{ textAlign: "center" }}>
        <h6 className="time">
          <span>{hours.toString().padStart(2, "0")}</span>:
          <span>{minutes.toString().padStart(2, "0")}</span>:
          <span>{seconds.toString().padStart(2, "0")}</span>
        </h6>
      </section>
      <section
        title="actions"
        className="buttons"
        style={{ textAlign: "center" }}
      >
        <button
          className={`btn btn-${isRunning ? "danger" : "primary"} m-1`}
          style={{ padding: ".375rem .75em" }}
          onClick={isRunning ? handleStop : handleStart}
        >
          {isRunning ? <StopOutlined /> : <PlayCircleOutlined />}
        </button>
      </section>
    </div>),
    (<span
      className={`badge ${
        timerState?.status === "Not Started"
          ? "badge-danger"
          : timerState?.status === "Started"
          ? "badge-primary"
          : timerState?.status === "Paused"
          ? "badge-warning"
          : timerState?.status === "Completed"
          ? "badge-success"
          : ""
      }`}
    >
      {timerState?.status || ""}
    </span>),
    subItem?.task_name || "",
    subItem?.assign_username || "",
    subItem?.assign_type_name || "",
    subItem?.assign_date || "",
    subItem?.completed_by || "",
    subItem?.completed_date || ""
  ];
  if((user_rights?.edit_rights === '1') || (user_rights?.delete_rights === '1')){
    tb_row.push(<span>
      {(user_rights?.edit_rights === '1') && (<button
        className="btn btn-primary m-1"
        data-bs-toggle="modal"
        data-bs-target="#inputTaskFormModal"
        onClick={() => openInputTaskFormModal(subItem?.task_id || "", "")}
      >
        <i className="fa fa-edit"></i>
      </button>)}
      {(user_rights?.delete_rights === '1') && (<button
        className="btn btn-danger m-1"
        onClick={() => deleteTaskDataRow(subItem?.task_id || "")}
      >
        <i className="fa fa-trash"></i>
      </button>)}
    </span>);
  }
  return tb_row;
};

export default TableRow;
