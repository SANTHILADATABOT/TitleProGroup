<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\CompanyCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CompanyCreationController extends Controller
{
    public function company_creation_index(Request $request)
    {
        $company_creation_filter = CompanyCreation::select('id as company_id', 'company_name', 'mobile_number', 'email_id')
            ->where('delete_status', 'no')
            ->get();

        $company_creation_index = CompanyCreation::select('id as company_id', 'entry_date', 'company_name', 'address', 'mobile_number', 'phone_number', 'gst_number', 'tin_number', 'email_id', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($company_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'company_creation_filter' => $company_creation_filter, 'company_creation_index' => $company_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function create(Request $request) {
        //
    }

    public function company_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $company_name = $request->input('company_name');
        $address = $request->input('address');
        $mobile_number = $request->input('mobile_number');
        $phone_number = $request->input('phone_number');
        $gst_number = $request->input('gst_number');
        $tin_number = $request->input('tin_number');
        $email_id = $request->input('email_id');
        $status = $request->input('status');
        $image_name = $request->input('image_name');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new CompanyCreation();
        $form_create->entry_date = $entry_date;
        $form_create->company_name = $company_name;
        $form_create->address = $address;
        $form_create->mobile_number = $mobile_number;
        $form_create->phone_number = $phone_number;
        $form_create->gst_number = $gst_number;
        $form_create->tin_number = $tin_number;
        $form_create->email_id = $email_id;
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

    public function company_creation_edit(Request $request)
    {
        $company_id = $request->input('company_id');

        if (empty($company_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Company Id Not Found'], 404);
        }

        $company_creation_edit = CompanyCreation::select('id as company_id', 'entry_date', 'company_name', 'address', 'mobile_number', 'phone_number', 'gst_number', 'tin_number', 'email_id', 'status')
            ->where('delete_status', 'no')
            ->where('id', $company_id)
            ->get();

        if ($company_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'company_creation_edit' => $company_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function company_creation_update(Request $request)
    {
        $company_id = $request->input('company_id');
        $company_name = $request->input('company_name');
        $address = $request->input('address');
        $mobile_number = $request->input('mobile_number');
        $phone_number = $request->input('phone_number');
        $gst_number = $request->input('gst_number');
        $tin_number = $request->input('tin_number');
        $email_id = $request->input('email_id');
        $status = $request->input('status');
        $image_name = $request->input('image_name');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($company_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = CompanyCreation::find($company_id);
        $form_update->company_name = $company_name;
        $form_update->address = $address;
        $form_update->mobile_number = $mobile_number;
        $form_update->phone_number = $phone_number;
        $form_update->gst_number = $gst_number;
        $form_update->tin_number = $tin_number;
        $form_update->email_id = $email_id;
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

    public function company_creation_delete(Request $request)
    {
        $company_id = $request->input('company_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($company_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = CompanyCreation::find($company_id);
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
