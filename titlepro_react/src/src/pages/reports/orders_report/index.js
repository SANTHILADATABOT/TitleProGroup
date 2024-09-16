import { useEffect, useState } from "react";
import ReportsRepository from "../../../../repositories/ReportsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import UserRightsRepository from '../../../../repositories/UserRightsRepository';
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";
const OrdersReport = () => {
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
    "Arrival Date",
    "Delivery Date",
    "Order Number",
    "Transaction Type",
    "Data Source",
    "State",
    "County",
    "Active Work Flow",
    "Work Flow Group",
    "Assigned To",
    "Status"
  ]);
  var [table_content_div, set_table_content_div] = useState([]);

  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 28,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_user_rights(response1?.get_user_rights);
        }
      }
    };
    fetch_data();
  }, [CommonVariables]);

  useEffect(() => {
    // if((user_rights?.edit_rights === '1') || (user_rights?.delete_rights === '1')){
    set_table_col([
      "Sno",
      "Arrival Date",
      "Delivery Date",
      "Order Number",
      "Transaction Type",
      "Data Source",
      "State",
      "County",
      "Active Work Flow",
      "Work Flow Group",
      "Assigned To",
      "Status"
    ]);
    // }else{
    //   set_table_col([
    //     "Sno",
    //     "Arrival Date",
    //     "Delivery Date",
    //     "Order Number",
    //     "Transaction Type",
    //     "Data Source",
    //     "State",
    //     "County",
    //     "Active Work Flow",
    //     "Work Flow Group",
    //     "Assigned To",
    //     "Status"
    //   ]);
    // }
    document.title = `${CommonVariables.project_title} : Orders Report`;

    fetch_data();
  }, [user_rights]);

  const fetch_data = async () => {
    var response1 = await ReportsRepository.orders_report_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.orders_report_index || []).forEach(
          (element, index) => {
            var tb_row = [index + 1, (<div style={{whiteSpace:"wrap"}}>{element?.arrival_date || ""}</div>), (<div style={{whiteSpace:"wrap"}}>{element?.delivery_date || ""}</div>), element?.order_number || "", element?.transaction_type_name || "", element?.data_source_name || "", element?.state_name || "", element?.county_name || "", (<div style={{whiteSpace:"wrap"}}>{element?.active_workflow || ""}</div>), (<div style={{whiteSpace:"wrap"}}>{element?.work_flow_group_name || ""}</div>), element?.assigned_to || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>)];
            table_content_div1.push(tb_row);
          }
        );
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
                Orders <span style={{ color: "black" }}>Report</span>
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
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} exportBtns={{ excel: true, pdf: true }} exportTitle="Orders Report" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersReport;
