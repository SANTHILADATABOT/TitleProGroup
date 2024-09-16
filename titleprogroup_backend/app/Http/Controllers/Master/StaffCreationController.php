<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\CountyCreation;
use App\Models\Master\StateCreation;
use App\Models\Master\DepartmentCreation;
use App\Models\Master\StaffCategoryCreation;
use App\Models\Master\StaffCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StaffCreationController extends Controller
{
    public function staff_creation_index(Request $request)
    {
        $staff_creation_index = StaffCreation::select('id as staff_id', 'entry_date', 'department_id', 'staff_category_id', 'staff_name', 'gender', 'marital_status', 'dob', 'email_id', 'mobile_number', 'emergency_mobile_number', 'county_id', 'state_id', 'city_name', 'address', 'zipcode', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($staff_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'staff_creation_index' => $staff_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function staff_creation_create(Request $request)
    {
        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();
        $department_creation = DepartmentCreation::select('id as department_id',  'entry_date', 'department_name')
            ->where('delete_status', 'no')
            ->get();

        $staff_category_creation = StaffCategoryCreation::select('id as staff_category_id', 'staff_category_name')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'department_creation' => $department_creation, 'staff_category_creation' => $staff_category_creation], 200);
    }

    public function staff_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $department_id = $request->input('department_id');
        $staff_category_id = $request->input('staff_category_id');
        $staff_name = $request->input('staff_name');
        $gender = $request->input('gender');
        $marital_status = $request->input('marital_status');
        $dob = $request->input('dob');
        $email_id = $request->input('email_id');
        $mobile_number = $request->input('mobile_number');
        $emergency_mobile_number = $request->input('emergency_mobile_number');
        $county_id = $request->input('county_id');
        $state_id = $request->input('state_id');
        $city_name = $request->input('city_name');
        $address = $request->input('address');
        $zipcode = $request->input('zipcode');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new StaffCreation();
        $form_create->entry_date = $entry_date;
        $form_create->department_id = $department_id;
        $form_create->staff_category_id = $staff_category_id;
        $form_create->staff_name = $staff_name;
        $form_create->gender = $gender;
        $form_create->marital_status = $marital_status;
        $form_create->dob = $dob;
        $form_create->email_id = $email_id;
        $form_create->mobile_number = $mobile_number;
        $form_create->emergency_mobile_number = $emergency_mobile_number;
        $form_create->county_id = $county_id;
        $form_create->state_id = $state_id;
        $form_create->city_name = $city_name;
        $form_create->address = $address;
        $form_create->zipcode = $zipcode;
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

    public function staff_creation_edit(Request $request)
    {
        $staff_id = $request->input('staff_id');

        if (empty($staff_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();
        $department_creation = DepartmentCreation::select('id as department_id',  'entry_date', 'department_name')
            ->where('delete_status', 'no')
            ->get();

        $staff_category_creation = StaffCategoryCreation::select('id as staff_category_id', 'staff_category_name')
            ->where('delete_status', 'no')
            ->get();

        $staff_creation_edit = StaffCreation::select('id as staff_id', 'entry_date', 'department_id', 'staff_category_id', 'staff_name', 'gender', 'marital_status', 'dob', 'email_id', 'mobile_number', 'emergency_mobile_number', 'county_id', 'state_id', 'city_name', 'address', 'zipcode', 'status')
            ->where('delete_status', 'no')
            ->where('id', $staff_id)
            ->get();

        if ($staff_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'staff_creation_edit' => $staff_creation_edit, 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'department_creation' => $department_creation, 'staff_category_creation' => $staff_category_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function staff_creation_update(Request $request)
    {
        $staff_id = $request->input('staff_id');
        $department_id = $request->input('department_id');
        $staff_category_id = $request->input('staff_category_id');
        $staff_name = $request->input('staff_name');
        $gender = $request->input('gender');
        $marital_status = $request->input('marital_status');
        $dob = $request->input('dob');
        $email_id = $request->input('email_id');
        $mobile_number = $request->input('mobile_number');
        $emergency_mobile_number = $request->input('emergency_mobile_number');
        $county_id = $request->input('county_id');
        $state_id = $request->input('state_id');
        $city_name = $request->input('city_name');
        $address = $request->input('address');
        $zipcode = $request->input('zipcode');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($staff_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = StaffCreation::find($staff_id);
        $form_update->department_id = $department_id;
        $form_update->staff_category_id = $staff_category_id;
        $form_update->staff_name = $staff_name;
        $form_update->gender = $gender;
        $form_update->marital_status = $marital_status;
        $form_update->dob = $dob;
        $form_update->email_id = $email_id;
        $form_update->mobile_number = $mobile_number;
        $form_update->emergency_mobile_number = $emergency_mobile_number;
        $form_update->county_id = $county_id;
        $form_update->state_id = $state_id;
        $form_update->city_name = $city_name;
        $form_update->address = $address;
        $form_update->zipcode = $zipcode;
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

    public function staff_creation_delete(Request $request)
    {
        $staff_id = $request->input('staff_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($staff_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = StaffCreation::find($staff_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function staff_creation_creation_state_dependency(Request $request)
    {
        $state_id = $request->input('state_id');

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('state_id', $state_id)
            ->get();
        return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'county_creation' => $county_creation], 200);
    }
}
