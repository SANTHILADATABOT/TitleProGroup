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
    start_time: start_time,
    stop_time: stop_time,
    status: task_status,
    task_id: taskId,
    order_id: order_id,
  });

  const convertTimeToMilliseconds = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };
  
  const storedMilliseconds = convertTimeToMilliseconds(start_time);
  console.log(
    "timerState:",
    timerState,
    "storedMilliseconds:",
    new Date(Date.now() - storedMilliseconds)
  );

  const { seconds, minutes, hours, start, pause, reset, isRunning } =
    useStopwatch({
      autoStart: false,
      offsetTimestamp: new Date(Date.now() - storedMilliseconds),
    });

  const formatTime = (hours, minutes, seconds) => {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // useEffect(() => {
  //   // Fetch initial timer state from backend on component mount
  //   const fetchTimerState = async () => {
  //     try {
  //       const result = await OrdersRepository.orders_task_get_timer_state(
  //         order_id,
  //         taskId
  //       );
  //       if (result?.status === "SUCCESS" && result?.data) {
  //         const { start_time, stop_time, status } = result.data;
  //         setTimerState({
  //           start_time,
  //           stop_time,
  //           status,
  //           task_id: taskId,
  //           order_id,
  //         });

  //         // Calculate elapsed time and set offset
  //         const elapsedMilliseconds = convertTimeToMilliseconds(start_time);
  //         if (status === "started") {
  //           reset(new Date(Date.now() - elapsedMilliseconds), false);
  //           start();
  //         } else if (status === "paused") {
  //           reset(new Date(Date.now() - elapsedMilliseconds), false);
  //           pause();
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch timer state:", error);
  //     }
  //   };

  //   fetchTimerState();
  // }, [order_id, taskId]);

  const handleStart = async () => {
    try {
      const result = await OrdersRepository.orders_task_start_timer(timerState);
      if (result?.status === "SUCCESS") {
        setTimerState((prevState) => ({
          ...prevState,
          start_time: formatTime(hours, minutes, seconds),
          status: "started",
        }));
        setOrderTaskId(result?.orders_task_id);
        start();
      }
    } catch (error) {
      console.error("Failed to start the timer:", error);
    }
  };

  const handlePause = async () => {
    try {
      const result = await OrdersRepository.orders_task_pause_timer({
        // ...timerState,
        countdown_timer: formatTime(hours, minutes, seconds),
        orders_task_id,
      });
      if (result?.status === "SUCCESS") {
        setTimerState((prevState) => ({
          ...prevState,
          stop_time: formatTime(hours, minutes, seconds),
          status: "paused",
        }));
        pause();
      }
    } catch (error) {
      console.error("Failed to pause the timer:", error);
    }
  };

  const handleStop = async () => {
    pause();
    try {
      const result = await OrdersRepository.orders_task_stop_timer({
        // ...timerState,
        countdown_timer: formatTime(hours, minutes, seconds),
        orders_task_id: orders_task_id,
      });
      if (result?.status === "SUCCESS") {
        reset(undefined, false);
        setTimerState((prevState) => ({
          ...prevState,
          stop_time: formatTime(hours, minutes, seconds),
          status: "completed",
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

  // return (
  //   <tr>
  //     <td onClick={() => handleCopy(subItem)}>
  //       <p>{index + 1}</p>
  //     </td>
  //     <td>
  //       <div>
  //         <section className="time-container" style={{ textAlign: "center" }}>
  //           <h6 className="time">
  //             <span>{hours.toString().padStart(2, "0")}</span>:
  //             <span>{minutes.toString().padStart(2, "0")}</span>:
  //             <span>{seconds.toString().padStart(2, "0")}</span>
  //           </h6>
  //         </section>
  //         <section
  //           title="actions"
  //           className="buttons"
  //           style={{ textAlign: "center" }}
  //         >
  //           <button
  //             className={`btn btn-${isRunning ? "danger" : "primary"} m-1`}
  //             style={{ padding: ".375rem .75em" }}
  //             onClick={isRunning ? handleStop : handleStart}
  //           >
  //             {isRunning ? <StopOutlined /> : <PlayCircleOutlined />}
  //           </button>
  //           {/* <button
  //             style={{ padding: ".375rem .75em" }}
  //             className="btn btn-danger m-1"
  //             onClick={handleStop}
  //           >
  //             <StopOutlined />
  //           </button> */}
  //         </section>
  //       </div>
  //     </td>
  //     <td>
  //       <span
  //         className={`badge ${
  //           subItem?.task_status === "Not Started"
  //             ? "badge-danger"
  //             : subItem?.task_status === "Started"
  //             ? "badge-primary"
  //             : subItem?.task_status === "Paused"
  //             ? "badge-warning"
  //             : subItem?.task_status === "Completed"
  //             ? "badge-success"
  //             : ""
  //         }`}
  //       >
  //         {subItem?.task_status || ""}
  //       </span>
  //     </td>
  //     <td>{subItem?.task_name || ""}</td>
  //     <td>{subItem?.assign_username || ""}</td>
  //     <td>{subItem?.assign_type_name || ""}</td>
  //     <td>{subItem?.assign_date || ""}</td>
  //     <td>{subItem?.completed_by || ""}</td>
  //     <td>{subItem?.completed_date || ""}</td>
  //     <td>
  //       <button
  //         className="btn btn-primary m-1"
  //         data-bs-toggle="modal"
  //         data-bs-target="#inputTaskFormModal"
  //         onClick={() => openInputTaskFormModal(subItem?.task_id || "", "")}
  //       >
  //         <i className="fa fa-edit"></i>
  //       </button>
  //       <button
  //         className="btn btn-danger m-1"
  //         onClick={() => deleteTaskDataRow(subItem?.task_id || "")}
  //       >
  //         <i className="fa fa-trash"></i>
  //       </button>
  //     </td>
  //   </tr>
  // );
};

export default TableRow;
