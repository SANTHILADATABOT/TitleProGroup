<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserCreation;
use App\Models\Master\AssignTypeCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AssignTypeCreationController extends Controller
{
    public function assign_type_creation_index(Request $request)
    {
        $assign_type_creation_index = AssignTypeCreation::select('id as assign_type_id', 'entry_date', 'assign_type_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($assign_type_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'assign_type_creation_index' => $assign_type_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function assign_type_creation_create(Request $request)
    {
        //
    }

    public function assign_type_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $assign_type_name = $request->input('assign_type_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new AssignTypeCreation();
        $form_create->entry_date = $entry_date;
        $form_create->assign_type_name = $assign_type_name;
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

    public function assign_type_creation_edit(Request $request)
    {
        $assign_type_id = $request->input('assign_type_id');

        if (empty($assign_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $assign_type_creation_edit = AssignTypeCreation::select('id as assign_type_id', 'entry_date', 'assign_type_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $assign_type_id)
            ->get();

        if ($assign_type_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'assign_type_creation_edit' => $assign_type_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function assign_type_creation_update(Request $request)
    {
        $assign_type_id = $request->input('assign_type_id');
        $assign_type_name = $request->input('assign_type_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($assign_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = AssignTypeCreation::find($assign_type_id);
        $form_update->assign_type_name = $assign_type_name;
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

    public function assign_type_creation_delete(Request $request)
    {
        $assign_type_id = $request->input('assign_type_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($assign_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = AssignTypeCreation::find($assign_type_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function assign_type_creation_assign_type_dependency(Request $request)
    {
        $assign_type_id = $request->input('assign_type_id');

        $user_creation = UserCreation::select('id as user_id', 'user_name')
            ->where('delete_status', 'no')
            ->whereJsonContains('assign_type_id', $assign_type_id)
            ->get();

        if ($user_creation != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'user_creation' => $user_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Dependency Not Found'], 404);
        }
    }
}
