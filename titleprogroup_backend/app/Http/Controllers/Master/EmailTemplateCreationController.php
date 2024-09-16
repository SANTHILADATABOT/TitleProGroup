<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\EmailTemplateCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EmailTemplateCreationController extends Controller
{
    public function email_template_creation_index(Request $request)
    {
        $email_template_creation_index = EmailTemplateCreation::select('id as email_template_id',  'entry_date', 'email_template_name', 'email_subject', 'email_content', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($email_template_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'email_template_creation_index' => $email_template_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function email_template_creation_create(Request $request)
    {
        //
    }

    public function email_template_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $email_template_name = $request->input('email_template_name');
        $email_subject = $request->input('email_subject');
        $email_content = $request->input('email_content');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new EmailTemplateCreation();
        $form_create->entry_date = $entry_date;
        $form_create->email_template_name = $email_template_name;
        $form_create->email_subject = $email_subject;
        $form_create->email_content = $email_content;
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

    public function email_template_creation_edit(Request $request)
    {
        $email_template_id = $request->input('email_template_id');

        if (empty($email_template_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $email_template_creation_edit = EmailTemplateCreation::select('id as email_template_id',  'entry_date', 'email_template_name', 'email_subject', 'email_content', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $email_template_id)
            ->get();

        if ($email_template_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'email_template_creation_edit' => $email_template_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function email_template_creation_update(Request $request)
    {
        $email_template_id = $request->input('email_template_id');
        $email_template_name = $request->input('email_template_name');
        $email_subject = $request->input('email_subject');
        $email_content = $request->input('email_content');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($email_template_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = EmailTemplateCreation::find($email_template_id);
        $form_update->email_template_name = $email_template_name;
        $form_update->email_subject = $email_subject;
        $form_update->email_content = $email_content;
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

    public function email_template_creation_delete(Request $request)
    {
        $email_template_id = $request->input('email_template_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($email_template_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = EmailTemplateCreation::find($email_template_id);
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
