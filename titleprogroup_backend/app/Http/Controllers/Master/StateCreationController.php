<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\StateCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StateCreationController extends Controller
{
    public function state_creation_index(Request $request)
    {
        $state_creation_index = StateCreation::select('id as state_id', 'state_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($state_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'state_creation_index' => $state_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function state_creation_create(Request $request)
    {

    }

    public function state_creation_insert(Request $request)
    {
        $state_name = $request->input('state_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new StateCreation();
        $form_create->state_name = $state_name;
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

    public function state_creation_edit(Request $request)
    {
        $state_id = $request->input('state_id');

        if (empty($state_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $state_creation_edit = StateCreation::select('id as state_id', 'state_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $state_id)
            ->get();

        if ($state_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'state_creation_edit' => $state_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function state_creation_update(Request $request)
    {
        $state_id = $request->input('state_id');
        $state_name = $request->input('state_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($state_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = StateCreation::find($state_id);
        $form_update->state_name = $state_name;
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

    public function state_creation_delete(Request $request)
    {
        $state_id = $request->input('state_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($state_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = StateCreation::find($state_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function state_creation_state_dependency(Request $request)
    {
        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        if ($state_creation != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'state_creation' => $state_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Dependency Not Found'], 404);
        }
    }
}
