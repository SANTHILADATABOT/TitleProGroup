<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserCreation;
use App\Models\Master\AssignTypeCreation;
use App\Models\Master\WorkFlowCreation;
use App\Models\Master\WorkFlowGroupCreation;
use App\Models\Master\TaskCreation;
use App\Models\Admin\UserTypeCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class TaskCreationController extends Controller
{
    public function task_creation_index(Request $request)
    {
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_id = $request->input('work_flow_id');

        $task_creation_index = TaskCreation::select('task_creations.id as task_id', 'task_creations.entry_date', 'task_creations.work_flow_group_id', 'task_creations.work_flow_id', 'task_creations.task_name', 'task_creations.when_1', 'task_creations.specific_task', 'task_creations.assign_type_id', 'task_creations.assign_task_group', 'task_creations.assign_user_id', 'task_creations.status')
            ->leftjoin('assign_type_creation', 'assign_type_creation.id', '=', 'task_creations.assign_type_id')
            ->leftjoin('work_flow_group_creation', 'work_flow_group_creation.id', '=', 'task_creations.work_flow_group_id')
            ->leftjoin('work_flow_creation', 'work_flow_creation.id', '=', 'task_creations.work_flow_id')
            ->where('task_creations.delete_status', 'no')
            ->where('work_flow_group_creation.delete_status', 'no')
            ->where('work_flow_creation.delete_status', 'no')
            ->where('task_creations.work_flow_group_id', $work_flow_group_id)
            ->where('task_creations.work_flow_id', $work_flow_id)
            ->get();

        if ($task_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'task_creation_index' => $task_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function task_creation_create(Request $request)
    {
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_id = $request->input('work_flow_id');

        $task_creation = TaskCreation::select('id as task_id', 'task_name')
            ->where('delete_status', 'no')
            ->where('work_flow_group_id', $work_flow_group_id)
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

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'task_creation' => $task_creation, 'assign_type_creation' => $assign_type_creation, 'work_flow_group_creation' => $work_flow_group_creation, 'work_flow_creation' => $work_flow_creation], 200);
    }

    public function task_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $assign_date = Carbon::now();
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_id = $request->input('work_flow_id');
        $task_name = $request->input('task_name');
        $when_1 = $request->input('when_1');
        $specific_task = $request->input('specific_task');
        $assign_type_id = $request->input('assign_type_id');
        $assign_task_group = $request->input('assign_task_group');
        $assign_user_id = $request->input('assign_user_id');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new TaskCreation();
        $form_create->entry_date = $entry_date;
        $form_create->work_flow_group_id = $work_flow_group_id;
        $form_create->work_flow_id = $work_flow_id;
        $form_create->task_name = $task_name;
        $form_create->when_1 = $when_1;
        $form_create->specific_task = $specific_task;
        $form_create->assign_type_id = $assign_type_id;
        $form_create->assign_task_group = $assign_task_group;
        $form_create->assign_user_id = $assign_user_id;
        $form_create->assign_date = $assign_date;
        $form_create->status = 'active';
        $form_create->delete_status = 'no';
        $form_create->created_user_id = $user_id;
        $form_create->created_ipaddress = $ipaddress;

        if ($form_create->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function task_creation_edit(Request $request)
    {
        $task_id = $request->input('task_id');
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_id = $request->input('work_flow_id');

        if (empty($task_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $task_creation_find = TaskCreation::select('id as task_id', 'task_name', 'work_flow_group_id', 'work_flow_id')
            ->where('delete_status', 'no')
            ->where('id', $task_id)
            ->first();

        $effective_work_flow_group_id = $work_flow_group_id ?: $task_creation_find->work_flow_group_id;
        $effective_work_flow_id = $work_flow_id ?: $task_creation_find->work_flow_id;

        $task_creation = TaskCreation::select('id as task_id', 'task_name')
            ->where('delete_status', 'no')
            ->where('work_flow_group_id', $effective_work_flow_group_id)
            ->where('work_flow_id', $effective_work_flow_id)
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

        $user_creation = UserCreation::select('id as user_id', 'user_name')
            ->where('delete_status', 'no')
            ->get();

        $task_creation_edit = TaskCreation::select('id as task_id', 'entry_date', 'work_flow_group_id', 'work_flow_id', 'task_name', 'when_1','specific_task','assign_type_id','assign_task_group','assign_user_id','status')
            ->where('delete_status', 'no')
            ->where('id', $task_id)
            ->get();

        if ($task_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'task_creation' => $task_creation, 'assign_type_creation' => $assign_type_creation, 'work_flow_group_creation' => $work_flow_group_creation, 'work_flow_creation' => $work_flow_creation, 'user_creation' => $user_creation, 'task_creation_edit' => $task_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function task_creation_update(Request $request)
    {
        $task_id = $request->input('task_id');
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_id = $request->input('work_flow_id');
        $task_name = $request->input('task_name');
        $when_1 = $request->input('when_1');
        $specific_task = $request->input('specific_task');
        $assign_type_id = $request->input('assign_type_id');
        $assign_task_group = $request->input('assign_task_group');
        $assign_user_id = $request->input('assign_user_id');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($task_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = TaskCreation::find($task_id);
        $form_update->work_flow_group_id = $work_flow_group_id;
        $form_update->work_flow_id = $work_flow_id;
        $form_update->task_name = $task_name;
        $form_update->when_1 = $when_1;
        $form_update->specific_task = $specific_task;
        $form_update->assign_type_id = $assign_type_id;
        $form_update->assign_task_group = $assign_task_group;
        $form_update->assign_user_id = $assign_user_id;
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

    public function task_creation_delete(Request $request)
    {
        $task_id = $request->input('task_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($task_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = TaskCreation::find($task_id);
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
