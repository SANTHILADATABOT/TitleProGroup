<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Admin\UserCreation;
use App\Models\Orders\OrdersNote;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrdersNoteController extends Controller
{
    public function orders_note_index(Request $request)
    {
        $order_id = $request->input('order_id');

        $orders_note_index_fiter = OrdersNote::select('id', 'entry_date', 'order_id', 'dob', 'user_id', 'note')
            ->where('delete_status', 'no')
            ->orderBy('id', 'desc');
        if ($order_id != '') {
            $orders_note_index_fiter->where('order_id', $order_id);
        }

        $orders_note_filter_list = $orders_note_index_fiter->get();

        $orders_note_index = [];

        foreach ($orders_note_filter_list as $orders_note) {
            $user_creation = UserCreation::select('id as user_creation_id', 'user_name')
                ->where('delete_status', 'no')
                ->where('id', $orders_note->user_id)
                ->first();

            $user_name = $user_creation ? $user_creation->user_name : 'Unknown';

            $orders_note_index[] = [
                'orders_note_id' => $orders_note->id,
                'entry_date' => $orders_note->entry_date,
                'order_id' => $orders_note->order_id,
                'dob' => $orders_note->dob,
                'user_creation_id' => $orders_note->user_id,
                'user_name' => $user_name,
                'note' => $orders_note->note
            ];
        }

        if (count($orders_note_index) > 0) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'orders_note_index' => $orders_note_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function orders_note_create(Request $request)
    {
        $user_creation = UserCreation::select('id as user_creation_id', 'user_name')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'user_creation' => $user_creation], 200);
    }

    public function orders_note_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $order_id = $request->input('order_id');
        $dob = $request->input('dob');
        $user_creation_id= $request->input('user_creation_id');
        $note = $request->input('note');
        $user_id = $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new OrdersNote();
        $form_create->entry_date = $entry_date;
        $form_create->order_id = $order_id;
        $form_create->dob = $dob;
        $form_create->user_id = $user_creation_id;
        $form_create->note = $note;
        $form_create->delete_status = 'no';
        $form_create->created_user_id = $user_id;
        $form_create->created_ipaddress = $ipaddress;

        if ($form_create->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function orders_note_edit(Request $request)
    {
        $orders_note_id = $request->input('orders_note_id');

        if (empty($orders_note_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $user_creation = UserCreation::select('id as user_creation_id', 'user_name')
            ->where('delete_status', 'no')
            ->get();

        $orders_note_edit = OrdersNote::select('id as orders_note_id', 'entry_date', 'order_id', 'dob', 'user_id as user_creation_id', 'note')
            ->where('delete_status', 'no')
            ->where('id', $orders_note_id)
            ->get();

        if ($orders_note_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'user_creation' => $user_creation, 'orders_note_edit' => $orders_note_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function orders_note_update(Request $request)
    {
        $orders_note_id = $request->input('orders_note_id');
        $order_id = $request->input('order_id');
        $dob = $request->input('dob');
        $user_creation_id= $request->input('user_creation_id');
        $note = $request->input('note');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($orders_note_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = OrdersNote::find($orders_note_id);
        $form_update->order_id = $order_id;
        $form_update->dob = $dob;
        $form_update->user_id = $user_creation_id;
        $form_update->note = $note;
        $form_update->delete_status = 'no';
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    public function orders_note_delete(Request $request)
    {
        $orders_note_id = $request->input('orders_note_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($orders_note_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = OrdersNote::find($orders_note_id);
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
