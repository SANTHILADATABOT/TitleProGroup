<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Admin\UserCreation;
use App\Models\Master\AssignTypeCreation;
use App\Models\Master\WorkFlowGroupCreation;
use App\Models\Master\WorkFlowCreation;
use App\Models\Master\TaskCreation;
use App\Models\Orders\OrderEntry;
use App\Models\Orders\OrdersTask;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class TasksReportController extends Controller
{
    public function tasks_report_index(Request $request)
    {
        $orders_task_list = OrdersTask::select('id as orders_task_id', 'entry_date', 'task_status', 'order_id', 'work_flow_group_id', 'work_flow_id', 'task_id', 'countdown_timer', 'start_time', 'stop_time', 'description', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at')
            ->get();

        foreach ($orders_task_list as $orders_task_index) {

            $order_id = $orders_task_index->order_id;

            $orders_entry_index = OrderEntry::select('id as order_id', 'entry_date', 'order_number', 'work_flow_group_id')
                    ->where('delete_status', 'no')
                    ->where('id', $order_id)
                    ->get();

                foreach ($orders_entry_index as $orders_entry) {

                    $work_flow_group_id = $orders_entry->work_flow_group_id;

                    $work_flow_creation_index = WorkFlowCreation::select('id as work_flow_id', 'entry_date', 'work_flow_group_id', 'work_flow_name', 'place_after', 'description', 'status')
                        ->where('delete_status', 'no')
                        ->where('work_flow_group_id', $work_flow_group_id)
                        ->orderBy('place_after', 'asc')
                        ->get();

                    foreach ($work_flow_creation_index as $work_flow) {

                        $work_flow_id = $work_flow->work_flow_id;
                        $work_flow_name = $work_flow->work_flow_name;

                        $tasks_list = [];

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


                            $user_creation_completed_by = null;

                            if ($orders_task_index && $orders_task_index->updated_user_id) {
                                $user_creation_completed_by = UserCreation::select('id as user_id', 'user_name')
                                    ->where('id', $orders_task_index->updated_user_id)
                                    ->where('delete_status', 'no')
                                    ->first();
                            }

                            $tasks_list[] = [
                                'work_flow_group_id' => $work_flow_group_id,
                                'work_flow_id' => $work_flow_id,
                                'work_flow_name' => $work_flow_name,
                                'task_id' => $task->task_id,
                                'task_name' => $task->task_name,
                                'assign_task_group' => $task->assign_task_group,
                                'assign_type_id' => $task->assign_type_id,
                                'assign_type_name' => $assign_type_creation ? ($assign_type_creation->assign_type_name ?? "") : "",
                                'assign_username' => $user_creation_assign_type ? ($user_creation_assign_type->user_name ?? "") : "",
                                'work_flow_group_id' => $task->work_flow_group_id,
                                'work_flow_id' => $task->work_flow_id,
                                'status' => $task->status,
                                'order_number' => $orders_entry->order_number,
                                'orders_task_id' => $orders_task_index ? ($orders_task_index->orders_task_id ?? "") : "",
                                'task_status' => $orders_task_index ? ($orders_task_index->task_status ?? "Not Started") : "Not Started",
                                'countdown_timer' => $orders_task_index ? ($orders_task_index->countdown_timer ?? null) : null,
                                'start_time' => $orders_task_index ? ($orders_task_index->start_time ?? null) : null,
                                'stop_time' => $orders_task_index ? ($orders_task_index->stop_time ?? null) : null,
                                'completed_by' => ($orders_task_index && $orders_task_index->task_status == "Completed") ? ($user_creation_completed_by ? ($user_creation_completed_by->user_name ?? "") : "") : "",
                                'completed_date' => ($orders_task_index && $orders_task_index->task_status == "Completed") ? ($orders_task_index->updated_at ?? "") : ""
                            ];
                        }
                    }

                    if ($tasks_list != null) {
                        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'tasks_report_index' => $tasks_list], 200);
                    } else {
                        return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
                    }
                }

        }

    }
}
