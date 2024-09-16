import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import UserRightsRepository from "../../../repositories/UserRightsRepository";
import CommonVariables from "../../../layouts/CommonVariables";
const SideBar = () => {
  var [user_rights, set_user_rights] = useState({});
  const url = window.location.protocol + "//" + window.location.host;
  const { pathname } = useLocation();
  const { order_id } = useParams();

  useEffect(() => {
    const fetch_data = async () => {
      var response1 = await UserRightsRepository.get_user_screen_rights({
        user_type_id: CommonVariables?.userDetails?.user_type_id,
      });
      if (response1) {
        if (response1?.status === "SUCCESS") {
          set_user_rights(response1?.user_screen_rights);
        }
      }
    };
    fetch_data();
  }, [CommonVariables]);

  return (
    <div className="sidebar">
      <ul className="iconMenu-bar custom-scrollbar">
        {/* {user_rights && user_rights['19']?.view_rights === '1' &&  */}
        <li>
          <a className="bar-icons" href={`${url}/dashboard`}>
            <i className="pe-7s-home"></i>
            <span>Home</span>
          </a>
          <ul className="iconbar-mainmenu custom-scrollbar">
            <li className="iconbar-header">Dashboard</li>
            <li>
              <a
                href={`${url}/dashboard`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/dashboard`])}
              >
                Admin Dashboard
              </a>
            </li>
          </ul>
        </li>
        {/* } */}
        {/* {user_rights && user_rights['20']?.view_rights === '1' &&  */}
        <li>
          <a className="bar-icons" href={`${url}/user-type`}>
            <i className="pe-7s-portfolio"></i>
            <span>Admin</span>
          </a>
          <ul className="iconbar-mainmenu custom-scrollbar">
            <li className="iconbar-header">Administration</li>
            <li>
              <Link
                to={`${url}/user-type`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/user-type`])}
              >
                User Type
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/user-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/user-creation`])}
              >
                User Creation
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/user-screen`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/user-screen`])}
              >
                User Screen
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/user-permissions`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/user-permissions`])}
              >
                User Permissions
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/user-logs`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/user-logs`])}
              >
                User Logs
              </Link>
            </li>
          </ul>
        </li>
        {/* } */}
        {/* {user_rights && user_rights['25']?.view_rights === '1' &&  */}
        <li>
          <a className="bar-icons" href={`${url}/contact-creation`}>
            <i className="pe-7s-server"></i>
            <span>Contacts</span>
          </a>
          <ul className="iconbar-mainmenu custom-scrollbar">
            <li className="iconbar-header">Contact Creation</li>
            <li>
              <a
                href={`${url}/contact-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/contact-creation`])}
              >
                Contact Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/staff-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/staff-creation`])}
              >
                Staff Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/contact-type-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/contact-type-creation`,
                ])}
              >
                Contact type Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/customer-fees-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/customer-fees-creation`,
                ])}
              >
                Customer Fees Creation
              </a>
            </li>
          </ul>
        </li>
        {/* } */}
        {/* {user_rights && user_rights['21']?.view_rights === '1' &&  */}
        <li>
          <a className="bar-icons" href={`${url}/company-creation`}>
            <i className="pe-7s-portfolio"></i>
            <span>Masters</span>
          </a>
          <ul className="iconbar-mainmenu custom-scrollbar">
            <li className="iconbar-header">Create Masters</li>
            <li>
              <a
                href={`${url}/company-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/company-creation`])}
              >
                Company Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/account-year-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/account-year-creation`,
                ])}
              >
                Account Year Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/state-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/state-creation`])}
              >
                State Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/county-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/county-creation`])}
              >
                County Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/staff-category-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/staff-category-creation`,
                ])}
              >
                Staff Category Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/data-source-Creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/data-source-Creation`,
                ])}
              >
                Data Source Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/department-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/department-creation`,
                ])}
              >
                Department Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/expense-type-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/expense-type-creation`,
                ])}
              >
                Expense Type Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/assign-type-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/assign-type-creation`,
                ])}
              >
                Assign Type Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/task-type-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/task-type-creation`])}
              >
                Task Type Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/transaction-type-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/transaction-type-creation`,
                ])}
              >
                Transaction Type Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/payee-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/payee-creation`])}
              >
                Payee Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/work-flow-group-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/work-flow-group-creation`,
                  `${url}/work-flow-creation`,
                ])}
              >
                Work Flow Group Creation
              </a>
            </li>
            <li>
              <a
                href={`${url}/email-template-creation`}
                className="menu_link"
                data-active_urls={JSON.stringify([
                  `${url}/email-template-creation`,
                ])}
              >
                Email Template Creation
              </a>
            </li>
          </ul>
        </li>
        {/* } */}
        {/* { user_rights && user_rights['28']?.view_rights === '1' &&  */}
        <li>
          <a className="bar-icons" href={`${url}/order-entry`}>
            <i className="pe-7s-diamond"></i>
            <span>Orders</span>
          </a>
          {pathname !== "/order-entry" &&
          pathname !== "/order-entry/form" &&
          !pathname.startsWith("/order-entry/form/") ? (
            <ul className="iconbar-mainmenu custom-scrollbar">
              <li className="iconbar-header">Orders</li>
              <li>
                <Link
                  className="menu_link"
                  to={`/order-entry/${order_id}/order-entry`}
                  data-active_urls={JSON.stringify([`${url}/order-entry`])}
                >
                  Orders Entry
                </Link>
              </li>

              <li>
                <Link to={`/order-entry/${order_id}/order-summary`}>
                  Order Summary
                </Link>
              </li>
              <li>
                <Link to={`/order-entry/${order_id}/orders-tasks`}>Tasks</Link>
              </li>
              <li>
                <Link to={`/order-entry/${order_id}/orders-documents`}>
                  Documents
                </Link>
              </li>
              <li>
                <Link to={`/order-entry/${order_id}/file-history`}>
                  File History
                </Link>
              </li>
              <li>
                <Link to={`/order-entry/${order_id}/note-creation`}>Note</Link>
              </li>
              <li>
                <Link to={`/order-entry/${order_id}/email-creation`}>
                  Email
                </Link>
              </li>
              <li>
                <Link
                  className="menu_link"
                  to={`${url}/order-entry/${order_id}/orders-invoice`}
                  data-active_urls={JSON.stringify([
                    `${url}/order-entry/${order_id}/orders-invoice`,
                  ])}
                >
                  Invoice
                </Link>
              </li>
            </ul>
          ) : null}
        </li>
        <li>
          <a className="bar-icons" href={`${url}/tasks-list`}>
            <i className="pe-7s-diamond"></i>
            <span>Tasks</span>
          </a>
        </li>
        <li>
          <a className="bar-icons" href={`${url}/orders-report`}>
            <i className="pe-7s-id"></i>
            <span>Reports</span>
          </a>
          <ul className="iconbar-mainmenu custom-scrollbar">
            <li className="iconbar-header">Orders Report</li>
            <li>
              <Link
                to={`${url}/orders-report`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/orders-report`])}
              >
                Orders Report
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/tasks-report`}
                className="menu_link"
                data-active_urls={JSON.stringify([`${url}/tasks-report`])}
              >
                Tasks Report
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a className="bar-icons" href="javascript:void(0)">
            <i className="pe-7s-graph3"></i>
            <span>Accounts</span>
          </a>
          <ul className="iconbar-mainmenu custom-scrollbar">
            <li className="iconbar-header">Coming Soon...</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
