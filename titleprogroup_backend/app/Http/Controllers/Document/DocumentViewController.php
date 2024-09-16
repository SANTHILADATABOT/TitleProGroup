<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserCreation;
use App\Models\Document\DocumentView;
use App\Models\Orders\OrdersFileHistory;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\File;

class DocumentViewController extends Controller
{
    private function get_folder_path($folder_id)
    {
        $document_view_index = DocumentView::select('id', 'file_name', 'type', 'extension', 'size', 'saved_file', 'folder_id')->where('id',$folder_id)->first();

        $folder_path = [];
        if($document_view_index != null){
            if(($document_view_index->folder_id != '0') && ($document_view_index->type == 'folder')){
                $folder_path = $this->get_folder_path($document_view_index->folder_id);
            }
            $folder_path[] = $document_view_index->file_name;
        }
        return $folder_path;
    }
    public function document_view_index(Request $request)
    {
        $folder_id = $request->input('folder_id');
        $order_id = $request->input('order_id');
        $document_view_index = [];
        $document_view_index1 = DocumentView::select('id', 'file_name', 'type', 'extension', 'size', 'saved_file', 'folder_id')->where('folder_id',$folder_id)->where('order_id',$order_id)->where('type','folder')->orderBy('file_name','asc')->get();
        if ($document_view_index1 != null) {
            foreach ($document_view_index1 as $document_view_index11) {
                $document_view_index[] = $document_view_index11;
            }
        }
        $document_view_index2 = DocumentView::select('id', 'file_name', 'type', 'extension', 'size', 'saved_file', 'folder_id')->where('folder_id',$folder_id)->where('order_id',$order_id)->where('type','!=','folder')->orderBy('file_name','asc')->get();
        if ($document_view_index2 != null) {
            foreach ($document_view_index2 as $document_view_index21) {
                $document_view_index[] = $document_view_index21;
            }
        }
        $folder_path = $this->get_folder_path($folder_id);

        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'document_view_index' => $document_view_index,'folder_path' => '/'.implode('/',$folder_path)], 200);
    }
    public function document_view_logs(Request $request)
    {
        $order_id = $request->input('order_id');

        $fil_tb = (new OrdersFileHistory())->getTable();
        $usercr_tb = (new UserCreation())->getTable();
        $orders_file_history1 = OrdersFileHistory::selectRaw("$fil_tb.*,(select user_name from $usercr_tb where id=$fil_tb.created_user_id) as uploaded_by")->where("$fil_tb.order_id",$order_id)->get();
        if ($orders_file_history1 != null) {
            $orders_file_history = $orders_file_history1;
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'orders_file_history' => $orders_file_history], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }

        /* $doc_tb = (new DocumentView())->getTable();
        $usercr_tb = (new UserCreation())->getTable();
        $document_view_logs1 = DocumentView::selectRaw("$doc_tb.*,(select user_name from $usercr_tb where id=$doc_tb.created_user_id) as uploaded_by,(select user_name from $usercr_tb where id=$doc_tb.updated_user_id) as last_modified_by")->where('order_id', $order_id)->orderBy('id','asc')->get();
        if ($document_view_logs1 != null) {
            $document_view_logs = [];
            foreach ($document_view_logs1 as $document_view_logs11) {
                $document_view_logs11->created_at = (new DateTime($document_view_logs11->created_at))->format('d/m/Y H:i:s');
                $document_view_logs11->updated_at = (new DateTime($document_view_logs11->updated_at))->format('d/m/Y H:i:s');
                $document_view_logs[] = $document_view_logs11;
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'document_view_logs' => $document_view_logs], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        } */
    }

    public function document_view_insert_file(Request $request)
    {
        $order_id = $request->input('order_id');
        $entry_date = Carbon::now()->toDateString();
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];

        $type = $request->input('type');
        $form_create = new DocumentView([
            'entry_date' => $entry_date,
            'file_name' => $request->input('file_name'),
            'type' => $type,
            'extension' => $request->input('extension'),
            'size' => $request->input('size'),
            'folder_id' => $request->input('folder_id'),
            'order_id' => $order_id,
            'created_user_id' => '1',
            'created_ipaddress' => $created_ipaddress
        ]);
        if ($form_create->save()) {
            $order_file_history = new OrdersFileHistory([
                'entry_date' => $entry_date,
                'order_id' => $request->input('order_id'),
                'user_id' => '1',
                'entry_name' => 'Documents',
                'action' => 'Created New File, Filename: '.$request->input('file_name'),
                'created_datetime' => Carbon::now(),
                'created_user_id' => '1',
                'created_ipaddress' => $created_ipaddress
            ]);
            $order_file_history->save();
            if(($type == 'file') || ($type == 'image')){
                if ($request->hasFile('file')) {
                    $file = $request->file('file');
                    $fileName = 'file_view_'.strval($form_create->id).'.' . $file->getClientOriginalExtension();
                    $file->move(public_path('uploads/file_view'), $fileName);
                    $form_create->saved_file = $fileName;
                    $form_create->save();
                }
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }
    public function document_view_insert_folder(Request $request)
    {
        $order_id = $request->input('order_id');
        $entry_date = Carbon::now()->toDateString();
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];

        $form_create = new DocumentView([
            'entry_date' => $entry_date,
            'file_name' => $request->input('file_name'),
            'type' => 'folder',
            'folder_id' => $request->input('folder_id'),
            'order_id' => $order_id,
            'created_user_id' => '1',
            'created_ipaddress' => $created_ipaddress
        ]);
        if ($form_create->save()) {
            $order_file_history = new OrdersFileHistory([
                'entry_date' => $entry_date,
                'order_id' => $request->input('order_id'),
                'user_id' => '1',
                'entry_name' => 'Documents',
                'action' => 'Created New Folder, Folder Name: '.$request->input('file_name'),
                'created_datetime' => Carbon::now(),
                'created_user_id' => '1',
                'created_ipaddress' => $created_ipaddress
            ]);
            $order_file_history->save();
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function document_view_rename(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];

        $id = $request->input('id');
        $file_name = $request->input('file_name');
        $updated_ipaddress = $_SERVER['REMOTE_ADDR'];
        $form_update = DocumentView::find($id);
        if($form_update){
            if($form_update->file_name != $file_name){
                $old_name = $form_update->file_name;
                $form_update->file_name = $file_name;
                $form_update->updated_user_id = '1';
                $form_update->updated_ipaddress = $updated_ipaddress;
                $form_update->save();

                $order_file_history = new OrdersFileHistory([
                    'entry_date' => $entry_date,
                    'order_id' => $request->input('order_id'),
                    'user_id' => '1',
                    'entry_name' => 'Documents',
                    'action' => 'Rename '.$form_update->type.' from '.$old_name.' to '.$file_name,
                    'created_datetime' => Carbon::now(),
                    'created_user_id' => '1',
                    'created_ipaddress' => $created_ipaddress
                ]);
                $order_file_history->save();
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    private function sub_folder_count($id){
        $ids = []; $files = 0; $Folders = 0; $size = 0;
        $files1 = DocumentView::whereIn('id', $id)->get();
        if($files1 != null){
            foreach($files1 as $files2){
                $ids[] = $files2['id'];
                if($files2['type'] == 'folder'){
                    $Folders++;
                    $_id = DocumentView::where('folder_id', $files2['id'])->distinct()->pluck('id')->toArray();
                    if(count($_id) > 0){
                        $cnt1 = $this->sub_folder_count($_id);
                        foreach($cnt1['ids'] as $ids1){
                            $ids[] = $ids1;
                        }
                        $Folders += $cnt1['Folders'];
                        $files += $cnt1['files'];
                        $size += $cnt1['size'];
                    }
                }else{
                    $files++;
                    $s1 = 0;
                    if(str_contains($files2['size'], ' GB')){
                        $s1 = (floatval(str_replace(' GB', '', $files2['size']))*(1024*1024));
                    }else if(str_contains($files2['size'], ' MB')){
                        $s1 = (floatval(str_replace(' MB', '', $files2['size']))*1024);
                    }else if(str_contains($files2['size'], ' KB')){
                        $s1 = (floatval(str_replace(' KB', '', $files2['size'])));
                    }
                    $size += $s1;
                }
            }
        }
        return ['ids' => $ids, 'files' => $files, 'Folders' => $Folders, 'size' => $size];
    }
    public function document_view_get_count(Request $request)
    {
        $id = ($request->input('id')!='')?json_decode($request->input('id'),true):[];
        $cnt = $this->sub_folder_count($id);
        return response()->json(['status' => 'SUCCESS', 'ids' => $cnt['ids'], 'files' => $cnt['files'], 'Folders' => $cnt['Folders'], 'size' => $cnt['size']], 200);
    }

    public function document_view_delete(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];

        $id = json_decode($request->input('id'),true);
        $files1 = DocumentView::whereIn('id', $id)->get();
        if($files1 != null){
            foreach($files1 as $files2){
                $imagePath = public_path('uploads/file_view/'.$files2['saved_file']);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
            }
            DocumentView::whereIn('id', $id)->delete();

            $order_file_history = new OrdersFileHistory([
                'entry_date' => $entry_date,
                'order_id' => $request->input('order_id'),
                'user_id' => '1',
                'entry_name' => 'Documents',
                'action' => 'Deleted '.$request->input('action_lb'),
                'created_datetime' => Carbon::now(),
                'created_user_id' => '1',
                'created_ipaddress' => $created_ipaddress
            ]);
            $order_file_history->save();
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        }
    }
}
