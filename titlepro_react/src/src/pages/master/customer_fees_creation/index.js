import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { copyToClipboard } from "../../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import ContactsRepository from "../../../../repositories/ContactsRepository";
import UserRightsRepository from "../../../../repositories/UserRightsRepository";
import CommonVariables from "../../../../layouts/CommonVariables";
import DataTableComponent from "../../../inc/components/DataTableComponent";
import LoadingSpinner from "../../../inc/components/LoadingSpinner";

const OrdersInvoice = () => {
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
    "Customer Fees",
    "County",
    "State",
    "Description",
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  const navigate = useNavigate();

  var [user_rights, set_user_rights] = useState({});
  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
        user_screen_id: 50,
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
    if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
      set_table_col([
        "Sno",
        "Customer Fees",
        "County",
        "State",
        "Description",
        "Status",
        "Action",
      ]);
    } else {
      set_table_col([
        "Sno",
        "Customer Fees",
        "County",
        "State",
        "Description",
        "Status",
      ]);
    }
    
    fetch_data();
  }, [user_rights]);
  
  const handleCopy = (element) => {
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
        Customer Fees: ${element?.customer_fees || ""}
        County: ${element?.county_name || ""}
        State: ${element?.state_name || ""}
        Description: ${element?.description || ""}
        Status: ${element?.status || ""}
    `;
    copyToClipboard(textToCopy);
  };
  const fetch_data = async () => {
    var response1 = await ContactsRepository.customer_fees_creation_index();
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.customer_fees_creation_index || []).forEach(
          (element, index) => {
            var tb_row = [(<span onClick={() => handleCopy(element)}>{index + 1}</span>), element?.customer_fees || "", element?.county_name || "", element?.state_name || "", element?.description || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>) ];
            if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
              tb_row.push(<>
                {(user_rights?.edit_rights === "1") && (<button
                  className="btn btn-primary m-1"
                  onClick={() => navigate(`/customer-fees-creation/form/${element?.customer_fees_id || ""}`)}
                >
                  <i className="fa fa-edit"></i>
                </button>)}
                {(user_rights?.delete_rights === "1") && (<button
                  className="btn btn-danger m-1"
                  onClick={() => deleteDataRow(element?.customer_fees_id || "")}
                >
                  <i className="fa fa-trash"></i>
                </button>)}
              </>);
            }
            table_content_div1.push(tb_row);
          }
        );
        set_table_content_div(table_content_div1);
      }
    }
  };

  const deleteDataRow = async (customer_fees_id) => {
    if (customer_fees_id !== "") {
      Swal.fire({
        title: "Remove Customer Fees Creation",
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
            var response1 =
              await ContactsRepository.customer_fees_creation_delete({
                customer_fees_id: customer_fees_id,
              });
            if (response1) {
              if (response1?.status === "SUCCESS") {
                refreshTable();
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
          <div className="row mb-3">
            <div className="col-lg-6 main-header">
              <h2>
                Customer <span style={{ color: "black" }}>Fees Creation</span>
              </h2>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              <button
                className="btn btn-info"
                onClick={() => refreshTable()}
              >
                <i className="fa fa-refresh"></i>
              </button>
              <button
                className="btn btn-primary text-white ms-1"
                type="button"
                onClick={() =>
                  navigate('/customer-fees-creation/form')
                }
              >
                <i className="fa fa-plus text-white"></i> Add Order Entry
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4,5]} exportBtns={{excel:true,pdf:true}} exportTitle="Customer Fees Creation" />
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersInvoice;
