<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserTypeCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserTypeCreationController extends Controller
{
    public function user_type_creation_index(Request $request)
    {
        $user_type_creation_index1 = UserTypeCreation::select('id as user_type_id', 'entry_date', 'user_type_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($user_type_creation_index1 != null) {
            $user_type_creation_index = [];
            foreach ($user_type_creation_index1 as $user_type_creation_index2) {
                $user_type_creation_index2['entry_date'] = date('d-m-Y',strtotime($user_type_creation_index2['entry_date']));
                $user_type_creation_index[] = $user_type_creation_index2;
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_type_creation_index' => $user_type_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function user_type_creation_create(Request $request)
    {
        //
    }

    public function user_type_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $user_type_name = $request->input('user_type_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new UserTypeCreation();
        $form_create->entry_date = $entry_date;
        $form_create->user_type_name = $user_type_name;
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

    public function user_type_creation_edit(Request $request)
    {
        $user_type_id = $request->input('user_type_id');

        if (empty($user_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $user_type_creation_edit = UserTypeCreation::select('id as user_type_id', 'entry_date', 'user_type_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $user_type_id)
            ->get();

        if ($user_type_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'user_type_creation_edit' => $user_type_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function user_type_creation_update(Request $request)
    {
        $user_type_id = $request->input('user_type_id');
        $user_type_name = $request->input('user_type_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($user_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = UserTypeCreation::find($user_type_id);
        $form_update->user_type_name = $user_type_name;
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

    public function user_type_creation_delete(Request $request)
    {
        $user_type_id = $request->input('user_type_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($user_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = UserTypeCreation::find($user_type_id);
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
