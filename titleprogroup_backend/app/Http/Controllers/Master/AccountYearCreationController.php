<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\AccountYearCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AccountYearCreationController extends Controller
{
    public function account_year_creation_index(Request $request)
    {
        $account_year_creation_index = AccountYearCreation::select('id as account_year_id',  'entry_date', 'from_year', 'to_year', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($account_year_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'account_year_creation_index' => $account_year_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function account_year_creation_create(Request $request)
    {
        //
    }

    public function account_year_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $from_year = $request->input('from_year');
        $to_year = $request->input('to_year');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new AccountYearCreation();
        $form_create->entry_date = $entry_date;
        $form_create->from_year = $from_year;
        $form_create->to_year = $to_year;
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

    public function account_year_creation_edit(Request $request)
    {
        $account_year_id = $request->input('account_year_id');

        if (empty($account_year_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $account_year_creation_edit = AccountYearCreation::select('id as account_year_id',  'entry_date', 'from_year', 'to_year', 'status')
            ->where('delete_status', 'no')
            ->where('id', $account_year_id)
            ->get();

        if ($account_year_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'account_year_creation_edit' => $account_year_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function account_year_creation_update(Request $request)
    {
        $account_year_id = $request->input('account_year_id');
        $from_year = $request->input('from_year');
        $to_year = $request->input('to_year');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($account_year_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = AccountYearCreation::find($account_year_id);
        $form_update->from_year = $from_year;
        $form_update->to_year = $to_year;
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

    public function account_year_creation_delete(Request $request)
    {
        $account_year_id = $request->input('account_year_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($account_year_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = AccountYearCreation::find($account_year_id);
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
