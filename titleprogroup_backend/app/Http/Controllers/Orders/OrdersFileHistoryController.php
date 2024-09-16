<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Orders\OrdersFileHistory;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrdersFileHistoryController extends Controller
{
    public function orders_file_history_index(Request $request)
    {
        $order_id = $request->input('order_id');

        $orders_file_history_index = OrdersFileHistory::selectRaw('id as orders_file_history_id,
        entry_date,
        order_id,
        user_id,
        (select user_name from user_creation where user_creation.id = orders_file_history.user_id) as user_name,
        entry_name,
        action,
        created_datetime')
            ->where('order_id', $order_id)
            ->orderBy('id', 'desc')
            ->get();

        if ($orders_file_history_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'orders_file_history_index' => $orders_file_history_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }
}
