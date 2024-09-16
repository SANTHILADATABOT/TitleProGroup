<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\CountyCreation;
use App\Models\Master\StateCreation;
use App\Models\Master\CustomerCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CustomerCreationController extends Controller
{
    public function customer_creation_index(Request $request)
    {
        $customer_creation_index = CustomerCreation::select('customer_creation.id as customer_id', 'customer_creation.entry_date', 'customer_creation.customer_name', 'customer_creation.gender', 'customer_creation.marital_status', 'customer_creation.dob', 'customer_creation.email_id', 'customer_creation.mobile_number', 'customer_creation.emergency_mobile_number', 'customer_creation.aadhar_number', 'customer_creation.pan_number', 'customer_creation.country_id', 'county_creation.country_name', 'customer_creation.state_id', 'state_creation.state_name', 'customer_creation.city_name', 'customer_creation.address', 'customer_creation.zipcode', 'customer_creation.description', 'customer_creation.status')
            ->leftjoin('county_creation', 'county_creation.id', '=', 'customer_creation.county_id')
            ->leftjoin('state_creation', 'state_creation.id', '=', 'customer_creation.state_id')
            ->where('customer_creation.delete_status', 'no')
            ->where('county_creation.delete_status', 'no')
            ->where('state_creation.delete_status', 'no')
            ->get();

        if ($customer_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'customer_creation_index' => $customer_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function customer_creation_create(Request $request)
    {
        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_id', 'state_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation], 200);
    }

    public function customer_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $customer_name = $request->input('customer_name');
        $gender = $request->input('gender');
        $marital_status = $request->input('marital_status');
        $dob = $request->input('dob');
        $email_id = $request->input('email_id');
        $mobile_number = $request->input('mobile_number');
        $emergency_mobile_number = $request->input('emergency_mobile_number');
        $aadhar_number = $request->input('aadhar_number');
        $pan_number = $request->input('pan_number');
        $country_id = $request->input('country_id');
        $state_id = $request->input('state_id');
        $city_name = $request->input('city_name');
        $address = $request->input('address');
        $zipcode = $request->input('zipcode');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new CustomerCreation();
        $form_create->entry_date = $entry_date;
        $form_create->customer_name = $customer_name;
        $form_create->gender = $gender;
        $form_create->marital_status = $marital_status;
        $form_create->dob = $dob;
        $form_create->email_id = $email_id;
        $form_create->mobile_number = $mobile_number;
        $form_create->emergency_mobile_number = $emergency_mobile_number;
        $form_create->aadhar_number = $aadhar_number;
        $form_create->pan_number = $pan_number;
        $form_create->country_id = $country_id;
        $form_create->state_id = $state_id;
        $form_create->city_name = $city_name;
        $form_create->address = $address;
        $form_create->zipcode = $zipcode;
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

    public function customer_creation_edit(Request $request)
    {
        $customer_id = $request->input('customer_id');

        if (empty($customer_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_id', 'state_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        $customer_creation_edit = CustomerCreation::select('id as customer_id', 'entry_date', 'department_id', 'staff_category_id', 'customer_name', 'gender', 'marital_status', 'dob', 'email_id', 'mobile_number', 'emergency_mobile_number', 'aadhar_number', 'pan_number', 'country_id', 'state_id', 'city_name', 'address', 'zipcode', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $customer_id)
            ->get();

        if ($customer_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'customer_creation_edit' => $customer_creation_edit, 'county_creation' => $county_creation, 'state_creation' => $state_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function customer_creation_update(Request $request)
    {
        $customer_id = $request->input('customer_id');
        $customer_name = $request->input('customer_name');
        $gender = $request->input('gender');
        $marital_status = $request->input('marital_status');
        $dob = $request->input('dob');
        $email_id = $request->input('email_id');
        $mobile_number = $request->input('mobile_number');
        $emergency_mobile_number = $request->input('emergency_mobile_number');
        $aadhar_number = $request->input('aadhar_number');
        $pan_number = $request->input('pan_number');
        $country_id = $request->input('country_id');
        $state_id = $request->input('state_id');
        $city_name = $request->input('city_name');
        $address = $request->input('address');
        $zipcode = $request->input('zipcode');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($customer_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = CustomerCreation::find($customer_id);
        $form_update->customer_name = $customer_name;
        $form_update->gender = $gender;
        $form_update->marital_status = $marital_status;
        $form_update->dob = $dob;
        $form_update->email_id = $email_id;
        $form_update->mobile_number = $mobile_number;
        $form_update->emergency_mobile_number = $emergency_mobile_number;
        $form_update->aadhar_number = $aadhar_number;
        $form_update->pan_number = $pan_number;
        $form_update->country_id = $country_id;
        $form_update->state_id = $state_id;
        $form_update->city_name = $city_name;
        $form_update->address = $address;
        $form_update->zipcode = $zipcode;
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

    public function customer_creation_delete(Request $request)
    {
        $customer_id = $request->input('customer_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($customer_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = CustomerCreation::find($customer_id);
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
