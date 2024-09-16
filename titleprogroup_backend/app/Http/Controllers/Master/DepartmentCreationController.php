<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\DepartmentCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DepartmentCreationController extends Controller
{
    public function department_creation_index(Request $request)
    {
        $department_creation_index = DepartmentCreation::select('id as department_id',  'entry_date', 'department_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($department_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'department_creation_index' => $department_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function department_creation_create(Request $request)
    {
        //
    }

    public function department_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $department_name = $request->input('department_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new DepartmentCreation();
        $form_create->entry_date = $entry_date;
        $form_create->department_name = $department_name;
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

    public function department_creation_edit(Request $request)
    {
        $department_id = $request->input('department_id');

        if (empty($department_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $department_creation_edit = DepartmentCreation::select('id as department_id',  'entry_date', 'department_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $department_id)
            ->get();

        if ($department_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'department_creation_edit' => $department_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function department_creation_update(Request $request)
    {
        $department_id = $request->input('department_id');
        $department_name = $request->input('department_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($department_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = DepartmentCreation::find($department_id);
        $form_update->department_name = $department_name;
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

    public function department_creation_delete(Request $request)
    {
        $department_id = $request->input('department_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($department_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = DepartmentCreation::find($department_id);
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
