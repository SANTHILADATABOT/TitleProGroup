<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\ContactTypeCreation;
use App\Models\Master\CountyCreation;
use App\Models\Master\StateCreation;
use App\Models\Master\ContactCreation;
use App\Models\Master\CustomerFeesCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Shuchkin\SimpleXLSX;
require_once('SimpleXLSX.php');

class ContactCreationController extends Controller
{
    public function contact_creation_index(Request $request)
    {
        $contact_creation_index = ContactCreation::select('id as contact_id', 'entry_date', 'contact_name', 'contact_type_name', 'customer_fees_id', 'address', 'branch_code', 'unit', 'city_name', 'state_id', 'county_id', 'zipcode', 'mobile_number', 'alternate_mobile_number', 'email_id', 'ein', 'service_date', 'service_expiration_date', 'eo_exp_date', 'status')
            ->where('delete_status', 'no')
            ->get();

        if ($contact_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'contact_creation_index' => $contact_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function contact_creation_create(Request $request)
    {
        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        $contact_type_creation = ContactTypeCreation::select('id as contact_type_id', 'contact_type_name')
            ->where('delete_status', 'no')
            ->get();

        $customer_fees_creation = CustomerFeesCreation::select('id as customer_fees_id', 'customer_fees')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'customer_fees_creation' => $customer_fees_creation, 'contact_type_creation' => $contact_type_creation, 'county_creation' => $county_creation, 'state_creation' => $state_creation], 200);
    }

    public function contact_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $contact_name = $request->input('contact_name');
        $contact_type_name = $request->input('contact_type_name');
        $customer_fees_id = $request->input('customer_fees_id');
        $address = $request->input('address');
        $branch_code = $request->input('branch_code');
        $unit = $request->input('unit');
        $city_name = $request->input('city_name');
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');
        $zipcode = $request->input('zipcode');
        $mobile_number = $request->input('mobile_number');
        $alternate_mobile_number = $request->input('alternate_mobile_number');
        $email_id = $request->input('email_id');
        $ein = $request->input('ein');
        $service_date = $request->input('service_date');
        $service_expiration_date = $request->input('service_expiration_date');
        $eo_exp_date = $request->input('eo_exp_date');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $form_create = new ContactCreation();
        $form_create->entry_date = $entry_date;
        $form_create->contact_name = $contact_name;
        $form_create->contact_type_name = $contact_type_name;
        $form_create->customer_fees_id = $customer_fees_id;
        $form_create->address = $address;
        $form_create->branch_code = $branch_code;
        $form_create->unit = $unit;
        $form_create->city_name = $city_name;
        $form_create->state_id = $state_id;
        $form_create->county_id = $county_id;
        $form_create->zipcode = $zipcode;
        $form_create->county_id = $county_id;
        $form_create->mobile_number = $mobile_number;
        $form_create->alternate_mobile_number = $alternate_mobile_number;
        $form_create->email_id = $email_id;
        $form_create->ein = $ein;
        $form_create->service_date = $service_date;
        $form_create->service_expiration_date = $service_expiration_date;
        $form_create->eo_exp_date = $eo_exp_date;
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

    public function contact_creation_edit(Request $request)
    {
        $contact_id = $request->input('contact_id');

        if (empty($contact_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $contact_type_creation = ContactTypeCreation::select('id as contact_type_id', 'contact_type_name')
            ->where('delete_status', 'no')
            ->get();

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        $customer_fees_creation = CustomerFeesCreation::select('id as customer_fees_id', 'customer_fees')
            ->where('delete_status', 'no')
            ->get();

        $contact_creation_edit = ContactCreation::select('id as contact_id', 'contact_name', 'contact_type_name', 'customer_fees_id', 'address', 'branch_code', 'unit', 'city_name', 'state_id', 'county_id', 'zipcode', 'mobile_number', 'alternate_mobile_number', 'email_id', 'ein', 'service_date', 'service_expiration_date', 'eo_exp_date', 'status')
            ->where('delete_status', 'no')
            ->where('id', $contact_id)
            ->get();

        if ($contact_creation_edit != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'contact_creation_edit' => $contact_creation_edit, 'customer_fees_creation' => $customer_fees_creation, 'contact_type_creation' => $contact_type_creation, 'county_creation' => $county_creation, 'state_creation' => $state_creation], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function contact_creation_update(Request $request)
    {
        $contact_id = $request->input('contact_id');
        $contact_name = $request->input('contact_name');
        $contact_type_name = $request->input('contact_type_name');
        $customer_fees_id = $request->input('customer_fees_id');
        $address = $request->input('address');
        $branch_code = $request->input('branch_code');
        $unit = $request->input('unit');
        $city_name = $request->input('city_name');
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');
        $zipcode = $request->input('zipcode');
        $mobile_number = $request->input('mobile_number');
        $alternate_mobile_number = $request->input('alternate_mobile_number');
        $email_id = $request->input('email_id');
        $ein = $request->input('ein');
        $service_date = $request->input('service_date');
        $service_expiration_date = $request->input('service_expiration_date');
        $eo_exp_date = $request->input('eo_exp_date');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($contact_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = ContactCreation::find($contact_id);
        $form_update->contact_name = $contact_name;
        $form_update->contact_type_name = $contact_type_name;
        $form_update->customer_fees_id = $customer_fees_id;
        $form_update->address = $address;
        $form_update->branch_code = $branch_code;
        $form_update->unit = $unit;
        $form_update->city_name = $city_name;
        $form_update->state_id = $state_id;
        $form_update->county_id = $county_id;
        $form_update->zipcode = $zipcode;
        $form_update->county_id = $county_id;
        $form_update->mobile_number = $mobile_number;
        $form_update->alternate_mobile_number = $alternate_mobile_number;
        $form_update->email_id = $email_id;
        $form_update->ein = $ein;
        $form_update->service_date = $service_date;
        $form_update->service_expiration_date = $service_expiration_date;
        $form_update->eo_exp_date = $eo_exp_date;
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

    public function contact_creation_delete(Request $request)
    {
        $contact_id = $request->input('contact_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($contact_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = ContactCreation::find($contact_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function contact_creation_creation_state_dependency(Request $request)
    {
        $state_id = $request->input('state_id');

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('state_id', $state_id)
            ->get();
        return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'county_creation' => $county_creation], 200);
    }

    public function contact_creation_import_excel(Request $request)
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
                $county_creation = CountyCreation::select('id', 'county_name')
                    ->where('delete_status', 'no')
                    ->where('county_name', $reader_xl1[7])
                    ->first();

                $state_creation = StateCreation::select('id', 'state_name')
                    ->where('delete_status', 'no')
                    ->where('state_name', $reader_xl1[6])
                    ->first();
                $data = [
                    'entry_date'                => $entry_date,
                    'contact_name'              => $reader_xl1[0],
                    'contact_type_name'         => $reader_xl1[1],
                    'address'                   => $reader_xl1[2],
                    'branch_code'               => $reader_xl1[3],
                    'unit'                      => $reader_xl1[4],
                    'city_name'                 => $reader_xl1[5],
                    'state_id'                  => $state_creation->id,
                    'county_id'                 => $county_creation->id,
                    'zipcode'                   => $reader_xl1[8],
                    'mobile_number'             => $reader_xl1[9],
                    'alternate_mobile_number'   => $reader_xl1[10],
                    'email_id'                  => $reader_xl1[11],
                    'ein'                       => $reader_xl1[12],
                    'eo_exp_date'               => $reader_xl1[13],
                    'status'                    => $reader_xl1[14],
                ];

                $contact_creation = ContactCreation::create($data);

                if ($contact_creation) {
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
