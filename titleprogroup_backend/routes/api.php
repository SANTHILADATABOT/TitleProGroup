<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// IOT Project Demo
use App\Http\Controllers\IOT\AlsController;

// Admin
// User Sign in
use App\Http\Controllers\Auth\SigninController;

// Document
use App\Http\Controllers\Document\DocumentViewController;

// User Type Creation
use App\Http\Controllers\Admin\UserTypeCreationController;

// User Creation
use App\Http\Controllers\Admin\UserCreationController;

// User Screen
use App\Http\Controllers\Admin\UserScreenCreationController;

// User Permission
use App\Http\Controllers\Admin\UserPermissionCreationController;

// User Logs
use App\Http\Controllers\Admin\UserLogsController;

// Master
// Company Creation
use App\Http\Controllers\Master\CompanyCreationController;

// County Creation
use App\Http\Controllers\Master\CountyCreationController;

// State Creation
use App\Http\Controllers\Master\StateCreationController;

// Account Year Creation
use App\Http\Controllers\Master\AccountYearCreationController;

// Department Creation
use App\Http\Controllers\Master\DepartmentCreationController;

// Staff Category Creation
use App\Http\Controllers\Master\StaffCategoryCreationController;

// Staff Creation
use App\Http\Controllers\Master\StaffCreationController;

// Contact Creation
use App\Http\Controllers\Master\ContactCreationController;

// Expense Creation
use App\Http\Controllers\Master\ExpenseTypeCreationController;

// Tax Creation
use App\Http\Controllers\Master\TaxCreationController;

// Data Source Creation
use App\Http\Controllers\Master\DataSourceCreationController;

// Transaction Type Creation
use App\Http\Controllers\Master\TransactionTypeCreationController;

// Assign Type Creation
use App\Http\Controllers\Master\AssignTypeCreationController;

// Task Type Creation
use App\Http\Controllers\Master\TaskTypeCreationController;

// Work Flow Group Creation
use App\Http\Controllers\Master\WorkFlowGroupCreationController;

// Work Flow Creation
use App\Http\Controllers\Master\WorkFlowCreationController;

// Task Creation
use App\Http\Controllers\Master\TaskCreationController;

// Contact Type Creation
use App\Http\Controllers\Master\ContactTypeCreationController;

// Customer Fees Creation
use App\Http\Controllers\Master\CustomerFeesCreationController;

// Customer Fees Creation
use App\Http\Controllers\Master\EmailTemplateCreationController;

// Payee Creation
use App\Http\Controllers\Master\PayeeCreationController;

// Order Entry
use App\Http\Controllers\Orders\OrderEntryController;

// Orders
// Orders Tab
use App\Http\Controllers\Orders\OrdersTabController;

// Orders Summary
use App\Http\Controllers\Orders\OrdersSummaryController;

// Orders Task
use App\Http\Controllers\Orders\OrdersTaskController;

// Orders Invoice
use App\Http\Controllers\Orders\OrdersInvoiceController;

// Orders Note
use App\Http\Controllers\Orders\OrdersNoteController;

// Orders Email
use App\Http\Controllers\Orders\OrdersEmailController;

// Orders Note
use App\Http\Controllers\Orders\OrdersFileHistoryController;

// Tasks
// Tasks List
use App\Http\Controllers\Tasks\TasksListController;

// Reports
// Orders Reports
use App\Http\Controllers\Reports\OrdersReportController;

// Tasks Reports
use App\Http\Controllers\Reports\TasksReportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
date_default_timezone_set("Asia/Calcutta");

// IOT Project Demo
Route::post('/als_view', [AlsController::class, 'als_view']);

// Admin
// User Signin
Route::post('/user_sign_in_check', [SigninController::class, 'user_sign_in_check']);

// Get User Rights
Route::post('/get_user_rights', [UserPermissionCreationController::class, 'get_user_rights']);
Route::post('/get_user_screen_rights', [UserPermissionCreationController::class, 'get_user_screen_rights']);

// Document
Route::post('/document_view_index', [DocumentViewController::class, 'document_view_index']);
Route::post('/document_view_logs', [DocumentViewController::class, 'document_view_logs']);
Route::post('/document_view_insert_file', [DocumentViewController::class, 'document_view_insert_file']);
Route::post('/document_view_insert_folder', [DocumentViewController::class, 'document_view_insert_folder']);
Route::post('/document_view_rename', [DocumentViewController::class, 'document_view_rename']);
Route::post('/document_view_get_count', [DocumentViewController::class, 'document_view_get_count']);
Route::post('/document_view_delete', [DocumentViewController::class, 'document_view_delete']);

// User Type Creation
Route::post('/user_type_creation_index', [UserTypeCreationController::class, 'user_type_creation_index']);
Route::post('/user_type_creation_insert', [UserTypeCreationController::class, 'user_type_creation_insert']);
Route::post('/user_type_creation_edit', [UserTypeCreationController::class, 'user_type_creation_edit']);
Route::post('/user_type_creation_update', [UserTypeCreationController::class, 'user_type_creation_update']);
Route::post('/user_type_creation_delete', [UserTypeCreationController::class, 'user_type_creation_delete']);

// User Creation
Route::post('/user_creation_index', [UserCreationController::class, 'user_creation_index']);
Route::post('/user_creation_create', [UserCreationController::class, 'user_creation_create']);
Route::post('/user_creation_insert', [UserCreationController::class, 'user_creation_insert']);
Route::post('/user_creation_edit', [UserCreationController::class, 'user_creation_edit']);
Route::post('/user_creation_update', [UserCreationController::class, 'user_creation_update']);
Route::post('/user_creation_delete', [UserCreationController::class, 'user_creation_delete']);

// User Screen
Route::post('/user_screen_creation_index', [UserScreenCreationController::class, 'user_screen_creation_index']);
Route::post('/user_screen_creation_create', [UserScreenCreationController::class, 'user_screen_creation_create']);
Route::post('/user_screen_creation_insert', [UserScreenCreationController::class, 'user_screen_creation_insert']);
Route::post('/user_screen_creation_edit', [UserScreenCreationController::class, 'user_screen_creation_edit']);
Route::post('/user_screen_creation_update', [UserScreenCreationController::class, 'user_screen_creation_update']);
Route::post('/user_screen_creation_delete', [UserScreenCreationController::class, 'user_screen_creation_delete']);

// User Permission
Route::post('/user_permission_get_user_type', [UserPermissionCreationController::class, 'user_permission_get_user_type']);
Route::post('/user_permission_creation_index', [UserPermissionCreationController::class, 'user_permission_creation_index']);
Route::post('/user_permission_creation_update', [UserPermissionCreationController::class, 'user_permission_creation_update']);

// User Logs
Route::post('/user_logs_index', [UserLogsController::class, 'user_logs_index']);

// Master
// Company Creation
Route::post('/company_creation_index', [CompanyCreationController::class, 'company_creation_index']);
Route::post('/company_creation_insert', [CompanyCreationController::class, 'company_creation_insert']);
Route::post('/company_creation_edit', [CompanyCreationController::class, 'company_creation_edit']);
Route::post('/company_creation_update', [CompanyCreationController::class, 'company_creation_update']);
Route::post('/company_creation_delete', [CompanyCreationController::class, 'company_creation_delete']);

// County Creation
Route::post('/county_creation_index', [CountyCreationController::class, 'county_creation_index']);
Route::post('/county_creation_create', [CountyCreationController::class, 'county_creation_create']);
Route::post('/county_creation_insert', [CountyCreationController::class, 'county_creation_insert']);
Route::post('/county_creation_edit', [CountyCreationController::class, 'county_creation_edit']);
Route::post('/county_creation_update', [CountyCreationController::class, 'county_creation_update']);
Route::post('/county_creation_delete', [CountyCreationController::class, 'county_creation_delete']);
Route::post('/county_creation_state_dependency', [CountyCreationController::class, 'county_creation_state_dependency']);
Route::post('/county_creation_county_dependency', [CountyCreationController::class, 'county_creation_county_dependency']);
Route::post('/county_creation_import_excel', [CountyCreationController::class, 'county_creation_import_excel']);

// State Creation
Route::post('/state_creation_index', [StateCreationController::class, 'state_creation_index']);
Route::post('/state_creation_create', [StateCreationController::class, 'state_creation_create']);
Route::post('/state_creation_insert', [StateCreationController::class, 'state_creation_insert']);
Route::post('/state_creation_edit', [StateCreationController::class, 'state_creation_edit']);
Route::post('/state_creation_update', [StateCreationController::class, 'state_creation_update']);
Route::post('/state_creation_delete', [StateCreationController::class, 'state_creation_delete']);
Route::post('/state_creation_state_dependency', [StateCreationController::class, 'state_creation_state_dependency']);

// Account Year Creation
Route::post('/account_year_creation_index', [AccountYearCreationController::class, 'account_year_creation_index']);
Route::post('/account_year_creation_insert', [AccountYearCreationController::class, 'account_year_creation_insert']);
Route::post('/account_year_creation_edit', [AccountYearCreationController::class, 'account_year_creation_edit']);
Route::post('/account_year_creation_update', [AccountYearCreationController::class, 'account_year_creation_update']);
Route::post('/account_year_creation_delete', [AccountYearCreationController::class, 'account_year_creation_delete']);

// Department Creation
Route::post('/department_creation_index', [DepartmentCreationController::class, 'department_creation_index']);
Route::post('/department_creation_insert', [DepartmentCreationController::class, 'department_creation_insert']);
Route::post('/department_creation_edit', [DepartmentCreationController::class, 'department_creation_edit']);
Route::post('/department_creation_update', [DepartmentCreationController::class, 'department_creation_update']);
Route::post('/department_creation_delete', [DepartmentCreationController::class, 'department_creation_delete']);

// Payee Creation
Route::post('/payee_creation_index', [PayeeCreationController::class, 'payee_creation_index']);
Route::post('/payee_creation_insert', [PayeeCreationController::class, 'payee_creation_insert']);
Route::post('/payee_creation_edit', [PayeeCreationController::class, 'payee_creation_edit']);
Route::post('/payee_creation_update', [PayeeCreationController::class, 'payee_creation_update']);
Route::post('/payee_creation_delete', [PayeeCreationController::class, 'payee_creation_delete']);

// Staff Category Creation
Route::post('/staff_category_creation_index', [StaffCategoryCreationController::class, 'staff_category_creation_index']);
Route::post('/staff_category_creation_insert', [StaffCategoryCreationController::class, 'staff_category_creation_insert']);
Route::post('/staff_category_creation_edit', [StaffCategoryCreationController::class, 'staff_category_creation_edit']);
Route::post('/staff_category_creation_update', [StaffCategoryCreationController::class, 'staff_category_creation_update']);
Route::post('/staff_category_creation_delete', [StaffCategoryCreationController::class, 'staff_category_creation_delete']);

// Staff Creation
Route::post('/staff_creation_index', [StaffCreationController::class, 'staff_creation_index']);
Route::post('/staff_creation_create', [StaffCreationController::class, 'staff_creation_create']);
Route::post('/staff_creation_insert', [StaffCreationController::class, 'staff_creation_insert']);
Route::post('/staff_creation_edit', [StaffCreationController::class, 'staff_creation_edit']);
Route::post('/staff_creation_update', [StaffCreationController::class, 'staff_creation_update']);
Route::post('/staff_creation_delete', [StaffCreationController::class, 'staff_creation_delete']);
Route::post('/staff_creation_creation_state_dependency', [StaffCreationController::class, 'staff_creation_creation_state_dependency']);

// Contact Creation
Route::post('/contact_creation_index', [ContactCreationController::class, 'contact_creation_index']);
Route::post('/contact_creation_create', [ContactCreationController::class, 'contact_creation_create']);
Route::post('/contact_creation_insert', [ContactCreationController::class, 'contact_creation_insert']);
Route::post('/contact_creation_edit', [ContactCreationController::class, 'contact_creation_edit']);
Route::post('/contact_creation_update', [ContactCreationController::class, 'contact_creation_update']);
Route::post('/contact_creation_delete', [ContactCreationController::class, 'contact_creation_delete']);
Route::post('/contact_creation_creation_state_dependency', [ContactCreationController::class, 'contact_creation_creation_state_dependency']);
Route::post('/contact_creation_import_excel', [ContactCreationController::class, 'contact_creation_import_excel']);

// Expense Type Creation
Route::post('/expense_type_creation_index', [ExpenseTypeCreationController::class, 'expense_type_creation_index']);
Route::post('/expense_type_creation_insert', [ExpenseTypeCreationController::class, 'expense_type_creation_insert']);
Route::post('/expense_type_creation_edit', [ExpenseTypeCreationController::class, 'expense_type_creation_edit']);
Route::post('/expense_type_creation_update', [ExpenseTypeCreationController::class, 'expense_type_creation_update']);
Route::post('/expense_type_creation_delete', [ExpenseTypeCreationController::class, 'expense_type_creation_delete']);

// Tax Creation
Route::post('/tax_creation_index', [TaxCreationController::class, 'tax_creation_index']);
Route::post('/tax_creation_insert', [TaxCreationController::class, 'tax_creation_insert']);
Route::post('/tax_creation_edit', [TaxCreationController::class, 'tax_creation_edit']);
Route::post('/tax_creation_update', [TaxCreationController::class, 'tax_creation_update']);
Route::post('/tax_creation_delete', [TaxCreationController::class, 'tax_creation_delete']);

// Data Source Creation
Route::post('/data_source_creation_index', [DataSourceCreationController::class, 'data_source_creation_index']);
Route::post('/data_source_creation_create', [DataSourceCreationController::class, 'data_source_creation_create']);
Route::post('/data_source_creation_insert', [DataSourceCreationController::class, 'data_source_creation_insert']);
Route::post('/data_source_creation_edit', [DataSourceCreationController::class, 'data_source_creation_edit']);
Route::post('/data_source_creation_update', [DataSourceCreationController::class, 'data_source_creation_update']);
Route::post('/data_source_creation_delete', [DataSourceCreationController::class, 'data_source_creation_delete']);
Route::post('/data_source_creation_state_dependency', [DataSourceCreationController::class, 'data_source_creation_state_dependency']);
Route::post('/data_source_creation_import_excel', [DataSourceCreationController::class, 'data_source_creation_import_excel']);

// Transaction Type Creation
Route::post('/transaction_type_creation_index', [TransactionTypeCreationController::class, 'transaction_type_creation_index']);
Route::post('/transaction_type_creation_insert', [TransactionTypeCreationController::class, 'transaction_type_creation_insert']);
Route::post('/transaction_type_creation_edit', [TransactionTypeCreationController::class, 'transaction_type_creation_edit']);
Route::post('/transaction_type_creation_update', [TransactionTypeCreationController::class, 'transaction_type_creation_update']);
Route::post('/transaction_type_creation_delete', [TransactionTypeCreationController::class, 'transaction_type_creation_delete']);

// Assign Type Creation
Route::post('/assign_type_creation_index', [AssignTypeCreationController::class, 'assign_type_creation_index']);
Route::post('/assign_type_creation_insert', [AssignTypeCreationController::class, 'assign_type_creation_insert']);
Route::post('/assign_type_creation_edit', [AssignTypeCreationController::class, 'assign_type_creation_edit']);
Route::post('/assign_type_creation_update', [AssignTypeCreationController::class, 'assign_type_creation_update']);
Route::post('/assign_type_creation_delete', [AssignTypeCreationController::class, 'assign_type_creation_delete']);
Route::post('/assign_type_creation_assign_type_dependency', [AssignTypeCreationController::class, 'assign_type_creation_assign_type_dependency']);

// Task Type Creation
Route::post('/task_type_creation_index', [TaskTypeCreationController::class, 'task_type_creation_index']);
Route::post('/task_type_creation_insert', [TaskTypeCreationController::class, 'task_type_creation_insert']);
Route::post('/task_type_creation_edit', [TaskTypeCreationController::class, 'task_type_creation_edit']);
Route::post('/task_type_creation_update', [TaskTypeCreationController::class, 'task_type_creation_update']);
Route::post('/task_type_creation_delete', [TaskTypeCreationController::class, 'task_type_creation_delete']);

// Work Flow Group Creation
Route::post('/work_flow_group_creation_index', [WorkFlowGroupCreationController::class, 'work_flow_group_creation_index']);
Route::post('/work_flow_group_creation_insert', [WorkFlowGroupCreationController::class, 'work_flow_group_creation_insert']);
Route::post('/work_flow_group_creation_edit', [WorkFlowGroupCreationController::class, 'work_flow_group_creation_edit']);
Route::post('/work_flow_group_creation_update', [WorkFlowGroupCreationController::class, 'work_flow_group_creation_update']);
Route::post('/work_flow_group_creation_delete', [WorkFlowGroupCreationController::class, 'work_flow_group_creation_delete']);
Route::post('/work_flow_group_creation_import_excel', [WorkFlowGroupCreationController::class, 'work_flow_group_creation_import_excel']);

// Work Flow Creation
Route::post('/work_flow_creation_index', [WorkFlowCreationController::class, 'work_flow_creation_index']);
Route::post('/work_flow_creation_create', [WorkFlowCreationController::class, 'work_flow_creation_create']);
Route::post('/work_flow_creation_insert', [WorkFlowCreationController::class, 'work_flow_creation_insert']);
Route::post('/work_flow_creation_edit', [WorkFlowCreationController::class, 'work_flow_creation_edit']);
Route::post('/work_flow_creation_update', [WorkFlowCreationController::class, 'work_flow_creation_update']);
Route::post('/work_flow_creation_delete', [WorkFlowCreationController::class, 'work_flow_creation_delete']);

// Task Creation
Route::post('/task_creation_index', [TaskCreationController::class, 'task_creation_index']);
Route::post('/task_creation_create', [TaskCreationController::class, 'task_creation_create']);
Route::post('/task_creation_insert', [TaskCreationController::class, 'task_creation_insert']);
Route::post('/task_creation_edit', [TaskCreationController::class, 'task_creation_edit']);
Route::post('/task_creation_update', [TaskCreationController::class, 'task_creation_update']);
Route::post('/task_creation_delete', [TaskCreationController::class, 'task_creation_delete']);

// Contact Type Creation
Route::post('/contact_type_creation_index', [ContactTypeCreationController::class, 'contact_type_creation_index']);
Route::post('/contact_type_creation_insert', [ContactTypeCreationController::class, 'contact_type_creation_insert']);
Route::post('/contact_type_creation_edit', [ContactTypeCreationController::class, 'contact_type_creation_edit']);
Route::post('/contact_type_creation_update', [ContactTypeCreationController::class, 'contact_type_creation_update']);
Route::post('/contact_type_creation_delete', [ContactTypeCreationController::class, 'contact_type_creation_delete']);

// Customer Fees Creation
Route::post('/customer_fees_creation_index', [CustomerFeesCreationController::class, 'customer_fees_creation_index']);
Route::post('/customer_fees_creation_create', [CustomerFeesCreationController::class, 'customer_fees_creation_create']);
Route::post('/customer_fees_creation_insert', [CustomerFeesCreationController::class, 'customer_fees_creation_insert']);
Route::post('/customer_fees_sublist_insert', [CustomerFeesCreationController::class, 'customer_fees_sublist_insert']);
Route::post('/customer_fees_creation_edit', [CustomerFeesCreationController::class, 'customer_fees_creation_edit']);
Route::post('/customer_fees_sublist_edit', [CustomerFeesCreationController::class, 'customer_fees_sublist_edit']);
Route::post('/customer_fees_creation_update', [CustomerFeesCreationController::class, 'customer_fees_creation_update']);
Route::post('/customer_fees_sublist_update', [CustomerFeesCreationController::class, 'customer_fees_sublist_update']);
Route::post('/customer_fees_creation_delete', [CustomerFeesCreationController::class, 'customer_fees_creation_delete']);
Route::post('/customer_fees_sublist_delete', [CustomerFeesCreationController::class, 'customer_fees_sublist_delete']);
Route::post('/customer_fees_creation_state_dependency', [CustomerFeesCreationController::class, 'customer_fees_creation_state_dependency']);

// Email Template Creation
Route::post('/email_template_creation_index', [EmailTemplateCreationController::class, 'email_template_creation_index']);
Route::post('/email_template_creation_insert', [EmailTemplateCreationController::class, 'email_template_creation_insert']);
Route::post('/email_template_creation_edit', [EmailTemplateCreationController::class, 'email_template_creation_edit']);
Route::post('/email_template_creation_update', [EmailTemplateCreationController::class, 'email_template_creation_update']);
Route::post('/email_template_creation_delete', [EmailTemplateCreationController::class, 'email_template_creation_delete']);

// Order Entry
Route::post('/order_entry_index', [OrderEntryController::class, 'order_entry_index']);
Route::post('/order_entry_create', [OrderEntryController::class, 'order_entry_create']);
Route::post('/order_entry_insert', [OrderEntryController::class, 'order_entry_insert']);
Route::post('/order_entry_edit', [OrderEntryController::class, 'order_entry_edit']);
Route::post('/order_entry_update', [OrderEntryController::class, 'order_entry_update']);
Route::post('/order_entry_delete', [OrderEntryController::class, 'order_entry_delete']);
Route::post('/order_entry_state_dependency', [OrderEntryController::class, 'order_entry_state_dependency']);
Route::post('/order_entry_borrower_or_seller_index', [OrderEntryController::class, 'order_entry_borrower_or_seller_index']);
Route::post('/order_entry_borrower_or_seller_insert', [OrderEntryController::class, 'order_entry_borrower_or_seller_insert']);
Route::post('/order_entry_borrower_or_seller_edit', [OrderEntryController::class, 'order_entry_borrower_or_seller_edit']);
Route::post('/order_entry_borrower_or_seller_update', [OrderEntryController::class, 'order_entry_borrower_or_seller_update']);
Route::post('/order_entry_borrower_or_seller_delete', [OrderEntryController::class, 'order_entry_borrower_or_seller_delete']);

// Orders
// Orders Tab
Route::post('/orders_tab_index', [OrdersTabController::class, 'orders_tab_index']);
Route::post('/orders_tab_update', [OrdersTabController::class, 'orders_tab_update']);
Route::post('/orders_tab_delete', [OrdersTabController::class, 'orders_tab_delete']);

// Orders Task
Route::post('/orders_task_index', [OrdersTaskController::class, 'orders_task_index']);
Route::post('/orders_task_work_flow_group_create', [OrdersTaskController::class, 'orders_task_work_flow_group_create']);
Route::post('/orders_task_new_task_create', [OrdersTaskController::class, 'orders_task_new_task_create']);
Route::post('/orders_task_start_timer', [OrdersTaskController::class, 'orders_task_start_timer']);
Route::post('/orders_task_pause_timer', [OrdersTaskController::class, 'orders_task_pause_timer']);
Route::post('/orders_task_stop_timer', [OrdersTaskController::class, 'orders_task_stop_timer']);

// Orders Summary
Route::post('/orders_summary_index', [OrdersSummaryController::class, 'orders_summary_index']);
Route::post('/orders_summary_borrower_or_seller_index', [OrdersSummaryController::class, 'orders_summary_borrower_or_seller_index']);

// Orders Invoice
Route::post('/orders_invoice_index', [OrdersInvoiceController::class, 'orders_invoice_index']);
Route::post('/orders_invoice_print', [OrdersInvoiceController::class, 'orders_invoice_print']);

// Orders Note
Route::post('/orders_note_index', [OrdersNoteController::class, 'orders_note_index']);
Route::post('/orders_note_create', [OrdersNoteController::class, 'orders_note_create']);
Route::post('/orders_note_insert', [OrdersNoteController::class, 'orders_note_insert']);
Route::post('/orders_note_edit', [OrdersNoteController::class, 'orders_note_edit']);
Route::post('/orders_note_update', [OrdersNoteController::class, 'orders_note_update']);
Route::post('/orders_note_delete', [OrdersNoteController::class, 'orders_note_delete']);

// Orders Task
Route::post('/order_email_index', [OrdersEmailController::class, 'order_email_index']);
Route::post('/order_email_create', [OrdersEmailController::class, 'order_email_create']);
Route::post('/order_email_insert', [OrdersEmailController::class, 'order_email_insert']);
Route::post('/order_email_view', [OrdersEmailController::class, 'order_email_view']);

// Orders File History
Route::post('/orders_file_history_index', [OrdersFileHistoryController::class, 'orders_file_history_index']);

// Tasks
// Tasks List
Route::post('/tasks_list_index', [TasksListController::class, 'tasks_list_index']);

// Reports
// Orders Report
Route::post('/orders_report_index', [OrdersReportController::class, 'orders_report_index']);

// Tasks Report
Route::post('/tasks_report_index', [TasksReportController::class, 'tasks_report_index']);
