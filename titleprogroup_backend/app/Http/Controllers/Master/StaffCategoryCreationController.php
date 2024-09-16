<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\StaffCategoryCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StaffCategoryCreationController extends Controller
{
    public function staff_category_creation_index(Request $request)
    {
        $staff_category_creation_index = StaffCategoryCreation::select('id as staff_category_id',  'entry_date', 'staff_category_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($staff_category_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'staff_category_creation_index' => $staff_category_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function staff_category_creation_create(Request $request)
    {
        //
    }

    public function staff_category_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $staff_category_name = $request->input('staff_category_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new StaffCategoryCreation();
        $form_create->entry_date = $entry_date;
        $form_create->staff_category_name = $staff_category_name;
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

    public function staff_category_creation_edit(Request $request)
    {
        $staff_category_id = $request->input('staff_category_id');

        if (empty($staff_category_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $staff_category_creation_edit = StaffCategoryCreation::select('id as staff_category_id',  'entry_date', 'staff_category_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $staff_category_id)
            ->get();

        if ($staff_category_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'staff_category_creation_edit' => $staff_category_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function staff_category_creation_update(Request $request)
    {
        $staff_category_id = $request->input('staff_category_id');
        $staff_category_name = $request->input('staff_category_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($staff_category_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = StaffCategoryCreation::find($staff_category_id);
        $form_update->staff_category_name = $staff_category_name;
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

    public function staff_category_creation_delete(Request $request)
    {
        $staff_category_id = $request->input('staff_category_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($staff_category_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = StaffCategoryCreation::find($staff_category_id);
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
