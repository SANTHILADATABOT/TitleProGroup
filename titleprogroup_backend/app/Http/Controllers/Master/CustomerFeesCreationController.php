<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Master\ContactCreation;
use App\Models\Master\CountyCreation;
use App\Models\Master\StateCreation;
use App\Models\Master\CustomerFeesCreation;
use App\Models\Contacts\CustomerFeesSublist;
use App\Models\Master\ExpenseTypeCreation;
use App\Models\Master\TransactionTypeCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class CustomerFeesCreationController extends Controller
{
    public function customer_fees_creation_index(Request $request)
    {
        $cust_fees_tb = (new CustomerFeesCreation())->getTable();
        $county_tb = (new CountyCreation())->getTable();
        $state_tb = (new StateCreation())->getTable();
        $customer_fees_creation_index = CustomerFeesCreation::select("$cust_fees_tb.id as customer_fees_id",  "$cust_fees_tb.entry_date", "$cust_fees_tb.state_id", "$cust_fees_tb.county_id", "$cust_fees_tb.customer_fees", "$cust_fees_tb.description", "$cust_fees_tb.status", "$county_tb.county_name", "$state_tb.state_name")
            ->leftJoin($county_tb, "$county_tb.id", "$cust_fees_tb.county_id")
            ->leftJoin($state_tb, "$state_tb.id", "$cust_fees_tb.state_id")
            ->where("$cust_fees_tb.delete_status", 'no')
            ->get();

        if ($customer_fees_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'customer_fees_creation_index' => $customer_fees_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function customer_fees_creation_create(Request $request)
    {
        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        $contact_creation = ContactCreation::select('id as contact_id', 'contact_name')
            ->where('delete_status', 'no')
            ->get();

        $expense_type = ExpenseTypeCreation::select('id as expense_type_id', 'expense_type_name')
            ->where('delete_status', 'no')
            ->get();

        $transaction_type = TransactionTypeCreation::select('id as transaction_type_id', 'transaction_type_name')
            ->where('delete_status', 'no')
            ->get();

        return response()->json(['status' => 'SUCCESS', 'message' => 'Create Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'contact_creation' => $contact_creation, 'expense_type' => $expense_type, 'transaction_type' => $transaction_type], 200);
    }

    public function customer_fees_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $ipaddress = $request->ip();
        $created_user_id = $request->input('user_id');

        $customer_fees_id = $request->input('customer_fees_id');
        if($customer_fees_id == ''){
            $form_create = new CustomerFeesCreation([
                'entry_date' => $entry_date,
                'state_id' => $request->input('state_id'),
                'county_id' => $request->input('county_id'),
                'customer_fees' => $request->input('customer_fees'),
                'description' => $request->input('description'),
                'status' => $request->input('status'),
                'delete_status' => 'no',
                'created_user_id' => $created_user_id,
                'created_ipaddress' => $ipaddress,
            ]);
            $form_create->save();
            $customer_fees_id = $form_create->id;
        }else{
            $form_create = CustomerFeesCreation::where('id', $customer_fees_id)->first();
            $form_create->state_id = $request->input('state_id');
            $form_create->county_id = $request->input('county_id');
            $form_create->customer_fees = $request->input('customer_fees');
            $form_create->description = $request->input('description');
            $form_create->status = $request->input('status');
            $form_create->save();
        }

        if ($customer_fees_id != '') {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function customer_fees_sublist_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $ipaddress = $request->ip();
        $created_user_id = $request->input('user_id');

        $customer_fees_id = $request->input('customer_fees_id');
        if($customer_fees_id == ''){
            $form_create = new CustomerFeesCreation([
                'entry_date' => $entry_date,
                'state_id' => $request->input('state_id'),
                'county_id' => $request->input('county_id'),
                'customer_fees' => $request->input('customer_fees'),
                'description' => $request->input('description'),
                'status' => $request->input('status'),
                'delete_status' => 'no',
                'created_user_id' => $created_user_id,
                'created_ipaddress' => $ipaddress
            ]);
            $form_create->save();
            $customer_fees_id = $form_create->id;
        }

        if ($customer_fees_id != '') {
            $customer_fees_sublist = $request->input('customer_fees_sublist');
            $form_create1 = new CustomerFeesSublist([
                'entry_date' => $entry_date,
                'customer_fees_id' => $customer_fees_id,
                'payee_id' => $customer_fees_sublist['payee_id'],
                'contact_id' => $customer_fees_sublist['contact_id'],
                'expense_type_id' => $customer_fees_sublist['expense_type_id'],
                'transaction_type_id' => $customer_fees_sublist['transaction_type_id'],
                'cost_per_units' => $customer_fees_sublist['cost_per_units'],
                'no_of_units' => $customer_fees_sublist['no_of_units'],
                'total' => $customer_fees_sublist['total'],
                'delete_status' => 'no',
                'created_user_id' => $created_user_id,
                'created_ipaddress' => $ipaddress,
            ]);
            $form_create1->save();

            $customer_fees_creation = CustomerFeesCreation::select('id as customer_fees_id', 'entry_date', 'state_id', 'county_id', 'customer_fees', 'description')->where('id', $customer_fees_id)->first();

            $cust_fees_tb = (new CustomerFeesSublist())->getTable();
            $contact_tb = (new ContactCreation())->getTable();
            $expense_tb = (new ExpenseTypeCreation())->getTable();
            $transaction_tb = (new TransactionTypeCreation())->getTable();
            $customer_fees_sublist1 = CustomerFeesSublist::select("$cust_fees_tb.id as customer_fees_sublist_id", "$cust_fees_tb.entry_date", "$cust_fees_tb.customer_fees_id", "$cust_fees_tb.payee_id", "$cust_fees_tb.contact_id", "$cust_fees_tb.expense_type_id", "$cust_fees_tb.transaction_type_id", "$cust_fees_tb.cost_per_units", "$cust_fees_tb.no_of_units", "$cust_fees_tb.total", "$contact_tb.contact_name", "$expense_tb.expense_type_name", "$transaction_tb.transaction_type_name")
                ->leftJoin($contact_tb, "$contact_tb.id", "$cust_fees_tb.contact_id")
                ->leftJoin($expense_tb, "$expense_tb.id", "$cust_fees_tb.expense_type_id")
                ->leftJoin($transaction_tb, "$transaction_tb.id", "$cust_fees_tb.transaction_type_id")
                ->where("$cust_fees_tb.customer_fees_id", $customer_fees_id)
                ->where("$cust_fees_tb.delete_status", 'no')
                ->get();
            $customer_fees_sublist = [];
            if($customer_fees_sublist1 != null){
                $customer_fees_sublist = $customer_fees_sublist1;
            }

            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully', 'customer_fees_creation' => $customer_fees_creation, 'customer_fees_sublist' => $customer_fees_sublist], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Inserted'], 404);
        }
    }

    public function customer_fees_creation_edit(Request $request)
    {
        $customer_fees_id = $request->input('customer_fees_id');

        if (empty($customer_fees_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->get();

        $state_creation = StateCreation::select('id as state_id', 'state_name')
            ->where('delete_status', 'no')
            ->get();

        $customer_fees_creation_edit = CustomerFeesCreation::select('id as customer_fees_id',  'entry_date', 'state_id', 'county_id', 'customer_fees', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $customer_fees_id)
            ->first();

        if ($customer_fees_creation_edit != null) {
            $cust_fees_tb = (new CustomerFeesSublist())->getTable();
            $contact_tb = (new ContactCreation())->getTable();
            $expense_tb = (new ExpenseTypeCreation())->getTable();
            $transaction_tb = (new TransactionTypeCreation())->getTable();
            $customer_fees_sublist1 = CustomerFeesSublist::select("$cust_fees_tb.id as customer_fees_sublist_id", "$cust_fees_tb.entry_date", "$cust_fees_tb.customer_fees_id", "$cust_fees_tb.payee_id", "$cust_fees_tb.contact_id", "$cust_fees_tb.expense_type_id", "$cust_fees_tb.transaction_type_id", "$cust_fees_tb.cost_per_units", "$cust_fees_tb.no_of_units", "$cust_fees_tb.total", "$contact_tb.contact_name", "$expense_tb.expense_type_name", "$transaction_tb.transaction_type_name")
                ->leftJoin($contact_tb, "$contact_tb.id", "$cust_fees_tb.contact_id")
                ->leftJoin($expense_tb, "$expense_tb.id", "$cust_fees_tb.expense_type_id")
                ->leftJoin($transaction_tb, "$transaction_tb.id", "$cust_fees_tb.transaction_type_id")
                ->where("$cust_fees_tb.customer_fees_id", $customer_fees_id)
                ->where("$cust_fees_tb.delete_status", 'no')
                ->get();
            $customer_fees_sublist = [];
            if($customer_fees_sublist1 != null){
                $customer_fees_sublist = $customer_fees_sublist1;
            }

            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'customer_fees_creation_edit' => $customer_fees_creation_edit, 'customer_fees_sublist' => $customer_fees_sublist], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function customer_fees_sublist_edit(Request $request)
    {
        $customer_fees_sublist_id = $request->input('customer_fees_sublist_id');

        if (empty($customer_fees_sublist_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $customer_fees_sublist = CustomerFeesSublist::select('*','id as customer_fees_sublist_id')->where('id', $customer_fees_sublist_id)->first();
        if($customer_fees_sublist != null){
            $county_creation = CountyCreation::select('id as county_id', 'county_name')
                ->where('delete_status', 'no')
                ->get();

            $state_creation = StateCreation::select('id as state_id', 'state_name')
                ->where('delete_status', 'no')
                ->get();

            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'county_creation' => $county_creation, 'state_creation' => $state_creation, 'customer_fees_sublist' => $customer_fees_sublist], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function customer_fees_creation_update(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $customer_fees_id = $request->input('customer_fees_id');
        $state_id = $request->input('state_id');
        $county_id = $request->input('county_id');
        $customer_fees = $request->input('customer_fees');
        $description = $request->input('description');
        $status = $request->input('status');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($customer_fees_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = CustomerFeesCreation::find($customer_fees_id);
        $form_update->state_id = $state_id;
        $form_update->county_id = $county_id;
        $form_update->customer_fees = $customer_fees;
        $form_update->description = $description;
        $form_update->status = $status;
        $form_update->delete_status = 'no';
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            $customer_fees_id = $form_update->id;
            CustomerFeesSublist::where('customer_fees_id', $customer_fees_id)->delete();
            $customer_fees_sublist1 = $request->input('customer_fees_sublist');
            if(is_array($customer_fees_sublist1)){
                foreach($customer_fees_sublist1 as $customer_fees_sublist2){
                    $form_create1 = new CustomerFeesSublist([
                        'entry_date' => $entry_date,
                        'customer_fees_id' => $customer_fees_id,
                        'payee_id' => $customer_fees_sublist2['payee_id'],
                        'contact_id' => $customer_fees_sublist2['contact_id'],
                        'expense_type_id' => $customer_fees_sublist2['expense_type_id'],
                        'transaction_type_id' => $customer_fees_sublist2['transaction_type_id'],
                        'cost_per_units' => $customer_fees_sublist2['cost_per_units'],
                        'no_of_units' => $customer_fees_sublist2['no_of_units'],
                        'total' => $customer_fees_sublist2['total'],
                        'delete_status' => 'no',
                        'created_user_id' => $user_id,
                        'created_ipaddress' => $ipaddress,
                    ]);
                    $form_create1->save();
                }
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    public function customer_fees_sublist_update(Request $request)
    {
        $customer_fees_sublist_id = $request->input('customer_fees_sublist_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($customer_fees_sublist_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_update = CustomerFeesSublist::find($customer_fees_sublist_id);
        $form_update->payee_id = $request->input('payee_id');
        $form_update->contact_id = $request->input('contact_id');
        $form_update->expense_type_id = $request->input('expense_type_id');
        $form_update->transaction_type_id = $request->input('transaction_type_id');
        $form_update->cost_per_units = $request->input('cost_per_units');
        $form_update->no_of_units = $request->input('no_of_units');
        $form_update->total = $request->input('total');
        $form_update->delete_status = 'no';
        $form_update->updated_user_id = $user_id;
        $form_update->updated_ipaddress = $ipaddress;

        if ($form_update->save()) {
            $cust_fees_tb = (new CustomerFeesSublist())->getTable();
            $contact_tb = (new ContactCreation())->getTable();
            $expense_tb = (new ExpenseTypeCreation())->getTable();
            $transaction_tb = (new TransactionTypeCreation())->getTable();
            $customer_fees_sublist1 = CustomerFeesSublist::select("$cust_fees_tb.id as customer_fees_sublist_id", "$cust_fees_tb.entry_date", "$cust_fees_tb.customer_fees_id", "$cust_fees_tb.payee_id", "$cust_fees_tb.contact_id", "$cust_fees_tb.expense_type_id", "$cust_fees_tb.transaction_type_id", "$cust_fees_tb.cost_per_units", "$cust_fees_tb.no_of_units", "$cust_fees_tb.total", "$contact_tb.contact_name", "$expense_tb.expense_type_name", "$transaction_tb.transaction_type_name")
                ->leftJoin($contact_tb, "$contact_tb.id", "$cust_fees_tb.contact_id")
                ->leftJoin($expense_tb, "$expense_tb.id", "$cust_fees_tb.expense_type_id")
                ->leftJoin($transaction_tb, "$transaction_tb.id", "$cust_fees_tb.transaction_type_id")
                ->where("$cust_fees_tb.customer_fees_id", $form_update->customer_fees_id)
                ->where("$cust_fees_tb.delete_status", 'no')
                ->get();
            $customer_fees_sublist = [];
            if($customer_fees_sublist1 != null){
                $customer_fees_sublist = $customer_fees_sublist1;
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully', 'customer_fees_sublist' => $customer_fees_sublist], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Updated'], 404);
        }
    }

    public function customer_fees_creation_delete(Request $request)
    {
        $customer_fees_id = $request->input('customer_fees_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($customer_fees_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = CustomerFeesCreation::find($customer_fees_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            $form_delete1 = CustomerFeesSublist::where('customer_fees_id',$customer_fees_id)->get();
            if($form_delete1 != null){
                foreach($form_delete1 as $form_delete2){
                    $form_delete2->delete_status = 'yes';
                    $form_delete2->deleted_user_id = $user_id;
                    $form_delete2->deleted_ipaddress = $ipaddress;
                    $form_delete2->save();
                }
            }

            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function customer_fees_sublist_delete(Request $request)
    {
        $customer_fees_sublist_id = $request->input('customer_fees_sublist_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($customer_fees_sublist_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $form_delete = CustomerFeesSublist::find($customer_fees_sublist_id);
        $form_delete->delete_status = 'yes';
        $form_delete->deleted_user_id = $user_id;
        $form_delete->deleted_ipaddress = $ipaddress;

        if ($form_delete->save()) {
            $cust_fees_tb = (new CustomerFeesSublist())->getTable();
            $contact_tb = (new ContactCreation())->getTable();
            $expense_tb = (new ExpenseTypeCreation())->getTable();
            $transaction_tb = (new TransactionTypeCreation())->getTable();
            $customer_fees_sublist1 = CustomerFeesSublist::select("$cust_fees_tb.id as customer_fees_sublist_id", "$cust_fees_tb.entry_date", "$cust_fees_tb.customer_fees_id", "$cust_fees_tb.payee_id", "$cust_fees_tb.contact_id", "$cust_fees_tb.expense_type_id", "$cust_fees_tb.transaction_type_id", "$cust_fees_tb.cost_per_units", "$cust_fees_tb.no_of_units", "$cust_fees_tb.total", "$contact_tb.contact_name", "$expense_tb.expense_type_name", "$transaction_tb.transaction_type_name")
                ->leftJoin($contact_tb, "$contact_tb.id", "$cust_fees_tb.contact_id")
                ->leftJoin($expense_tb, "$expense_tb.id", "$cust_fees_tb.expense_type_id")
                ->leftJoin($transaction_tb, "$transaction_tb.id", "$cust_fees_tb.transaction_type_id")
                ->where("$cust_fees_tb.customer_fees_id", $form_delete->customer_fees_id)
                ->where("$cust_fees_tb.delete_status", 'no')
                ->get();
            $customer_fees_sublist = [];
            if($customer_fees_sublist1 != null){
                $customer_fees_sublist = $customer_fees_sublist1;
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully', 'customer_fees_sublist' => $customer_fees_sublist], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Data Not Deleted'], 404);
        }
    }

    public function customer_fees_creation_state_dependency(Request $request)
    {
        $state_id = $request->input('state_id');

        $county_creation = CountyCreation::select('id as county_id', 'county_name')
            ->where('delete_status', 'no')
            ->where('state_id', $state_id)
            ->get();
        return response()->json(['status' => 'SUCCESS', 'message' => 'Dependency Showed Successfully', 'county_creation' => $county_creation], 200);
    }
}
