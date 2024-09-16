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
}) => {
  const { order_id } = useParams();
  const [timerState, setTimerState] = useState({
    // start_time: new Date(),
    // stop_time: new Date(),
    status: task_status,
    task_id: taskId,
    order_id: order_id,
  });

   const convertSeconds = (startTime) => {
     console.log("original", startTime);
     const startDate = new Date(startTime);
     console.log("startTime", startDate);
     const date = new Date();
     console.log(date);
     const diffValue = date - startDate;
     console.log(diffValue);
     const diffInSeconds = diffValue / 1000;
    return diffInSeconds;
   }
    const convertSecondsStop = (startTime,stopTime) => {
      const startDate = new Date(startTime);
      const date = new Date(stopTime);
      const diffValue = date - startDate;
      const diffInSeconds = diffValue / 1000;
      console.log(diffInSeconds);
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
      // offsetTimestamp: new Date(
      //   task_status === "Started"
      //     ? Date.now() - new Date(start_time).getTime()
      //     : task_status === "Completed"
      //     ? new Date(stop_time).getTime() - new Date(start_time).getTime()
      //     : 0
      // ),
    });
  // const formatTime = (hours, minutes, seconds) => {
  //   return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
  //     2,
  //     "0"
  //   )}:${String(seconds).padStart(2, "0")}`;
  // };

  // useEffect(() => {
  //   // Automatically start the timer if the task status is "Started"
  //   console.log(task_status)
  //   if (task_status === "Started") {
  //     start();
  //   } else {
  //     pause();
  //   }
  // }, [task_status, start, pause]);

  const handleStart = async () => {
    try {
      // const formData = { ...timerState, start_time: new Date().toISOString() };
      // console.log(new Date().toISOString());
      // console.log(formData);
      const result = await OrdersRepository.orders_task_start_timer(timerState);
      if (result?.status === "SUCCESS") {
        setTimerState((prevState) => ({
          ...prevState,
          // start_time: new Date(),
          status: "Started",
        }));
        // setOrderTaskId(orders_task_id);
        start();
      }
    } catch (error) {
      console.error("Failed to start the timer:", error);
    }
  };

  // const handlePause = async () => {
  //   try {
  //     const result = await OrdersRepository.orders_task_pause_timer({
  //       countdown_timer: formatTime(hours, minutes, seconds),
  //       orders_task_id,
  //     });
  //     if (result?.status === "SUCCESS") {
  //       setTimerState((prevState) => ({
  //         ...prevState,
  //         stop_time: formatTime(hours, minutes, seconds),
  //         status: "Paused",
  //       }));
  //       pause();
  //     }
  //   } catch (error) {
  //     console.error("Failed to pause the timer:", error);
  //   }
  // };

  console.log(orders_task_id);
  const handleStop = async () => {
    pause();
    try {
      //  const stopTime = new Date().toISOString();
      const result = await OrdersRepository.orders_task_stop_timer({
        // stop_time: stopTime,
        orders_task_id: orders_task_id,
      }); 
      if (result?.status === "SUCCESS") {
        // reset(undefined, false);
        setTimerState((prevState) => ({
        //   ...prevState,
        //   stop_time: ,
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

  return (
    <tr>
      <td onClick={() => handleCopy(subItem)}>
        <p>{index + 1}</p>
      </td>
      <td>
        <div>
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
        </div>
      </td>
      <td>
        <span
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
        </span>
      </td>
      <td>{subItem?.task_name || ""}</td>
      <td>{subItem?.assign_username || ""}</td>
      <td>{subItem?.assign_type_name || ""}</td>
      <td>{subItem?.assign_date || ""}</td>
      <td>{subItem?.completed_by || ""}</td>
      <td>{subItem?.completed_date || ""}</td>
      <td>
        <button
          className="btn btn-primary m-1"
          data-bs-toggle="modal"
          data-bs-target="#inputTaskFormModal"
          onClick={() => openInputTaskFormModal(subItem?.task_id || "", "")}
        >
          <i className="fa fa-edit"></i>
        </button>
        <button
          className="btn btn-danger m-1"
          onClick={() => deleteTaskDataRow(subItem?.task_id || "")}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
