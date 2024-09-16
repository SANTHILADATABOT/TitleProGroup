<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\WorkFlowGroupCreation;
use App\Models\Master\WorkFlowCreation;
use App\Models\Master\TaskCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Shuchkin\SimpleXLSX;
require_once('SimpleXLSX.php');

class WorkFlowGroupCreationController extends Controller
{
    public function work_flow_group_creation_index(Request $request)
    {
        $work_flow_group_creation_index = WorkFlowGroupCreation::select('id as work_flow_group_id', 'entry_date', 'work_flow_group_name', 'description', 'status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at')
            ->where('delete_status', 'no')
            ->orderBy('id', 'desc')
            ->get();

        $work_flow_group_creation_index = $work_flow_group_creation_index->map(function ($item) {
            $item->created_at = Carbon::parse($item->created_at)->format('Y-m-d H:i:s');
            $item->updated_at = Carbon::parse($item->updated_at)->format('Y-m-d H:i:s');
            return $item;
        });

        if ($work_flow_group_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'work_flow_group_creation_index' => $work_flow_group_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function work_flow_group_creation_create(Request $request)
    {
        //
    }

    public function work_flow_group_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $work_flow_group_name = $request->input('work_flow_group_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new WorkFlowGroupCreation();
        $form_create->entry_date = $entry_date;
        $form_create->work_flow_group_name = $work_flow_group_name;
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

    public function work_flow_group_creation_edit(Request $request)
    {
        $work_flow_group_id = $request->input('work_flow_group_id');

        if (empty($work_flow_group_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $work_flow_group_creation_edit = WorkFlowGroupCreation::select('id as work_flow_group_id', 'entry_date', 'work_flow_group_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $work_flow_group_id)
            ->get();

        if ($work_flow_group_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'work_flow_group_creation_edit' => $work_flow_group_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function work_flow_group_creation_update(Request $request)
    {
        $work_flow_group_id = $request->input('work_flow_group_id');
        $work_flow_group_name = $request->input('work_flow_group_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($work_flow_group_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = WorkFlowGroupCreation::find($work_flow_group_id);
        $form_update->work_flow_group_name = $work_flow_group_name;
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

    public function work_flow_group_creation_delete(Request $request)
    {
        $work_flow_group_id = $request->input('work_flow_group_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($work_flow_group_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = WorkFlowGroupCreation::find($work_flow_group_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function work_flow_group_creation_import_excel(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls'
        ]);

        $file = $request->file('file');
        $entry_date = Carbon::now()->toDateString();

        if (!$file || !$file->isValid()) {
            return response()->json(['status' => 'ERROR', 'message' => 'Invalid file upload'], 400);
        }

        try {
            $xlsx = SimpleXLSX::parse($file);

            if ($xlsx === false) {
                return response()->json(['status' => 'ERROR', 'message' => 'Failed to parse Excel file'], 500);
            }

            $reader_xl = $xlsx->rows();
            $importedRows = 0;
            $failedRows = [];

            for ($i1 = 1; $i1 < count($reader_xl); $i1++) {
                $reader_xl1 = $reader_xl[$i1];

                if ($reader_xl1[0] != '') {
                    $data_1 = [
                        'entry_date'            => $entry_date,
                        'work_flow_group_name'  => $reader_xl1[0],
                        'description'           => $reader_xl1[1],
                        'status'                => $reader_xl1[2],
                    ];

                    $work_flow_group_creation = WorkFlowGroupCreation::create($data_1);
                    $work_flow_group_id = $work_flow_group_creation->id;
                } else {
                    $work_flow_group_creation = WorkFlowGroupCreation::where('delete_status', 'no')->orderBy('id', 'desc')->first();
                    $work_flow_group_id = $work_flow_group_creation->id;
                }

                if ($reader_xl1[3] != '') {

                    if ($reader_xl1[0] != '') {
                        $place_after = 0;
                    } else {
                        $work_flow_creation = WorkFlowCreation::where('delete_status', 'no')->orderBy('id', 'desc')->first();
                        $place_after = $work_flow_creation->id;
                    }

                    $data_2 = [
                        'entry_date'            => $entry_date,
                        'work_flow_group_id'    => $work_flow_group_id,
                        'work_flow_name'        => $reader_xl1[3],
                        'place_after'           => $place_after,
                        'description'           => $reader_xl1[4],
                        'status'                => $reader_xl1[5],
                    ];

                    $work_flow_creation = WorkFlowCreation::create($data_2);
                    $work_flow_id = $work_flow_creation->id;
                } else {
                    $work_flow_creation = WorkFlowCreation::where('delete_status', 'no')->orderBy('id', 'desc')->first();
                    $work_flow_id = $work_flow_creation->id;
                }

                if ($reader_xl1[6] != '') {
                    if ($reader_xl1[3] != '') {
                        $when_1 = 0;
                    } else {
                        $task_creation = TaskCreation::where('delete_status', 'no')->orderBy('id', 'desc')->first();
                        $when_1 = $task_creation->id;
                    }

                    $data_3 = [
                        'entry_date'            => $entry_date,
                        'work_flow_group_id'    => $work_flow_group_id,
                        'work_flow_id'          => $work_flow_id,
                        'task_name'             => $reader_xl1[6],
                        'when_1'                => $when_1,
                        'specific_task'         => $reader_xl1[7],
                        'assign_task_group'     => $reader_xl1[8],
                        'assign_type_id'        => $reader_xl1[9],
                        'assign_user_id'        => $reader_xl1[10],
                        'description'           => $reader_xl1[11],
                        'status'                => $reader_xl1[12],
                    ];

                    $task_creation = TaskCreation::create($data_3);
                }

                if ($work_flow_group_creation && $work_flow_creation && $task_creation) {
                    $importedRows++;
                } else {
                    $failedRows[] = $data_1;
                }
            }

            if ($importedRows > 0) {
                return response()->json(['status' => 'SUCCESS', 'message' => 'Excel Imported Successfully', 'imported_rows' => $importedRows, 'failed_rows' => $failedRows], 200);
            } else {
                return response()->json(['status' => 'ERROR', 'message' => 'No rows were imported'], 500);
            }

        } catch (\Exception $e) {
            return response()->json(['status' => 'ERROR', 'message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}
