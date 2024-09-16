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

class OrdersSummaryController extends Controller
{
    public function orders_summary_index(Request $request)
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

        $orders_summary_index = OrderEntry::selectRaw('id as order_id, order_number, order_status, contact_id, (select contact_name from contact_creation where contact_creation.id = order_entry.contact_id) as contact_name, open_date, close_date, due_date, arrival_date, delivery_date, active_workflow, assigned_to, street_address, unit, city_name, state_id, (select state_name from state_creation where state_creation.id = order_entry.state_id) as state_name, county_id, (select county_name from county_creation where county_creation.id = order_entry.county_id) as county_name, zipcode, parcel_id, sub_division, block, lot, section, land_value, improvement_value, total_assessed_value, product_type, transaction_type_id, (select transaction_type_name from transaction_type_creation where transaction_type_creation.id = order_entry.transaction_type_id) as transaction_type_name, work_flow_group_id, (select work_flow_group_name from work_flow_group_creation where work_flow_group_creation.id = order_entry.work_flow_group_id) as work_flow_group_name, data_source_id, (select data_source_name from data_source_creation where data_source_creation.id = order_entry.data_source_id) as data_source_name, property_type, add_in_product, customer_name, customer_address, customer_branch_code, lender_name, lender_address, lender_branch_code, file, loan, sales_price, loan_type, loan_date, loan_amount, description, status')
            ->where('delete_status', 'no')
            ->where('id', $order_id)
            ->get();

        if ($orders_summary_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'contact_creation' => $contact_creation, 'work_flow_group_creation' => $work_flow_group_creation, 'transaction_type_creation' => $transaction_type_creation, 'data_source_creation' => $data_source_creation, 'orders_summary_index' => $orders_summary_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function orders_summary_borrower_or_seller_index(Request $request)
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
}
