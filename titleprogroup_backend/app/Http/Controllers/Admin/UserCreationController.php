<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserTypeCreation;
use App\Models\Admin\UserCreation;
use App\Models\Master\StaffCreation;
use App\Models\Master\AssignTypeCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserCreationController extends Controller
{
    public function user_creation_index(Request $request)
    {
        $user_creation_index1 = UserCreation::select('user_creation.*','user_creation.id as user_id', 'user_type_creation.user_type_name', 'staff_creation.staff_name')
            ->leftjoin('user_type_creation', 'user_type_creation.id', '=', 'user_creation.user_type_id')
            ->leftjoin('staff_creation', 'staff_creation.id', '=', 'user_creation.staff_id')
            ->where('user_creation.delete_status', 'no')
            ->get();

        if ($user_creation_index1 != null) {
            $user_creation_index = [];
            foreach($user_creation_index1 as $user_creation_index2){
                $assign_type = null;
                if($user_creation_index2['assign_type_id'] != ''){
                    $assign_type = AssignTypeCreation::whereIn('id',json_decode($user_creation_index2['assign_type_id'],true))->pluck('assign_type_name')->toArray();
                }
                $user_creation_index2['assign_type'] = json_encode(($assign_type!=null)?$assign_type:[]);
                $user_creation_index2['entry_date'] = date('d-m-Y',strtotime($user_creation_index2['entry_date']));
                $user_creation_index[] = $user_creation_index2;
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_creation_index' => $user_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function user_creation_create(Request $request)
    {
        $user_type_creation = UserTypeCreation::select('id as user_type_id', 'user_type_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();
        $staff_creation = StaffCreation::select('id as staff_id', 'staff_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();
        $assign_type_creation = AssignTypeCreation::select('id as assign_type_id', 'assign_type_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Staff Showed Successfully', 'user_type_creation' => $user_type_creation, 'staff_creation' => $staff_creation, 'assign_type_creation' => $assign_type_creation], 200);
    }

    public function user_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();
        $password = \Illuminate\Support\Facades\Hash::make($request->input('password'));

        $form_create = new UserCreation();
        $form_create->entry_date = $entry_date;
        $form_create->user_type_id = $request->input('user_type_id');
        $form_create->staff_id = $request->input('staff_id');
        $form_create->assign_type_id = $request->input('assign_type_id');
        $form_create->mobile_number = $request->input('mobile_number');
        $form_create->mail_id = $request->input('mail_id');
        $form_create->user_name = $request->input('user_name');
        $form_create->password = $password;
        $form_create->confirm_password = $password;
        $form_create->description = $request->input('description');
        $form_create->status = $request->input('status');
        $form_create->delete_status = 'no';
        $form_create->created_user_id = $user_id;
        $form_create->created_ipaddress = $ipaddress;

        if ($form_create->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function user_creation_edit(Request $request)
    {
        $user_id = $request->input('user_id');

        if (empty($user_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $user_creation_edit = UserCreation::select('*','id as user_id')
            ->where('delete_status', 'no')
            ->where('id', $user_id)
            ->get();

        $user_type_creation = UserTypeCreation::select('id as user_type_id', 'user_type_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();
        $staff_creation = StaffCreation::select('id as staff_id', 'staff_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();
        $assign_type_creation = AssignTypeCreation::select('id as assign_type_id', 'assign_type_name')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();
        if ($user_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'user_type_creation' => $user_type_creation, 'staff_creation' => $staff_creation, 'assign_type_creation' => $assign_type_creation, 'user_creation_edit' => $user_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function user_creation_update(Request $request)
    {
        $user_id = $request->input('user_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($user_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = UserCreation::where('id',$user_id)->where('delete_status','no')->first();
        $form_update->user_type_id = $request->input('user_type_id');
        $form_update->staff_id = $request->input('staff_id');
        $form_update->assign_type_id = $request->input('assign_type_id');
        $form_update->mobile_number = $request->input('mobile_number');
        $form_update->mail_id = $request->input('mail_id');
        $form_update->user_name = $request->input('user_name');
        if($request->input('password') != ''){
            $password = \Illuminate\Support\Facades\Hash::make($request->input('password'));
            $form_update->password = $password;
            $form_update->confirm_password = $password;
        }
        $form_update->description = $request->input('description');
        $form_update->status = $request->input('status');
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    public function user_creation_delete(Request $request)
    {
        $user_id = $request->input('user_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($user_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = UserCreation::find($user_id);
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
