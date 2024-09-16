<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\CountyCreation;
use App\Models\Master\StateCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Imports\CountyCreationImport;
use Maatwebsite\Excel\Facades\Excel;
use Carbon\Carbon;
use Shuchkin\SimpleXLSX;
require_once('SimpleXLSX.php');

class CountyCreationController extends Controller
{
    public function county_creation_index(Request $request)
    {
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');

        $county_creation_main = CountyCreation::select('county_creation.id as county_id', 'county_creation.county_name', 'county_creation.county_code', 'county_creation.state_id', 'state_creation.state_name', 'county_creation.description', 'county_creation.status')
            ->leftjoin('state_creation', 'state_creation.id', '=', 'county_creation.state_id')
            ->where('county_creation.delete_status', 'no')
            ->where('state_creation.delete_status', 'no');
            if (!empty($state_id)) {
                $county_creation_main->where('county_creation.state_id', $state_id);
            }
            if (!empty($county_id)) {
                $county_creation_main->where('county_creation.id', $county_id);
            }
            $county_creation_index = $county_creation_main->get();

        if ($county_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'county_creation_index' => $county_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function county_creation_create(Request $request)
    {
        $state_creation = StateCreation::select('id as state_id', 'county_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        if ($state_creation != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'state_creation' => $state_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Create Not Found'], 404);
        }
    }

    public function county_creation_insert(Request $request)
    {
        $county_name = $request->input('county_name');
        $county_code = $request->input('county_code');
        $state_id = $request->input('state_id');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new CountyCreation();
        $form_create->county_name = $county_name;
        $form_create->county_code = $county_code;
        $form_create->state_id = $state_id;
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

    public function county_creation_edit(Request $request)
    {
        $county_id = $request->input('county_id');

        if (empty($county_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $state_creation = StateCreation::select('id as state_id', 'county_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        $county_creation_edit = CountyCreation::select('id as county_id', 'county_name', 'county_code', 'state_id', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $county_id)
            ->get();

        if ($county_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'state_creation' => $state_creation, 'county_creation_edit' => $county_creation_edit], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function county_creation_update(Request $request)
    {
        $county_id = $request->input('county_id');
        $county_name = $request->input('county_name');
        $county_code = $request->input('county_code');
        $state_id = $request->input('state_id');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($county_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = CountyCreation::find($county_id);
        $form_update->county_name = $county_name;
        $form_update->county_code = $county_code;
        $form_update->state_id = $state_id;
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

    public function county_creation_delete(Request $request)
    {
        $county_id = $request->input('county_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($county_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = CountyCreation::find($county_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function county_creation_state_dependency(Request $request)
    {
        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        if ($state_creation != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'state_creation' => $state_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Dependency Not Found'], 404);
        }
    }

    public function county_creation_county_dependency(Request $request)
    {
        $state_id = $request->input('state_id');

        if (empty($state_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('state_id', $state_id)
            ->get();

        if ($county_creation != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'county_creation' => $county_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Dependency Not Found'], 404);
        }
    }

    public function county_creation_import_excel(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls'
        ]);

        $file = $request->file('file');

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
                    'county_name'    => $reader_xl1[0],
                    'description'    => $reader_xl1[2],
                    'status'         => $reader_xl1[3],
                ];

                $state_creation = StateCreation::select('id', 'state_name')
                    ->where('delete_status', 'no')
                    ->where('state_name', $reader_xl1[1])
                    ->first();

                // $contact_update = ContactCreation::find($contact_id);
                // $contact_update->state_id = $state_creation->id;
                // $contact_update->save();

                $county_creation = CountyCreation::create($data);

                if ($county_creation) {
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
