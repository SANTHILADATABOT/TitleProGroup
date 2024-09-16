<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Orders\OrdersTab;
use App\Models\Orders\OrderEntry;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrdersTabController extends Controller
{
    public function orders_tab_index(Request $request)
    {
        $user_id = $request->input('user_id');

        $orders_tab = OrdersTab::select('id as orders_tab_id', 'last_changes_datetime', 'user_id', 'tab_id')
            ->where('user_id', $user_id)
            ->first();

        $orders_tab_index = [];

        if ($orders_tab) {
            // Decode tab_id if it's a JSON string.
            $tab_id = json_decode($orders_tab->tab_id, true);
            $order_number = [];

            if (is_array($tab_id)) {
                foreach ($tab_id as $tab) {
                    $order_entry = OrderEntry::select('id as order_id', 'order_number')
                        ->where('id', $tab)
                        ->where('delete_status', 'no')
                        ->first();

                    if ($order_entry) {
                        $order_number[$tab] = $order_entry->order_number; // Map tab_id to order_number
                    }
                }
            }

            // Transform the data into the desired format
            $formatted_items = [];
            foreach ($tab_id as $tab) {
                if (isset($order_number[$tab])) {
                    $formatted_items[] = [
                        'label' => $order_number[$tab],
                        'key' => $tab,
                    ];
                }
            }

            $orders_tab_index[] = [
                'orders_tab_id' => $orders_tab->orders_tab_id,
                'last_changes_datetime' => $orders_tab->last_changes_datetime,
                'user_id' => $orders_tab->user_id,
                'items' => $formatted_items // Use 'items' instead of 'order_number'
            ];
        }

        if (!empty($orders_tab_index)) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'orders_tab_index' => $orders_tab_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }


    public function orders_tab_update(Request $request)
    {
        $user_id = $request->input('user_id');
        $tab_id = $request->input('tab_id');
        $last_changes_datetime = Carbon::now();

        $orders_tab = OrdersTab::select('id', 'last_changes_datetime', 'user_id', 'tab_id')
            ->where('user_id', $user_id)
            ->first();

        if ($orders_tab) {
            $tab_array = json_decode($orders_tab->tab_id, true) ?? [];
            if (!in_array($tab_id, $tab_array)) {
                $tab_array[] = $tab_id;
            }
            $id = $orders_tab->id;
            $form_update = OrdersTab::find($id);
            $form_update->last_changes_datetime = $last_changes_datetime;
            $form_update->tab_id = json_encode($tab_array);

            if ($form_update->save()) {
                return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
            } else {
                return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
            }
        } else {
            $tab_array_new = [$tab_id];
            $form_create = new OrdersTab();
            $form_create->user_id = $user_id;
            $form_create->last_changes_datetime = $last_changes_datetime;
            $form_create->tab_id = json_encode($tab_array_new);

            if ($form_create->save()) {
                return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
            } else {
                return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
            }
        }
    }

    public function orders_tab_delete(Request $request)
    {
        $user_id = $request->input('user_id');
        $tab_id = $request->input('tab_id');
        $last_changes_datetime = Carbon::now();

        $orders_tab = OrdersTab::select('id', 'last_changes_datetime', 'user_id', 'tab_id')
            ->where('user_id', $user_id)
            ->first();

        if ($orders_tab) {
            $tab_array = json_decode($orders_tab->tab_id, true) ?? [];
            $tab_array_key = array_search($tab_id, $tab_array);
            if ($tab_array_key !== false) {
                unset($tab_array[$tab_array_key]);
                $tab_array = array_values($tab_array);
            }
            $id = $orders_tab->id;
            $form_delete = OrdersTab::find($id);
            $form_delete->last_changes_datetime = $last_changes_datetime;
            $form_delete->tab_id = json_encode($tab_array);

            if ($form_delete->save()) {
                return response()->json(['status' => 'SUCCESS', 'message' => 'Data Removed Successfully'], 200);
            } else {
                return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
            }
        }
    }
}
