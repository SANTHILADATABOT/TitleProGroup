import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Layouts
import AuthPage from "../layouts/AuthPage";
import AdminPanel from "../layouts/AdminPanel";

// Home
import Dashboard from "../src/pages/dashboard";

// Admin
import UserTypeCreation from "../src/pages/administration/user_type";
import UserCreation from "../src/pages/administration/user_creation";
import UserScreen from "../src/pages/administration/user_screen";
import UserPermission from "../src/pages/administration/user_permission";
import UserLogs from "../src/pages/administration/user_logs";

//Contacts
import ContactCreation from "../src/pages/master/contact_creation";
import StaffCreation from "../src/pages/master/staff_creation";
import ContactTypeCreation from "../src/pages/master/contact_type_creation";
import CustomerFeesCreation from "../src/pages/master/customer_fees_creation";
import CustomerFeesForm from "../src/pages/master/customer_fees_creation/customer_fees_form";

//Masters
import CompanyCreation from "../src/pages/master/company_creation";
import AccountYearCreation from "../src/pages/master/account_year_creation";
import StateCreation from "../src/pages/master/state_creation";
import CountyCreation from "../src/pages/master/county_creation";
import StaffCategoryCreation from "../src/pages/master/staff_category_creation";
import DataSourceCreation from "../src/pages/master/data_source_creation";
import DepartmentCreation from "../src/pages/master/department_creation";
import ExpenseTypeCreation from "../src/pages/master/expense_type_creation";
// import TaxCreation from "../src/pages/master/tax_creation";
import AssignTypeCreation from "../src/pages/master/assign_type_creation";
import TaskTypeCreation from "../src/pages/master/task_type_creation";
import TransactionTypeCreation from "../src/pages/master/transaction_type_creation";
import PayeeCreation from "../src/pages/master/payee_creation";
import WorkFlowGroupCreation from "../src/pages/master/work_flow_group_creation";
import WorkFlowCreation from "../src/pages/master/work_flow_creation";
import TaskCreation from "../src/pages/master/task_creation";
import EmailTemplateCreation from "../src/pages/master/email_template_creation";

// Orders
import OrderList from "../src/pages/orders_entry/index";
import OrderCreation from "../src/pages/orders_entry/ordersEntry";
import Document from "../src/pages/orders/document";
import OrderListForm from "../src/pages/orders/ordersSummary/index";
import DataAccesForm from "../src/pages/orders/dataAccess/index";
import FileHistory from "../src/pages/orders/fileHistory";
import OrdersTask from "../src/pages/orders/orders_task/index";
import EmailCreation from "../src/pages/orders/email_creation/index";
import NoteCreation from "../src/pages/orders/Latest_note/index";
import OrdersInvoice from "../src/pages/orders/orders_invoice";
import OrdersInvoiceForm from "../src/pages/orders/orders_invoice/orders_invoice_form";

// Tasks
import TasksList from "../src/pages/tasks/tasks_list";

// Reports
import OrdersReport from "../src/pages/reports/orders_report";
import TasksReport from "../src/pages/reports/tasks_report";

// ProtectedRoute
import { ProtectedRoute } from "../ProtectedRoutes";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/AuthSlice";
import { useAuth } from "../utils/auth/authContext";
import { PropagateLoader } from "react-spinners";
import OrderEntry from "../src/pages/orders/ordersEntry/ordersEntry";

const Web = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { logoutAuth } = useAuth();

  const handleOnIdle = () => {
    dispatch(logout());
    logoutAuth();
  };
  const { getRemainingTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    debounce: 500,
  });
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#b2b2b96b",
        }}
      >
        <PropagateLoader color="#4c85a9" />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/*" element={<AuthPage page="Sign In Page" />} />
      <Route path="/" element={<AuthPage page="Sign In Page" />} />
      {/* Pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute unique={19}>
            <AdminPanel page={<Dashboard />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-type"
        element={
          <ProtectedRoute unique={20}>
            <AdminPanel page={<UserTypeCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-creation"
        element={
          <ProtectedRoute unique={20}>
            <AdminPanel page={<UserCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-screen"
        element={
          <ProtectedRoute unique={20}>
            <AdminPanel page={<UserScreen />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-permissions"
        element={
          <ProtectedRoute unique={20}>
            <AdminPanel page={<UserPermission />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-logs"
        element={
          <ProtectedRoute unique={20}>
            <AdminPanel page={<UserLogs />} />
          </ProtectedRoute>
        }
      />
      {/* Master Routes */}
      <Route
        path="/company-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<CompanyCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account-year-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<AccountYearCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/state-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<StateCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/county-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<CountyCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff-category-creation"
        element={
          <ProtectedRoute>
            <AdminPanel page={<StaffCategoryCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/data-source-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<DataSourceCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/department-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<DepartmentCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expense-type-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<ExpenseTypeCreation />} />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/tax-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<TaxCreation />} />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/assign-type-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<AssignTypeCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-type-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<TaskTypeCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction-type-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<TransactionTypeCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/work-flow-group-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<WorkFlowGroupCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/work-flow-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<WorkFlowCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/work-flow-creation/:work_flow_group_id"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<WorkFlowCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<TaskCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact-creation"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<ContactCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff-creation"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<StaffCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact-type-creation"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<ContactTypeCreation />} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer-fees-creation"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<CustomerFeesCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-fees-creation/form"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<CustomerFeesForm />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-fees-creation/form/:id"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<CustomerFeesForm />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/email-template-creation"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<EmailTemplateCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrderList />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/form"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrderCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/form/:order_id"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrderCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/order-summary"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrderListForm />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/data-access"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<DataAccesForm />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/file-history"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<FileHistory />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/orders-tasks"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrdersTask />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/order-entry"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrderEntry />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/email-creation"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<EmailCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/note-creation"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<NoteCreation />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/orders-invoice"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrdersInvoice />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/orders-invoice/form"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrdersInvoiceForm />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/orders-invoice/form/:orders_invoice_mainlist_id"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<OrdersInvoiceForm />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-entry/:order_id/orders-documents"
        element={
          <ProtectedRoute unique={28}>
            <AdminPanel page={<Document />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks-list"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<TasksList />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders-report"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<OrdersReport />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks-report"
        element={
          <ProtectedRoute unique={25}>
            <AdminPanel page={<TasksReport />} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payee-creation"
        element={
          <ProtectedRoute unique={21}>
            <AdminPanel page={<PayeeCreation/>} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Web;
