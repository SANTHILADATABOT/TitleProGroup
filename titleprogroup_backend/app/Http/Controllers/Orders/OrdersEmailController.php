<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserCreation;
use App\Models\Orders\OrderEmail;
use App\Models\Orders\OrdersNote;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrdersEmailController extends Controller
{
    public function order_email_index(Request $request)
    {
        $order_id = $request->input('order_id');

        $order_email_index = OrderEmail::select('id','entry_date','to_mail','cc_mail','email_template_id','subject','body','created_at')
            ->where('order_id', $order_id)
            ->get();

        if ($order_email_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'order_email_index' => $order_email_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function order_email_create(Request $request)
    {
        /* $user_creation = UserCreation::select('id as user_creation_id', 'user_name')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'user_creation' => $user_creation], 200); */
    }

    public function order_email_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $ipaddress = $request->ip();

        $form_create = new OrderEmail([
            'entry_date' => $entry_date,
            'to_mail' => $request->input('to_mail'),
            'cc_mail' => $request->input('cc_mail'),
            'email_template_id' => $request->input('email_template_id'),
            'subject' => $request->input('subject'),
            'body' => $request->input('body'),
            'order_id' => $request->input('order_id'),
            'created_user_id' => '1',
            'created_ipaddress' => $ipaddress
        ]);

        if ($form_create->save()) {
            $mail = [];
            $to_mail = json_decode($request->input('to_mail'), true);
            foreach($to_mail as $to_mail1){
                $mail[] = $to_mail1;
            }
            $cc_mail = json_decode($request->input('cc_mail'), true);
            foreach($cc_mail as $cc_mail1){
                $mail[] = $cc_mail1;
            }
            $pdfFilePath = '';
            $selectedFilesName = '';
            $files = [];
            if ($request->hasFile('selectedFiles')) {
                $saved_file = [];
                $selectedFiles = $request->file('selectedFiles');
                foreach ($selectedFiles as $index1 => $selectedFiles1) {
                    // $path = $file->store('uploads', 'public');
                    $selectedFilesName = 'mail_attach_'.strval($form_create->id).'_'.$index1.'.' . $selectedFiles1->getClientOriginalExtension();
                    $selectedFiles1->move(public_path('uploads/mail_attach'), $selectedFilesName);

                    $files[] = ['url'=>public_path('uploads/mail_attach/') . $selectedFilesName,'file_name'=>$selectedFilesName];

                    $saved_file[] = $selectedFilesName;
                }
                $form_create->saved_file = json_encode($saved_file);
                $form_create->save();
            }
            $res =  (new \App\Http\Controllers\Plugins\GmailController())->sentMail_attachments($mail, $form_create->subject, $form_create->body, $files);
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function order_email_view(Request $request)
    {
        $order_email_id = $request->input('order_email_id');

        if (empty($order_email_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $order_email_tb = (new OrderEmail())->getTable();
        $usercr_tb = (new UserCreation())->getTable();
        $order_email_view = OrderEmail::selectRaw("$order_email_tb.*,(select user_name from $usercr_tb where id=$order_email_tb.created_user_id) as created_user_name")
            ->where("$order_email_tb.id", $order_email_id)
            ->first();

        if ($order_email_view != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'order_email_view' => $order_email_view], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

}
