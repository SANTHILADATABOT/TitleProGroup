<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Admin\UserCreation;
use App\Models\Master\AssignTypeCreation;
use App\Models\Master\WorkFlowGroupCreation;
use App\Models\Master\WorkFlowCreation;
use App\Models\Master\TaskCreation;
use App\Models\Orders\OrderEntry;
use App\Models\Orders\OrdersTask;
use App\Models\Orders\OrdersFileHistory;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrdersTaskController extends Controller
{
    public function orders_task_index(Request $request)
    {
        $order_id = $request->input('order_id');

        $orders_entry = OrderEntry::select('id as order_id', 'entry_date', 'order_number', 'work_flow_group_id')
            ->where('id', $order_id)
            ->where('delete_status', 'no')
            ->orderBy('id', 'desc')
            ->first();

        if ($orders_entry) {

            $work_flow_group_id = $orders_entry->work_flow_group_id;

            $work_flow_creation = [];

            $work_flow_creation_index = WorkFlowCreation::select('id as work_flow_id', 'entry_date', 'work_flow_group_id', 'work_flow_name', 'place_after', 'description', 'status')
                ->where('delete_status', 'no')
                ->where('work_flow_group_id', $work_flow_group_id)
                ->orderBy('place_after', 'asc')
                ->get();

            foreach ($work_flow_creation_index as $work_flow) {
                $work_flow_id = $work_flow->work_flow_id;
                $work_flow_name = $work_flow->work_flow_name;

                $tasks = [];

                $task_creation_index = TaskCreation::select('id as task_id', 'entry_date', 'work_flow_group_id', 'work_flow_id', 'task_name', 'when_1', 'assign_task_group', 'assign_type_id', 'assign_user_id', 'assign_date', 'status')
                    ->where('delete_status', 'no')
                    ->where('work_flow_group_id', $work_flow_group_id)
                    ->where('work_flow_id', $work_flow_id)
                    ->get();

                    foreach ($task_creation_index as $task) {
                        $assign_type_creation = null;
                        if ($task->assign_type_id) {
                            $assign_type_creation = AssignTypeCreation::select('id as assign_type_id', 'assign_type_name')
                                ->where('id', $task->assign_type_id)
                                ->where('delete_status', 'no')
                                ->first();
                        }

                        $user_creation_assign_type = null;
                        if ($task->assign_type_id) {
                            $user_creation_assign_type = UserCreation::select('id as user_id', 'user_name')
                                ->where('delete_status', 'no')
                                ->whereJsonContains('assign_type_id', $task->assign_type_id)
                                ->first();
                        }

                        $orders_task_index = OrdersTask::select('id as orders_task_id', 'entry_date', 'task_status', 'order_id', 'work_flow_group_id', 'work_flow_id', 'task_id', 'countdown_timer', 'start_time', 'stop_time', 'description', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at')
                            ->where('work_flow_group_id', $work_flow_group_id)
                            ->where('work_flow_id', $work_flow_id)
                            ->where('task_id', $task->task_id)
                            ->first();

                        $user_creation_completed_by = null;
                        if ($orders_task_index && $orders_task_index->updated_user_id) {
                            $user_creation_completed_by = UserCreation::select('id as user_id', 'user_name')
                                ->where('id', $orders_task_index->updated_user_id)
                                ->where('delete_status', 'no')
                                ->first();
                        }

                        $tasks[] = [
                            'task_id' => $task->task_id,
                            'task_name' => $task->task_name,
                            'assign_task_group' => $task->assign_task_group,
                            'assign_type_id' => $task->assign_type_id,
                            'assign_type_name' => $assign_type_creation ? ($assign_type_creation->assign_type_name ?? "") : "",
                            'assign_username' => $user_creation_assign_type ? ($user_creation_assign_type->user_name ?? "") : "",
                            'work_flow_group_id' => $task->work_flow_group_id,
                            'work_flow_id' => $task->work_flow_id,
                            'status' => $task->status,
                            'orders_task_id' => $orders_task_index ? ($orders_task_index->orders_task_id ?? "") : "",
                            'task_status' => $orders_task_index ? ($orders_task_index->task_status ?? "Not Started") : "Not Started",
                            'countdown_timer' => $orders_task_index ? ($orders_task_index->countdown_timer ?? null) : null,
                            'start_time' => $orders_task_index ? ($orders_task_index->start_time ?? null) : null,
                            'stop_time' => $orders_task_index ? ($orders_task_index->stop_time ?? null) : null,
                            'completed_by' => ($orders_task_index && $orders_task_index->task_status == "Completed") ? ($user_creation_completed_by ? ($user_creation_completed_by->user_name ?? "") : "") : "",
                            'completed_date' => ($orders_task_index && $orders_task_index->task_status == "Completed") ? ($orders_task_index->updated_at ?? "") : ""
                        ];

                    }

                $work_flow_creation[] = [
                    'work_flow_group_id' => $work_flow_group_id,
                    'work_flow_id' => $work_flow_id,
                    'work_flow_name' => $work_flow_name,
                    'task_creation_index' => $tasks
                ];
            }

            if ($work_flow_creation != null) {
                return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'orders_task_index' => $work_flow_creation], 200);
            } else {
                return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
            }
        }
    }

    public function orders_task_work_flow_group_create(Request $request)
    {
        $order_id = $request->input('order_id');

        $orders_entry = OrderEntry::select('id as order_id', 'work_flow_group_id')
            ->where('id', $order_id)
            ->where('delete_status', 'no')
            ->first();

        $work_flow_group_creation = WorkFlowGroupCreation::select('id as work_flow_group_id', 'work_flow_group_name')
            ->where('delete_status', 'no')
            ->get();

        $work_flow_creation = WorkFlowCreation::select('id as work_flow_id', 'work_flow_name')
            ->where('delete_status', 'no')
            ->where('work_flow_group_id', $orders_entry->work_flow_group_id)
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'work_flow_group_creation' => $work_flow_group_creation, 'work_flow_creation' => $work_flow_creation, 'work_flow_group_id' => $orders_entry->work_flow_group_id], 200);
    }

    public function orders_task_new_task_create(Request $request)
    {
        $order_id = $request->input('order_id');
        $work_flow_id = $request->input('work_flow_id');

        $orders_entry = OrderEntry::select('id as order_id', 'work_flow_group_id')
            ->where('id', $order_id)
            ->where('delete_status', 'no')
            ->first();

        $task_creation = TaskCreation::select('id as task_id', 'task_name')
            ->where('delete_status', 'no')
            ->where('work_flow_group_id', $orders_entry->work_flow_group_id)
            ->where('work_flow_id', $work_flow_id)
            ->get();

        $assign_type_creation = AssignTypeCreation::select('id as assign_type_id',  'assign_type_name')
            ->where('delete_status', 'no')
            ->get();

        $work_flow_group_creation = WorkFlowGroupCreation::select('id as work_flow_group_id', 'work_flow_group_name')
            ->where('delete_status', 'no')
            ->get();

        $work_flow_creation = WorkFlowCreation::select('id as work_flow_id', 'work_flow_name')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'task_creation' => $task_creation, 'assign_type_creation' => $assign_type_creation, 'work_flow_group_creation' => $work_flow_group_creation, 'work_flow_creation' => $work_flow_creation, 'work_flow_group_id' => $orders_entry->work_flow_group_id], 200);
    }

    public function orders_task_edit(Request $request)
    {
        //
    }

    public function orders_task_start_timer(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $current_time = Carbon::now();
        $order_id = $request->input('order_id');
        $task_id = $request->input('task_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $task_creation = TaskCreation::select('id as task_id', 'work_flow_group_id', 'work_flow_id')
            ->where('delete_status', 'no')
            ->where('id', $task_id)
            ->first();

        if ($task_creation) {
            $work_flow_group_id = $task_creation->work_flow_group_id;
            $work_flow_id = $task_creation->work_flow_id;
        }

        $form_create = new OrdersTask();
        $form_create->entry_date = $entry_date;
        $form_create->task_status = 'Started';
        $form_create->order_id = $order_id;
        $form_create->work_flow_group_id = $work_flow_group_id;
        $form_create->work_flow_id = $work_flow_id;
        $form_create->task_id = $task_id;
        $form_create->start_time = $current_time;
        $form_create->created_user_id = $user_id;
        $form_create->created_ipaddress = $ipaddress;

        if ($form_create->save()) {
            $orders_task_id = $form_create->id;

            $create_file_history = new OrdersFileHistory();
            $create_file_history->entry_date = $entry_date;
            $create_file_history->order_id = $order_id;
            $create_file_history->user_id = $user_id;
            $create_file_history->entry_name = 'Tasks';
            $create_file_history->action = 'Orders Tasks Timer Started';
            $create_file_history->created_user_id = $user_id;
            $create_file_history->created_ipaddress = $ipaddress;
            $create_file_history->save();

            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully', 'orders_task_id' => $orders_task_id], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function orders_task_stop_timer(Request $request)
    {
        $current_time = Carbon::now();
        $orders_task_id = $request->input('orders_task_id');
        $countdown_timer = $request->input('countdown_timer');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($orders_task_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = OrdersTask::find($orders_task_id);
        $form_update->task_status = 'Completed';
        $form_update->countdown_timer = $countdown_timer;
        $form_update->stop_time = $current_time;
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            $order_id = $form_update->order_id;
            $entry_date = Carbon::now()->toDateString();
            $create_file_history = new OrdersFileHistory();
            $create_file_history->entry_date = $entry_date;
            $create_file_history->order_id = $order_id;
            $create_file_history->user_id = $user_id;
            $create_file_history->entry_name = 'Tasks';
            $create_file_history->action = 'Orders Tasks Timer Stoped';
            $create_file_history->created_user_id = $user_id;
            $create_file_history->created_ipaddress = $ipaddress;
            $create_file_history->save();

            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully', 'orders_task_id' => $orders_task_id], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }
}
