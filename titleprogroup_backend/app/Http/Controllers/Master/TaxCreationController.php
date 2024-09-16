<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\TaxCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class TaxCreationController extends Controller
{
    public function tax_creation_index(Request $request)
    {
        $tax_creation_index = TaxCreation::select('id as tax_id', 'entry_date', 'tax_name', 'tax_percentage', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($tax_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'tax_creation_index' => $tax_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function tax_creation_create(Request $request)
    {
        //
    }

    public function tax_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $tax_name = $request->input('tax_name');
        $tax_percentage = $request->input('tax_percentage');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new TaxCreation();
        $form_create->entry_date = $entry_date;
        $form_create->tax_name = $tax_name;
        $form_create->tax_percentage = $tax_percentage;
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

    public function tax_creation_edit(Request $request)
    {
        $tax_id = $request->input('tax_id');

        if (empty($tax_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $tax_creation_edit = TaxCreation::select('id as tax_id', 'entry_date', 'tax_name', 'tax_percentage', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $tax_id)
            ->get();

        if ($tax_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'tax_creation_edit' => $tax_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function tax_creation_update(Request $request)
    {
        $tax_id = $request->input('tax_id');
        $tax_name = $request->input('tax_name');
        $tax_percentage = $request->input('tax_percentage');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($tax_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = TaxCreation::find($tax_id);
        $form_update->tax_name = $tax_name;
        $form_update->tax_percentage = $tax_percentage;
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

    public function tax_creation_delete(Request $request)
    {
        $tax_id = $request->input('tax_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($tax_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = TaxCreation::find($tax_id);
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
