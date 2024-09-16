import { useEffect, useState } from "react";
import AdminRepository from "../../../../repositories/AdminRepository";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const UserLogs = () => {
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
    "User Type",
    "User Name",
    "Login at",
    "Description",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  useEffect(() => {
    fetch_data();
  }, []);
  const fetch_data = async () => {
    var response1 = await AdminRepository.user_logs_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.user_logs_index || []).forEach((element, index) => {
          table_content_div1.push([index + 1, element?.user_type_name || "", element?.user_name || "", element?.login_at || "", element?.description || ""]);
        });
        set_table_content_div(table_content_div1);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6 main-header">
              <h2>
                User <span>Logs</span>
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
            <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4]} exportBtns={{excel:true}} />
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogs;
