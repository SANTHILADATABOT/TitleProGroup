<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\ContactTypeCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ContactTypeCreationController extends Controller
{
    public function contact_type_creation_index(Request $request)
    {
        $contact_type_creation_index = ContactTypeCreation::select('id as contact_type_id',  'entry_date', 'contact_type_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($contact_type_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'contact_type_creation_index' => $contact_type_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function contact_type_creation_create(Request $request)
    {
        //
    }

    public function contact_type_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $contact_type_name = $request->input('contact_type_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new ContactTypeCreation();
        $form_create->entry_date = $entry_date;
        $form_create->contact_type_name = $contact_type_name;
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

    public function contact_type_creation_edit(Request $request)
    {
        $contact_type_id = $request->input('contact_type_id');

        if (empty($contact_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $contact_type_creation_edit = ContactTypeCreation::select('id as contact_type_id',  'entry_date', 'contact_type_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $contact_type_id)
            ->get();

        if ($contact_type_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'contact_type_creation_edit' => $contact_type_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function contact_type_creation_update(Request $request)
    {
        $contact_type_id = $request->input('contact_type_id');
        $contact_type_name = $request->input('contact_type_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($contact_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = ContactTypeCreation::find($contact_type_id);
        $form_update->contact_type_name = $contact_type_name;
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

    public function contact_type_creation_delete(Request $request)
    {
        $contact_type_id = $request->input('contact_type_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($contact_type_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = ContactTypeCreation::find($contact_type_id);
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
