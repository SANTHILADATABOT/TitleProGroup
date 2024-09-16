<?php

namespace App\Http\Controllers\Reports;

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

class OrdersReportController extends Controller
{
    public function orders_report_index(Request $request)
    {
        $order_entry_table = (new OrderEntry)->getTable();
        $state_table = (new StateCreation)->getTable();
        $county_table = (new CountyCreation)->getTable();
        $transaction_type_table = (new TransactionTypeCreation)->getTable();
        $work_flow_group_table = (new WorkFlowGroupCreation)->getTable();
        $data_source_table = (new DataSourceCreation)->getTable();

        $orders_report_index = OrderEntry::selectRaw('
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

        if ($orders_report_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'orders_report_index' => $orders_report_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }
}
