import { useCallback, useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import DatePicker from "react-datepicker";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { Drawer, Tabs } from "antd";
// import { BorrowerTable } from "./borrowerTable";
// import { SellerTable } from "./sellerTable";
import { useNavigate } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";
import CommonVariables from "../../../../layouts/CommonVariables";
import UserRightsRepository from '../../../../repositories/UserRightsRepository';
const DataAccess = () => {
  const [items, setItems] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const newTabIndex = useRef(0);
  var { order_id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
var [user_rights, set_user_rights] = useState({});
useEffect(() => {
  const fetch_data = async () => {
    var response1 = await UserRightsRepository.get_user_rights({
      user_type_id: CommonVariables?.userDetails?.user_type_id,
      user_screen_id: 30,
    });
    if (response1) {
      if (response1?.status === "SUCCESS") {
        set_user_rights(response1?.get_user_rights);
      }
    }
  };
  fetch_data();
}, [CommonVariables]);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
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

  //tabs

  const onChange = (newActiveKey) => {
    navigate(`/order-entry/${newActiveKey}/data-access`);
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
      navigate(`/order-entry/${newActiveKey}/data-access`);
      setItems(newPanes);
      // setActiveKey(newActiveKey);
    }
  };
  const onEdit = (targetKey, action) => {
    remove(targetKey);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="page-header">
          <div className="row mb-5">
            <div className="col-lg-6 main-header">
              <h2>
                Order <span style={{ color: "black" }}>Summary</span>
              </h2>
            </div>
            <div
              className="col-lg-6 main-header"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button className="btn btn-success" onClick={showDrawer}>
                <FilterOutlined /> Add Order Entry
              </button>
            </div>
          </div>
          <div className="row" id='tabpanel'>
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
       
      </div>
     
    </>
  );
};

export default DataAccess;
