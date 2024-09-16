import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import OrdersRepository from "../../../repositories/OrdersRepository";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrderId } from "../../../store/reducers/OrderId";
import "./table.css";
import moment from "moment/moment";
import { FilterOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { copyToClipboard } from "../../../utils/lib/copyClip";
import { toast } from "react-toastify";
import CommonVariables from "../../../layouts/CommonVariables";
import UserRightsRepository from '../../../repositories/UserRightsRepository';
import DataTableComponent from "../../inc/components/DataTableComponent";
import LoadingSpinner from "../../inc/components/LoadingSpinner";

const OrdersTable = () => {
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
    "Status",
    "Action",
  ]);
  var [table_content_div, set_table_content_div] = useState([]);
  const [open, setOpen] = useState(false);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleOrder = async (id) => {
    dispatch(addOrderId(id));
    const data = { tab_id: id.toString() };
    const result = await OrdersRepository.orders_tab_update(data);
    if (result?.status === "SUCCESS") {
      navigate(`/order-entry/${id}/order-summary`);
      window.location.reload();
    }
  };
  
  useEffect(() => {
    if ((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")) {
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
        "Status",
        "Action",
      ]);
    } else {
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
    var response1 = await OrdersRepository.order_entry_index({});
    if (response1) {
      if (response1?.status === "SUCCESS") {
        var table_content_div1 = [];
        (response1?.order_entry_index || []).forEach((element, index) => {
          var tb_row = [(<span onClick={() => handleCopy(element)}>{index + 1}</span>), moment(element?.arrival_date).format("DD-MM-YYYY") || "", moment(element?.delivery_date).format("DD-MM-YYYY") || "", (<div onClick={() => handleOrder(element?.order_id)}><span className={"badge badge-primary"}>{element?.order_number || ""}</span></div>), element?.transaction_type_name || "", element?.data_source_name || "", element?.state_name || "", element?.county_name || "", element?.active_workflow || "", element?.work_flow_group_name || "", element?.assigned_to || "", (<span className={`badge badge-${element?.status === "active" ? "success" : "danger"}`}>{element?.status || ""}</span>)];
          if((user_rights?.edit_rights === "1") || (user_rights?.delete_rights === "1")){
            tb_row.push(<span className="text-center">
              {user_rights?.edit_rights === "1" && (
                <button
                  className="btn btn-primary m-1"
                  data-bs-toggle="modal"
                  data-bs-original-title="test"
                  data-bs-target="#inputFormModal"
                  onClick={() =>
                    navigate(`/order-entry/form/${element?.order_id || ""}`)
                  }
                >
                  <i className="fa fa-edit"></i>
                </button>
              )}
              {user_rights?.delete_rights === "1" && (
                <button
                  className="btn btn-danger m-1"
                  onClick={() => deleteDataRow(element?.order_id || "")}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}
            </span>);
          }
          table_content_div1.push(tb_row);
        });
        set_table_content_div(table_content_div1);
      }
    }
  };

  const deleteDataRow = async (id) => {
    if (id !== "") {
      Swal.fire({
        title: "Remove Order Entry",
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
            var response1 = await OrdersRepository.order_entry_delete({
              order_id: id,
            });
            if (response1) {
              if (response1?.status === "SUCCESS") {
                fetch_data();
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
                Order <span style={{ color: "black" }}>Entry</span>
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
              <button className="btn btn-success ms-1" onClick={showDrawer}>
                <FilterOutlined /> Filters
              </button>
              {user_rights?.add_rights === "1" && (
                <button
                  className="btn btn-primary text-white ms-1"
                  type="button"
                  onClick={() => navigate("/order-entry/form")}
                >
                  <i className="fa fa-plus text-white"></i> Add Order Entry
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <DataTableComponent column={table_col} row_data={table_content_div} exportColumns={[0,1,2,3,4,5,6,7,8,9,10,11]} exportBtns={{excel:true,pdf:true}} exportTitle="Customer Fees Creation" />
            )}
          </div>
        </div>
      </div>
      <Drawer
        title="Filters"
        placement={"right"}
        closable
        onClose={onClose}
        open={open}
        key={"right"}
      >
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label className="form-label">
              Order Number <span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">
              Transaction Type <span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">
              Data Source<span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">
              State<span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">
              County <span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">
              Active Workflow <span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">
              Work Flow Group <span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">
              Assigned To<span className="text-danger">*</span>
            </label>
            <Select
              id="contact_id"
              className="form-control p-0 col-sm-12"
              name="contact_id"
              // placeholder="select Customer Name"
              // onChange={(selectedOptions)=>setFormData((prev)=>({...prev,contact_id:selectedOptions?.value}))}
              // options={contact_list}
              // value={contact_list.filter((option) => {
              //   if (formData?.contact_id) {
              //     return formData?.contact_id === option?.value;
              //   }
              // })}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default OrdersTable;
