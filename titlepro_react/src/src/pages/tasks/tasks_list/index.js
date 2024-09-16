import { useEffect, useState } from "react";
import TasksRepository from "../../../../repositories/TasksRepository";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const TasksList = () => {
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
      "Order Number",
      "Task Status",
      "Task Name",
      "Assigned User",
      "Assigned Type",
      "Assigned Date",
      "Completed By",
      "Completed Date",
  ]);
  useEffect(() => {
    set_table_col([
        "Sno",
        "Order Number",
        "Task Status",
        "Task Name",
        "Assigned User",
        "Assigned Type",
        "Assigned Date",
        "Completed By",
        "Completed Date",
      ]);
    fetch_data();
  }, [user_rights]);

  var [table_content_div, set_table_content_div] = useState([]);
  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 54,
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
        Entry Date: ${item?.entry_date || ""}
        Tax Name: ${item?.tax_name || ""}
        Description: ${item?.description || ""}
        Status: ${item?.status || ""}
    `;
    copyToClipboard(textToCopy);
  };

  const fetch_data = async () => {
    var response1 = await TasksRepository.tasks_list_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.tasks_list_index || []).forEach(
          (element, index) => {
            var tb_row = [(<span onClick={() => { handleCopy(element); }}>{index + 1}</span>), element?.order_number || "", (<span className={`badge ${
              element?.task_status === 'Not Started' ? 'badge-danger' :
              element?.task_status === 'Started' ? 'badge-primary' :
              element?.task_status === 'Paused' ? 'badge-warning' :
              element?.task_status === 'Completed' ? 'badge-success' :
              ''
            }`}>
              {element?.task_status || ""}
            </span>), element?.task_name || "", element?.assign_username || "", element?.assign_type_name || "", element?.assign_date || "", element?.completed_by || "", element?.completed_date || "", ];
            table_content_div1.push(tb_row);
          }
        );
        set_table_content_div(table_content_div1);
      }
    }
  };

  useEffect(() => {    
    fetch_data();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6 main-header">
              <h2>
                Tasks <span style={{ color: "black" }}>View</span>
              </h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              <button
                className="btn btn-info"
                onClick={() => refreshTable()}
              >
                <i className="fa fa-refresh"></i>
              </button>              
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
          {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4,5,6,7,8]} exportBtns={{excel:true,pdf:true}} exportTitle="Tasks View" />
            )}
          </div>
        </div>
      </div>      
    </>
  );
};

export default TasksList;
