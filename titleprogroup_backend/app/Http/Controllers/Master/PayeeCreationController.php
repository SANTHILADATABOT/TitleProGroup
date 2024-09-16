<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\PayeeCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PayeeCreationController extends Controller
{
    public function payee_creation_index(Request $request)
    {
        $payee_creation_index = PayeeCreation::select('id as payee_id',  'entry_date', 'payee_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($payee_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'payee_creation_index' => $payee_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function payee_creation_create(Request $request)
    {
        //
    }

    public function payee_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $payee_name = $request->input('payee_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new PayeeCreation();
        $form_create->entry_date = $entry_date;
        $form_create->payee_name = $payee_name;
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

    public function payee_creation_edit(Request $request)
    {
        $payee_id = $request->input('payee_id');

        if (empty($payee_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $payee_creation_edit = PayeeCreation::select('id as payee_id',  'entry_date', 'payee_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $payee_id)
            ->get();

        if ($payee_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'payee_creation_edit' => $payee_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function payee_creation_update(Request $request)
    {
        $payee_id = $request->input('payee_id');
        $payee_name = $request->input('payee_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($payee_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = PayeeCreation::find($payee_id);
        $form_update->payee_name = $payee_name;
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

    public function payee_creation_delete(Request $request)
    {
        $payee_id = $request->input('payee_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($payee_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = PayeeCreation::find($payee_id);
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
