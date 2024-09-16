<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\WorkFlowGroupCreation;
use App\Models\Master\WorkFlowCreation;
use App\Models\Master\TaskCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class WorkFlowCreationController extends Controller
{
    public function work_flow_creation_index(Request $request)
    {
        $work_flow_group_id = $request->input('work_flow_group_id');

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

            $task_creation_index = TaskCreation::select('id as task_id', 'entry_date', 'work_flow_group_id', 'work_flow_id', 'task_name', 'when_1', 'specific_task', 'assign_type_id', 'assign_user_id', 'status')
                ->where('delete_status', 'no')
                ->where('work_flow_group_id', $work_flow_group_id)
                ->where('work_flow_id', $work_flow_id)
                ->get();

            foreach ($task_creation_index as $task) {
                $tasks[] = [
                    'task_id' => $task->task_id,
                    'task_name' => $task->task_name,
                    'when_1' => $task->when_1,
                    'specific_task' => $task->specific_task,
                    'work_flow_group_id' => $task->work_flow_group_id,
                    'work_flow_id' => $task->work_flow_id,
                    'status' => $task->status
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
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'work_flow_creation_index' => $work_flow_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function work_flow_creation_create(Request $request)
    {
        $work_flow_group_id = $request->input('work_flow_group_id');

        $work_flow_group_creation = WorkFlowGroupCreation::select('id as work_flow_group_id', 'work_flow_group_name')
            ->where('delete_status', 'no')
            ->get();

        $work_flow_creation = WorkFlowCreation::select('id as work_flow_id', 'work_flow_name')
            ->where('delete_status', 'no')
            ->where('work_flow_group_id', $work_flow_group_id)
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'work_flow_group_creation' => $work_flow_group_creation, 'work_flow_creation' => $work_flow_creation], 200);
    }

    public function work_flow_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_name = $request->input('work_flow_name');
        $place_after = $request->input('place_after');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new WorkFlowCreation();
        $form_create->entry_date = $entry_date;
        $form_create->work_flow_group_id = $work_flow_group_id;
        $form_create->work_flow_name = $work_flow_name;
        $form_create->place_after = $place_after;
        $form_create->description = $description;
        $form_create->status = $status;
        $form_create->delete_status = 'no';
        $form_create->created_user_id = $user_id;
        $form_create->created_ipaddress = $ipaddress;

        if ($form_create->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function work_flow_creation_edit(Request $request)
    {
        $work_flow_id = $request->input('work_flow_id');
        $work_flow_group_id = $request->input('work_flow_group_id');

        if (empty($work_flow_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $work_flow_group_creation = WorkFlowGroupCreation::select('id as work_flow_group_id', 'work_flow_group_name')
            ->where('delete_status', 'no')
            ->get();

        $work_flow_creation = WorkFlowCreation::select('id as work_flow_id', 'work_flow_name')
            ->where('delete_status', 'no')
            ->where('work_flow_group_id', $work_flow_group_id)
            ->get();

        $work_flow_creation_edit = WorkFlowCreation::select('id as work_flow_id', 'entry_date', 'work_flow_group_id', 'work_flow_name', 'place_after', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $work_flow_id)
            ->get();

        if ($work_flow_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'work_flow_group_creation' => $work_flow_group_creation, 'work_flow_creation' => $work_flow_creation, 'work_flow_creation_edit' => $work_flow_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function work_flow_creation_update(Request $request)
    {
        $work_flow_id = $request->input('work_flow_id');
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_name = $request->input('work_flow_name');
        $place_after = $request->input('place_after');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($work_flow_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = WorkFlowCreation::find($work_flow_id);
        $form_update->work_flow_group_id = $work_flow_group_id;
        $form_update->work_flow_name = $work_flow_name;
        $form_update->place_after = $place_after;
        $form_update->description = $description;
        $form_update->status = $status;
        $form_update->delete_status = 'no';
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    public function work_flow_creation_delete(Request $request)
    {
        $work_flow_id = $request->input('work_flow_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($work_flow_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = WorkFlowCreation::find($work_flow_id);
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
