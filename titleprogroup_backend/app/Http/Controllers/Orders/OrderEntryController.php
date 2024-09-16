<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Master\CountyCreation;
use App\Models\Master\StateCreation;
use App\Models\Master\WorkFlowGroupCreation;
use App\Models\Master\TransactionTypeCreation;
use App\Models\Master\DataSourceCreation;
use App\Models\Master\ContactCreation;
use App\Models\Orders\OrderEntry;
use App\Models\Orders\OrderEntryBorrowerOrSeller;
use App\Models\Orders\OrdersFileHistory;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrderEntryController extends Controller
{
    public function order_entry_index(Request $request)
    {
        $order_entry_table = (new OrderEntry)->getTable();
        $state_table = (new StateCreation)->getTable();
        $county_table = (new CountyCreation)->getTable();
        $transaction_type_table = (new TransactionTypeCreation)->getTable();
        $work_flow_group_table = (new WorkFlowGroupCreation)->getTable();
        $data_source_table = (new DataSourceCreation)->getTable();

        $order_entry_index = OrderEntry::selectRaw('
                id as order_id,
                entry_date,
                order_number,
                contact_id,
                open_date,
                close_date,
                due_date,
                arrival_date,
                delivery_date,
                active_workflow,
                assigned_to,
                street_address,
                unit,
                city_name,
                state_id,
                (SELECT state_name FROM ' . $state_table . ' WHERE id = ' . $order_entry_table . '.state_id) as state_name,
                county_id,
                (SELECT county_name FROM ' . $county_table . ' WHERE id = ' . $order_entry_table . '.county_id) as county_name,
                zipcode,
                parcel_id,
                sub_division,
                block,
                lot,
                section,
                land_value,
                improvement_value,
                total_assessed_value,
                product_type,
                transaction_type_id,
                (SELECT transaction_type_name FROM ' . $transaction_type_table . ' WHERE id = ' . $order_entry_table . '.transaction_type_id) as transaction_type_name,
                work_flow_group_id,
                (SELECT work_flow_group_name FROM ' . $work_flow_group_table . ' WHERE id = ' . $order_entry_table . '.work_flow_group_id) as work_flow_group_name,
                property_type,
                data_source_id,
                (SELECT data_source_name FROM ' . $data_source_table . ' WHERE id = ' . $order_entry_table . '.data_source_id) as data_source_name,
                add_in_product,
                customer_name,
                customer_address,
                customer_branch_code,
                lender_name,
                lender_address,
                lender_branch_code,
                file,
                loan,
                sales_price,
                loan_type,
                loan_date,
                loan_amount,
                description,
                status
            ')
            ->where('delete_status', 'no')
            ->orderBy('id', 'DESC')
            ->get();


        // $order_entry_index = DB::select(
        //     'SELECT id as order_id, entry_date, order_number, contact_id, open_date, close_date, due_date, arrival_date, delivery_date, active_workflow, assigned_to, street_address, unit, city_name, state_id,
        //     (SELECT state_name FROM ' . $state_table . ' WHERE id = ' . $order_entry_table . '.state_id) as state_name,
        //     county_id,
        //     (SELECT county_name FROM ' . $county_table . ' WHERE id = ' . $order_entry_table . '.county_id) as county_name,
        //     zipcode, parcel_id, sub_division, block, lot, section, land_value, improvement_value, total_assessed_value, product_type, transaction_type_id,
        //     (SELECT transaction_type_name FROM ' . $transaction_type_table . ' WHERE id = ' . $order_entry_table . '.transaction_type_id) as transaction_type_name,
        //     work_flow_group_id,
        //     (SELECT work_flow_group_name FROM ' . $work_flow_group_table . ' WHERE id = ' . $order_entry_table . '.work_flow_group_id) as work_flow_group_name,
        //     property_type, data_source_id,
        //     (SELECT data_source_name FROM ' . $data_source_table . ' WHERE id = ' . $order_entry_table . '.data_source_id) as data_source_name,
        //     add_in_product, customer_name, customer_address, customer_branch_code, lender_name, lender_address, lender_branch_code, file, loan, sales_price, loan_type, loan_date, loan_amount, description, status
        //     FROM ' . $order_entry_table . '
        //     WHERE delete_status = \'no\'
        //     ORDER BY id DESC'
        // );

        // $order_entry_index = OrderEntry::select('id as order_id', 'entry_date', 'order_number', 'contact_id', 'open_date', 'close_date', 'due_date', 'arrival_date', 'delivery_date', 'active_workflow', 'assigned_to', 'street_address', 'unit', 'city_name', 'state_id', 'county_id', 'zipcode', 'parcel_id', 'sub_division', 'block', 'lot', 'section', 'land_value', 'improvement_value', 'total_assessed_value', 'product_type', 'transaction_type_id', 'work_flow_group_id', 'data_source_id', 'property_type', 'data_source_id', 'add_in_product', 'customer_name', 'customer_address', 'customer_branch_code', 'lender_name', 'lender_address', 'lender_branch_code', 'file', 'loan', 'sales_price', 'loan_type', 'loan_date', 'loan_amount', 'description', 'status')
        //     ->where('delete_status', 'no')
        //     ->orderBy('id', 'desc')
        //     ->get();

        if ($order_entry_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'order_entry_index' => $order_entry_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function order_entry_create(Request $request)
    {
        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
        ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();

        $contact_creation = ContactCreation::select('id as contact_id', 'contact_name')
            ->where('delete_status', 'no')
            ->get();

        $work_flow_group_creation = WorkFlowGroupCreation::select('id as work_flow_group_id', 'work_flow_group_name')
            ->where('delete_status', 'no')
            ->get();

        $transaction_type_creation = TransactionTypeCreation::select('id as transaction_type_id', 'transaction_type_name')
            ->where('delete_status', 'no')
            ->get();

        $data_source_creation = DataSourceCreation::select('id as data_source_id', 'entry_date', 'data_source_name')
            ->where('delete_status', 'no')
            ->get();

        $table = (new OrderEntry)->getTable();
        $sequence_name = $table . '_id_seq';
        $next_id = DB::select("SELECT nextval('$sequence_name') AS next_id");
        $order_number = "ORDER_" . date("ym") . "_" . $next_id[0]->next_id;

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'contact_creation' => $contact_creation, 'work_flow_group_creation' => $work_flow_group_creation, 'transaction_type_creation' => $transaction_type_creation, 'data_source_creation' => $data_source_creation, 'order_number' => $order_number], 200);
    }

    public function order_entry_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $order_number = $request->input('order_number');
        $order_status = $request->input('order_status');
        $contact_id = $request->input('contact_id');
        $open_date = $request->input('open_date');
        $close_date = $request->input('close_date');
        $due_date = $request->input('due_date');
        $arrival_date = $request->input('arrival_date');
        $delivery_date = $request->input('delivery_date');
        $active_workflow = $request->input('active_workflow');
        $assigned_to = $request->input('assigned_to');
        $street_address = $request->input('street_address');
        $unit = $request->input('unit');
        $city_name = $request->input('city_name');
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');
        $zipcode = $request->input('zipcode');
        $parcel_id = $request->input('parcel_id');
        $sub_division = $request->input('sub_division');
        $block = $request->input('block');
        $lot = $request->input('lot');
        $section = $request->input('section');
        $land_value = $request->input('land_value');
        $improvement_value = $request->input('improvement_value');
        $total_assessed_value = $request->input('total_assessed_value');
        $product_type = $request->input('product_type');
        $transaction_type_id = $request->input('transaction_type_id');
        $work_flow_group_id = $request->input('work_flow_group_id');
        $data_source_id = $request->input('data_source_id');
        $property_type = $request->input('property_type');
        $add_in_product = $request->input('add_in_product');
        $customer_name = $request->input('customer_name');
        $customer_address = $request->input('customer_address');
        $customer_branch_code = $request->input('customer_branch_code');
        $lender_name = $request->input('lender_name');
        $lender_address = $request->input('lender_address');
        $lender_branch_code = $request->input('lender_branch_code');
        $file = $request->input('file');
        $loan = $request->input('loan');
        $sales_price = $request->input('sales_price');
        $loan_type = $request->input('loan_type');
        $loan_date = $request->input('loan_date');
        $loan_amount = $request->input('loan_amount');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new OrderEntry();
        $form_create->entry_date = $entry_date;
        $form_create->order_number = $order_number;
        $form_create->order_status = $order_status;
        $form_create->contact_id = $contact_id;
        $form_create->open_date = $open_date;
        $form_create->close_date = $close_date;
        $form_create->due_date = $due_date;
        $form_create->arrival_date = $arrival_date;
        $form_create->delivery_date = $delivery_date;
        $form_create->active_workflow = $active_workflow;
        $form_create->assigned_to = $assigned_to;
        $form_create->street_address = $street_address;
        $form_create->unit = $unit;
        $form_create->city_name = $city_name;
        $form_create->state_id = $state_id;
        $form_create->county_id = $county_id;
        $form_create->zipcode = $zipcode;
        $form_create->parcel_id = $parcel_id;
        $form_create->sub_division = $sub_division;
        $form_create->block = $block;
        $form_create->lot = $lot;
        $form_create->section = $section;
        $form_create->land_value = $land_value;
        $form_create->improvement_value = $improvement_value;
        $form_create->total_assessed_value = $total_assessed_value;
        $form_create->product_type = $product_type;
        $form_create->transaction_type_id = $transaction_type_id;
        $form_create->work_flow_group_id = $work_flow_group_id;
        $form_create->data_source_id = $data_source_id;
        $form_create->property_type = $property_type;
        $form_create->add_in_product = $add_in_product;
        $form_create->customer_name = $customer_name;
        $form_create->customer_address = $customer_address;
        $form_create->customer_branch_code = $customer_branch_code;
        $form_create->lender_name = $lender_name;
        $form_create->lender_address = $lender_address;
        $form_create->lender_branch_code = $lender_branch_code;
        $form_create->file = $file;
        $form_create->loan = $loan;
        $form_create->sales_price = $sales_price;
        $form_create->loan_type = $loan_type;
        $form_create->loan_date = $loan_date;
        $form_create->loan_amount = $loan_amount;
        $form_create->description = $description;
        $form_create->status = $status;
        $form_create->delete_status = 'no';
        $form_create->created_user_id = $user_id;
        $form_create->created_ipaddress = $ipaddress;

        if ($form_create->save()) {
            $order_id = $form_create->id;
            $entry_date = Carbon::now()->toDateString();
            $create_file_history = new OrdersFileHistory();
            $create_file_history->entry_date = $entry_date;
            $create_file_history->order_id = $order_id;
            $create_file_history->user_id = $user_id;
            $create_file_history->entry_name = 'Order Entry';
            $create_file_history->action = 'New Order Entry '.$order_number.' Created Successfully';
            $create_file_history->created_datetime = Carbon::now();
            $create_file_history->created_user_id = $user_id;
            $create_file_history->created_ipaddress = $ipaddress;
            $create_file_history->save();
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function order_entry_edit(Request $request)
    {
        $order_id = $request->input('order_id');

        if (empty($order_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
        ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();

        $contact_creation = ContactCreation::select('id as contact_id', 'contact_name')
            ->where('delete_status', 'no')
            ->get();

        $work_flow_group_creation = WorkFlowGroupCreation::select('id as work_flow_group_id', 'work_flow_group_name')
            ->where('delete_status', 'no')
            ->get();

        $transaction_type_creation = TransactionTypeCreation::select('id as transaction_type_id', 'transaction_type_name')
            ->where('delete_status', 'no')
            ->get();

        $data_source_creation = DataSourceCreation::select('id as data_source_id', 'entry_date', 'data_source_name')
            ->where('delete_status', 'no')
            ->get();

        $order_entry_edit = OrderEntry::select('id as order_id', 'order_number', 'order_status', 'contact_id', 'open_date', 'close_date', 'due_date', 'arrival_date', 'delivery_date', 'active_workflow', 'assigned_to', 'street_address', 'unit', 'city_name', 'state_id', 'county_id', 'zipcode', 'parcel_id', 'sub_division', 'block', 'lot', 'section', 'land_value', 'improvement_value', 'total_assessed_value', 'product_type', 'transaction_type_id', 'work_flow_group_id', 'data_source_id', 'property_type', 'data_source_id', 'add_in_product', 'customer_name', 'customer_address', 'customer_branch_code', 'lender_name', 'lender_address', 'lender_branch_code', 'file', 'loan', 'sales_price', 'loan_type', 'loan_date', 'loan_amount', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $order_id)
            ->get();

        if ($order_entry_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'contact_creation' => $contact_creation, 'work_flow_group_creation' => $work_flow_group_creation, 'transaction_type_creation' => $transaction_type_creation, 'data_source_creation' => $data_source_creation, 'order_entry_edit' => $order_entry_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function order_entry_update(Request $request)
    {
        $order_id = $request->input('order_id');
        $order_number = $request->input('order_number');
        $order_status = $request->input('order_status');
        $contact_id = $request->input('contact_id');
        $open_date = $request->input('open_date');
        $close_date = $request->input('close_date');
        $due_date = $request->input('due_date');
        $arrival_date = $request->input('arrival_date');
        $delivery_date = $request->input('delivery_date');
        $active_workflow = $request->input('active_workflow');
        $assigned_to = $request->input('assigned_to');
        $street_address = $request->input('street_address');
        $unit = $request->input('unit');
        $city_name = $request->input('city_name');
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');
        $zipcode = $request->input('zipcode');
        $parcel_id = $request->input('parcel_id');
        $sub_division = $request->input('sub_division');
        $block = $request->input('block');
        $lot = $request->input('lot');
        $section = $request->input('section');
        $land_value = $request->input('land_value');
        $improvement_value = $request->input('improvement_value');
        $total_assessed_value = $request->input('total_assessed_value');
        $product_type = $request->input('product_type');
        $transaction_type_id = $request->input('transaction_type_id');
        $work_flow_group_id = $request->input('work_flow_group_id');
        $data_source_id = $request->input('data_source_id');
        $property_type = $request->input('property_type');
        $add_in_product = $request->input('add_in_product');
        $customer_name = $request->input('customer_name');
        $customer_address = $request->input('customer_address');
        $customer_branch_code = $request->input('customer_branch_code');
        $lender_name = $request->input('lender_name');
        $lender_address = $request->input('lender_address');
        $lender_branch_code = $request->input('lender_branch_code');
        $file = $request->input('file');
        $loan = $request->input('loan');
        $sales_price = $request->input('sales_price');
        $loan_type = $request->input('loan_type');
        $loan_date = $request->input('loan_date');
        $loan_amount = $request->input('loan_amount');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($order_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = OrderEntry::find($order_id);
        $form_update->order_number = $order_number;
        $form_update->order_status = $order_status;
        $form_update->contact_id = $contact_id;
        $form_update->open_date = $open_date;
        $form_update->close_date = $close_date;
        $form_update->due_date = $due_date;
        $form_update->arrival_date = $arrival_date;
        $form_update->delivery_date = $delivery_date;
        $form_update->active_workflow = $active_workflow;
        $form_update->assigned_to = $assigned_to;
        $form_update->street_address = $street_address;
        $form_update->unit = $unit;
        $form_update->city_name = $city_name;
        $form_update->state_id = $state_id;
        $form_update->county_id = $county_id;
        $form_update->zipcode = $zipcode;
        $form_update->parcel_id = $parcel_id;
        $form_update->sub_division = $sub_division;
        $form_update->block = $block;
        $form_update->lot = $lot;
        $form_update->section = $section;
        $form_update->land_value = $land_value;
        $form_update->improvement_value = $improvement_value;
        $form_update->total_assessed_value = $total_assessed_value;
        $form_update->product_type = $product_type;
        $form_update->transaction_type_id = $transaction_type_id;
        $form_update->work_flow_group_id = $work_flow_group_id;
        $form_update->data_source_id = $data_source_id;
        $form_update->property_type = $property_type;
        $form_update->add_in_product = $add_in_product;
        $form_update->customer_name = $customer_name;
        $form_update->customer_address = $customer_address;
        $form_update->customer_branch_code = $customer_branch_code;
        $form_update->lender_name = $lender_name;
        $form_update->lender_address = $lender_address;
        $form_update->lender_branch_code = $lender_branch_code;
        $form_update->file = $file;
        $form_update->loan = $loan;
        $form_update->sales_price = $sales_price;
        $form_update->loan_type = $loan_type;
        $form_update->loan_date = $loan_date;
        $form_update->loan_amount = $loan_amount;
        $form_update->description = $description;
        $form_update->status = $status;
        $form_update->delete_status = 'no';
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            $entry_date = Carbon::now()->toDateString();
            $create_file_history = new OrdersFileHistory();
            $create_file_history->entry_date = $entry_date;
            $create_file_history->order_id = $order_id;
            $create_file_history->user_id = $user_id;
            $create_file_history->entry_name = 'Order Entry';
            $create_file_history->action = 'Order Entry '.$order_number.' Updated Successfully';
            $create_file_history->created_datetime = Carbon::now();
            $create_file_history->created_user_id = $user_id;
            $create_file_history->created_ipaddress = $ipaddress;
            $create_file_history->save();
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    public function order_entry_delete(Request $request)
    {
        $order_id = $request->input('order_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($order_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = OrderEntry::find($order_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            $order_number = $form_delete->order_number;
            $entry_date = Carbon::now()->toDateString();
            $create_file_history = new OrdersFileHistory();
            $create_file_history->entry_date = $entry_date;
            $create_file_history->order_id = $order_id;
            $create_file_history->user_id = $user_id;
            $create_file_history->entry_name = 'Order Entry';
            $create_file_history->action = 'Order Entry '.$order_number.' Deleted Successfully';
            $create_file_history->created_datetime = Carbon::now();
            $create_file_history->created_user_id = $user_id;
            $create_file_history->created_ipaddress = $ipaddress;
            $create_file_history->save();
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function order_entry_state_dependency(Request $request)
    {
        $state_id = $request->input('state_id');

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('state_id', $state_id)
            ->get();
        return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'county_creation' => $county_creation], 200);
    }

    public function order_entry_borrower_or_seller_index(Request $request)
    {
        $order_id = $request->input('order_id');
        $borrower_or_seller = $request->input('borrower_or_seller');

        $order_borrower_or_seller_index = OrderEntryBorrowerOrSeller::select('id as order_borrower_or_seller_id', 'entry_date', 'order_id', 'borrower_or_seller', 'name', 'ssn', 'dob')
            ->where('order_id', $order_id)
            ->where('borrower_or_seller', $borrower_or_seller)
            ->where('delete_status', 'no')
            ->orderBy('id', 'desc')
            ->get();

        if ($order_borrower_or_seller_index!= null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'order_borrower_or_seller_index' => $order_borrower_or_seller_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function order_entry_borrower_or_seller_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $order_id = $request->input('formData.order_id', '');
        $order_number = $request->input('formData.order_number');
        $order_status = $request->input('formData.order_status');
        $contact_id = $request->input('formData.contact_id');
        $open_date = $request->input('formData.open_date');
        $close_date = $request->input('formData.close_date');
        $due_date = $request->input('formData.due_date');
        $arrival_date = $request->input('formData.arrival_date');
        $delivery_date = $request->input('formData.delivery_date');
        $active_workflow = $request->input('formData.active_workflow');
        $assigned_to = $request->input('formData.assigned_to');
        $street_address = $request->input('formData.street_address');
        $unit = $request->input('formData.unit');
        $city_name = $request->input('formData.city_name');
        $state_id = $request->input('formData.state_id');
        $county_id = $request->input('formData.county_id');
        $zipcode = $request->input('formData.zipcode');
        $parcel_id = $request->input('formData.parcel_id');
        $sub_division = $request->input('formData.sub_division');
        $block = $request->input('formData.block');
        $lot = $request->input('formData.lot');
        $section = $request->input('formData.section');
        $land_value = $request->input('formData.land_value');
        $improvement_value = $request->input('formData.improvement_value');
        $total_assessed_value = $request->input('formData.total_assessed_value');
        $product_type = $request->input('formData.product_type');
        $transaction_type_id = $request->input('formData.transaction_type_id');
        $work_flow_group_id = $request->input('formData.work_flow_group_id');
        $data_source_id = $request->input('formData.data_source_id');
        $property_type = $request->input('formData.property_type');
        $add_in_product = $request->input('formData.add_in_product');
        $customer_name = $request->input('formData.customer_name');
        $customer_address = $request->input('formData.customer_address');
        $customer_branch_code = $request->input('formData.customer_branch_code');
        $lender_name = $request->input('formData.lender_name');
        $lender_address = $request->input('formData.lender_address');
        $lender_branch_code = $request->input('formData.lender_branch_code');
        $file = $request->input('formData.file');
        $loan = $request->input('formData.loan');
        $sales_price = $request->input('formData.sales_price');
        $loan_type = $request->input('formData.loan_type');
        $loan_date = $request->input('formData.loan_date');
        $loan_amount = $request->input('formData.loan_amount');
        $description = $request->input('formData.description');
        $status = $request->input('formData.status', 'active');

        // Check if order_id is empty and insert or update accordingly
        if ($order_id == '') {
            $order_id = OrderEntry::insertGetId([
                'entry_date' => $entry_date,
                'order_number' => $order_number,
                'order_status' => $order_status,
                'contact_id' => $contact_id,
                'open_date' => $open_date,
                'close_date' => $close_date,
                'due_date' => $due_date,
                'arrival_date' => $arrival_date,
                'delivery_date' => $delivery_date,
                'active_workflow' => $active_workflow,
                'assigned_to' => $assigned_to,
                'street_address' => $street_address,
                'unit' => $unit,
                'city_name' => $city_name,
                'state_id' => $state_id,
                'county_id' => $county_id,
                'zipcode' => $zipcode,
                'parcel_id' => $parcel_id,
                'sub_division' => $sub_division,
                'block' => $block,
                'lot' => $lot,
                'section' => $section,
                'land_value' => $land_value,
                'improvement_value' => $improvement_value,
                'total_assessed_value' => $total_assessed_value,
                'product_type' => $product_type,
                'transaction_type_id' => $transaction_type_id,
                'work_flow_group_id' => $work_flow_group_id,
                'data_source_id' => $data_source_id,
                'property_type' => $property_type,
                'add_in_product' => $add_in_product,
                'customer_name' => $customer_name,
                'customer_address' => $customer_address,
                'customer_branch_code' => $customer_branch_code,
                'lender_name' => $lender_name,
                'lender_address' => $lender_address,
                'lender_branch_code' => $lender_branch_code,
                'file' => $file,
                'loan' => $loan,
                'sales_price' => $sales_price,
                'loan_type' => $loan_type,
                'loan_date' => $loan_date,
                'loan_amount' => $loan_amount,
                'description' => $description,
                'status' => $status,
            ]);
        }

        // Handle the borrower or seller data
        $borrower_or_seller_data = $request->input('formBorrowerOrSellerData', []);
        $form_create = new OrderEntryBorrowerOrSeller();
        $form_create->entry_date = $entry_date;
        $form_create->order_id = $order_id;
        $form_create->borrower_or_seller = $borrower_or_seller_data['borrower_or_seller'] ?? '';
        $form_create->name = $borrower_or_seller_data['name'] ?? '';
        $form_create->ssn = $borrower_or_seller_data['ssn'] ?? '';
        $form_create->dob = $borrower_or_seller_data['dob'] ?? '';
        $form_create->delete_status = 'no';
        $form_create->created_user_id = '1';
        $form_create->created_ipaddress = $_SERVER['REMOTE_ADDR'];

        if ($form_create->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully', 'order_id' => $order_id], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function order_entry_borrower_or_seller_edit(Request $request)
    {
        $order_borrower_or_seller_id = $request->input('order_borrower_or_seller_id');

        $order_borrower_or_seller_edit = OrderEntryBorrowerOrSeller::select('id as order_borrower_or_seller_id', 'entry_date', 'order_id', 'borrower_or_seller', 'name', 'ssn', 'dob')
            ->where('delete_status', 'no')
            ->where('id', $order_borrower_or_seller_id)
            ->get();

        if ($order_borrower_or_seller_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'order_borrower_or_seller_edit' => $order_borrower_or_seller_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function order_entry_borrower_or_seller_update(Request $request)
    {
        $order_borrower_or_seller_id = $request->input('order_borrower_or_seller_id');
        $borrower_or_seller = $request->input('borrower_or_seller');
        $name = $request->input('name');
        $ssn = $request->input('ssn');
        $dob = $request->input('dob');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_update = OrderEntryBorrowerOrSeller::find($order_borrower_or_seller_id);
        $form_update->borrower_or_seller = $borrower_or_seller;
        $form_update->name = $name;
        $form_update->ssn = $ssn;
        $form_update->dob = $dob;
        $form_update->delete_status = 'no';
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    public function order_entry_borrower_or_seller_delete(Request $request)
    {
        $borrower_or_seller_id = $request->input('borrower_or_seller_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_delete = OrderEntryBorrowerOrSeller::find($borrower_or_seller_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }
}
