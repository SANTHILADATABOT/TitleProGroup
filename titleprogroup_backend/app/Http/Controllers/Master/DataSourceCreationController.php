<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\CountyCreation;
use App\Models\Master\StateCreation;
use App\Models\Master\DataSourceCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Shuchkin\SimpleXLSX;
require_once('SimpleXLSX.php');

class DataSourceCreationController extends Controller
{
    public function data_source_creation_index(Request $request)
    {
        $data_source_creation_index = DataSourceCreation::select('id as data_source_id', 'entry_date', 'state_id', 'county_id', 'data_source_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($data_source_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'data_source_creation_index' => $data_source_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function data_source_creation_create(Request $request)
    {
        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation], 200);
    }

    public function data_source_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');
        $data_source_name = $request->input('data_source_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new DataSourceCreation();
        $form_create->entry_date = $entry_date;
        $form_create->state_id = $state_id;
        $form_create->county_id = $county_id;
        $form_create->data_source_name = $data_source_name;
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

    public function data_source_creation_edit(Request $request)
    {
        $data_source_id = $request->input('data_source_id');

        if (empty($data_source_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        $data_source_creation_edit = DataSourceCreation::select('id as data_source_id', 'entry_date', 'state_id', 'county_id', 'data_source_name', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $data_source_id)
            ->get();

        if ($data_source_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'data_source_creation_edit' => $data_source_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function data_source_creation_update(Request $request)
    {
        $data_source_id = $request->input('data_source_id');
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');
        $data_source_name = $request->input('data_source_name');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($data_source_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = DataSourceCreation::find($data_source_id);
        $form_update->state_id = $state_id;
        $form_update->county_id = $county_id;
        $form_update->data_source_name = $data_source_name;
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

    public function data_source_creation_delete(Request $request)
    {
        $data_source_id = $request->input('data_source_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($data_source_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = DataSourceCreation::find($data_source_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function data_source_creation_state_dependency(Request $request)
    {
        $state_id = $request->input('state_id');

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('state_id', $state_id)
            ->get();
        return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'county_creation' => $county_creation], 200);
    }

    public function data_source_creation_import_excel(Request $request)
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
                $data = [
                    'entry_date'        => $entry_date,
                    'state_id'          => $reader_xl1[0],
                    'county_id'         => $reader_xl1[1],
                    'data_source_name'  => $reader_xl1[2],
                    'description'       => $reader_xl1[3],
                    'status'            => $reader_xl1[4],
                ];

                $data_source_creation = DataSourceCreation::create($data);

                if ($data_source_creation) {
                    $importedRows++;
                } else {
                    $failedRows[] = $data;
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
