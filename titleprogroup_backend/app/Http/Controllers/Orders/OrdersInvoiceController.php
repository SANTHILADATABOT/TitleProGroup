<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Master\TransactionTypeCreation;
use App\Models\Master\ContactCreation;
use App\Models\Master\ExpenseTypeCreation;
use App\Models\Orders\OrderEntry;
use App\Models\Master\CustomerFeesCreation;
use App\Models\Contacts\CustomerFeesSublist;
use App\Models\Orders\OrdersInvoiceMainlist;
use App\Models\Orders\OrdersInvoiceSublist;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class OrdersInvoiceController extends Controller
{
    public function orders_invoice_index(Request $request)
    {
        $order_id = $request->input('order_id');

        $order_entry = OrderEntry::select('id', 'order_number', 'contact_id')
            ->where('delete_status', 'no')
            ->where('id', $order_id)
            ->first();

        if (!$order_entry) {
            return response()->json(['status' => 'ERROR', 'message' => 'Order not found'], 404);
        }

        $contact_creation = ContactCreation::select('id', 'contact_name', 'customer_fees_id')
            ->where('delete_status', 'no')
            ->where('id', $order_entry->contact_id)
            ->first();

        if (!$contact_creation) {
            return response()->json(['status' => 'ERROR', 'message' => 'Contact not found'], 404);
        }

        $customer_fees_creation = CustomerFeesCreation::select('id', 'entry_date', 'state_id', 'county_id', 'customer_fees', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $contact_creation->customer_fees_id)
            ->first();

        if (!$customer_fees_creation) {
            return response()->json(['status' => 'ERROR', 'message' => 'Customer fees not found'], 404);
        }

        $total_billed = DB::table('customer_fees_sublist')
            ->where('delete_status', 'no')
            ->where('customer_fees_id', $customer_fees_creation->id)
            ->where('payee_id', 1)
            ->sum('total');

        $total_pay_vendor = DB::table('customer_fees_sublist')
            ->where('delete_status', 'no')
            ->where('customer_fees_id', $customer_fees_creation->id)
            ->where('payee_id', 2)
            ->sum('total');

        $total_expense = DB::table('customer_fees_sublist')
            ->where('delete_status', 'no')
            ->where('customer_fees_id', $customer_fees_creation->id)
            ->where('payee_id', 3)
            ->sum('total');

        $net_revenue = $total_billed - ($total_pay_vendor + $total_expense);

        $customer_fees_sublist = CustomerFeesSublist::select('customer_fees_sublist.id', 'customer_fees_sublist.entry_date', 'customer_fees_sublist.customer_fees_id', 'customer_fees_sublist.payee_id', 'customer_fees_sublist.contact_id', 'customer_fees_sublist.expense_type_id', 'customer_fees_sublist.transaction_type_id', 'customer_fees_sublist.cost_per_units', 'customer_fees_sublist.no_of_units', 'customer_fees_sublist.total', 'contact_creation.contact_name', 'expense_type_creation.expense_type_name', 'transaction_type_creation.transaction_type_name')
            ->leftJoin('contact_creation', 'contact_creation.id', '=', 'customer_fees_sublist.contact_id')
            ->leftJoin('expense_type_creation', 'expense_type_creation.id', '=', 'customer_fees_sublist.expense_type_id')
            ->leftJoin('transaction_type_creation', 'transaction_type_creation.id', '=', 'customer_fees_sublist.transaction_type_id')
            ->where('customer_fees_sublist.customer_fees_id', $customer_fees_creation->id)
            ->where('customer_fees_sublist.delete_status', 'no')
            ->get();

        $order_invoice_billed = $customer_fees_sublist->where('payee_id', 1)->map(function ($item) use ($order_entry, $customer_fees_creation) {
            return [
                'order_id' => $order_entry->id,
                'order_number' => $order_entry->order_number,
                'customer_fees_id' => $customer_fees_creation->id,
                'customer_fees_name' => $customer_fees_creation->customer_fees,
                'customer_fees_sublist_id' => $item->id,
                'payee_id' => $item->payee_id,
                'payee_name' => 'Billed',
                'contact_id' => $item->contact_id,
                'expense_type_id' => $item->expense_type_id,
                'transaction_type_id' => $item->transaction_type_id,
                'cost_per_units' => $item->cost_per_units,
                'no_of_units' => $item->no_of_units,
                'total' => $item->total,
                'contact_name' => $item->contact_name,
                'expense_type_name' => $item->expense_type_name,
                'transaction_type_name' => $item->transaction_type_name,
            ];
        })->values()->all();

        $order_invoice_pay_vendor = $customer_fees_sublist->where('payee_id', 2)->map(function ($item) use ($order_entry, $customer_fees_creation) {
            return [
                'order_id' => $order_entry->id,
                'order_number' => $order_entry->order_number,
                'customer_fees_id' => $customer_fees_creation->id,
                'customer_fees_name' => $customer_fees_creation->customer_fees,
                'customer_fees_sublist_id' => $item->id,
                'payee_id' => $item->payee_id,
                'payee_name' => 'Pay Vendor',
                'contact_id' => $item->contact_id,
                'expense_type_id' => $item->expense_type_id,
                'transaction_type_id' => $item->transaction_type_id,
                'cost_per_units' => $item->cost_per_units,
                'no_of_units' => $item->no_of_units,
                'total' => $item->total,
                'contact_name' => $item->contact_name,
                'expense_type_name' => $item->expense_type_name,
                'transaction_type_name' => $item->transaction_type_name,
            ];
        })->values()->all();

        $order_invoice_expense = $customer_fees_sublist->where('payee_id', 3)->map(function ($item) use ($order_entry, $customer_fees_creation) {
            return [
                'order_id' => $order_entry->id,
                'order_number' => $order_entry->order_number,
                'customer_fees_id' => $customer_fees_creation->id,
                'customer_fees_name' => $customer_fees_creation->customer_fees,
                'customer_fees_sublist_id' => $item->id,
                'payee_id' => $item->payee_id,
                'payee_name' => 'Expense',
                'contact_id' => $item->contact_id,
                'expense_type_id' => $item->expense_type_id,
                'transaction_type_id' => $item->transaction_type_id,
                'cost_per_units' => $item->cost_per_units,
                'no_of_units' => $item->no_of_units,
                'total' => $item->total,
                'contact_name' => $item->contact_name,
                'expense_type_name' => $item->expense_type_name,
                'transaction_type_name' => $item->transaction_type_name,
            ];
        })->values()->all();

        return response()->json([
            'status' => 'SUCCESS',
            'message' => 'Index Showed Successfully',
            'order_invoice_billed' => $order_invoice_billed,
            'order_invoice_pay_vendor' => $order_invoice_pay_vendor,
            'order_invoice_expense' => $order_invoice_expense,
            'total_billed' => $total_billed,
            'total_pay_vendor' => $total_pay_vendor,
            'total_expense' => $total_expense,
            'net_revenue' => $net_revenue,
        ], 200);
    }

    public function orders_invoice_print(Request $request)
    {
        $order_id = $request->input('order_id');

        $order_entry = OrderEntry::select('id', 'order_number', 'contact_id', 'open_date', 'due_date')
            ->where('delete_status', 'no')
            ->where('id', $order_id)
            ->first();

        if (!$order_entry) {
            return response()->json(['status' => 'ERROR', 'message' => 'Order not found'], 404);
        }

        $contact_creation = ContactCreation::select('id', 'contact_name', 'customer_fees_id', 'address', 'city_name')
            ->where('delete_status', 'no')
            ->where('id', $order_entry->contact_id)
            ->first();

        if (!$contact_creation) {
            return response()->json(['status' => 'ERROR', 'message' => 'Contact not found'], 404);
        }

        $customer_fees_creation = CustomerFeesCreation::select('id', 'entry_date', 'state_id', 'county_id', 'customer_fees', 'description', 'status')
            ->where('delete_status', 'no')
            ->where('id', $contact_creation->customer_fees_id)
            ->first();

        if (!$customer_fees_creation) {
            return response()->json(['status' => 'ERROR', 'message' => 'Customer fees not found'], 404);
        }

        $customer_fees_sublist = CustomerFeesSublist::select('customer_fees_sublist.id', 'customer_fees_sublist.entry_date', 'customer_fees_sublist.customer_fees_id', 'customer_fees_sublist.payee_id', 'customer_fees_sublist.contact_id', 'customer_fees_sublist.expense_type_id', 'customer_fees_sublist.transaction_type_id', 'customer_fees_sublist.cost_per_units', 'customer_fees_sublist.no_of_units', 'customer_fees_sublist.total', 'contact_creation.contact_name', 'expense_type_creation.expense_type_name', 'transaction_type_creation.transaction_type_name')
            ->leftJoin('contact_creation', 'contact_creation.id', '=', 'customer_fees_sublist.contact_id')
            ->leftJoin('expense_type_creation', 'expense_type_creation.id', '=', 'customer_fees_sublist.expense_type_id')
            ->leftJoin('transaction_type_creation', 'transaction_type_creation.id', '=', 'customer_fees_sublist.transaction_type_id')
            ->where('customer_fees_sublist.customer_fees_id', $customer_fees_creation->id)
            ->where('customer_fees_sublist.delete_status', 'no')
            ->get();

        $order_invoice_billed = $customer_fees_sublist->where('payee_id', 1)->map(function ($item) use ($order_entry, $customer_fees_creation) {
            return [
                'order_id' => $order_entry->id,
                'order_number' => $order_entry->order_number,
                'invoice_date' => $order_entry->open_date,
                'due_date' => $order_entry->due_date,
                'customer_fees_id' => $customer_fees_creation->id,
                'address' => $customer_fees_creation->address,
                'city_name' => $customer_fees_creation->city_name,
                'customer_fees_name' => $customer_fees_creation->customer_fees,
                'customer_fees_sublist_id' => $item->id,
                'payee_id' => $item->payee_id,
                'payee_name' => 'Billed',
                'contact_id' => $item->contact_id,
                'expense_type_id' => $item->expense_type_id,
                'transaction_type_id' => $item->transaction_type_id,
                'cost_per_units' => $item->cost_per_units,
                'no_of_units' => $item->no_of_units,
                'total' => $item->total,
                'contact_name' => $item->contact_name,
                'expense_type_name' => $item->expense_type_name,
                'transaction_type_name' => $item->transaction_type_name,
            ];
        })->values()->all();

        $order_invoice_pay_vendor = $customer_fees_sublist->where('payee_id', 2)->map(function ($item) use ($order_entry, $customer_fees_creation) {
            return [
                'order_id' => $order_entry->id,
                'order_number' => $order_entry->order_number,
                'customer_fees_id' => $customer_fees_creation->id,

                'customer_fees_name' => $customer_fees_creation->customer_fees,
                'customer_fees_sublist_id' => $item->id,
                'payee_id' => $item->payee_id,
                'payee_name' => 'Pay Vendor',
                'contact_id' => $item->contact_id,
                'expense_type_id' => $item->expense_type_id,
                'transaction_type_id' => $item->transaction_type_id,
                'cost_per_units' => $item->cost_per_units,
                'no_of_units' => $item->no_of_units,
                'total' => $item->total,
                'contact_name' => $item->contact_name,
                'expense_type_name' => $item->expense_type_name,
                'transaction_type_name' => $item->transaction_type_name,
            ];
        })->values()->all();

        $order_invoice_expense = $customer_fees_sublist->where('payee_id', 3)->map(function ($item) use ($order_entry, $customer_fees_creation) {
            return [
                'order_id' => $order_entry->id,
                'order_number' => $order_entry->order_number,
                'customer_fees_id' => $customer_fees_creation->id,
                'customer_fees_name' => $customer_fees_creation->customer_fees,
                'customer_fees_sublist_id' => $item->id,
                'payee_id' => $item->payee_id,
                'payee_name' => 'Expense',
                'contact_id' => $item->contact_id,
                'expense_type_id' => $item->expense_type_id,
                'transaction_type_id' => $item->transaction_type_id,
                'cost_per_units' => $item->cost_per_units,
                'no_of_units' => $item->no_of_units,
                'total' => $item->total,
                'contact_name' => $item->contact_name,
                'expense_type_name' => $item->expense_type_name,
                'transaction_type_name' => $item->transaction_type_name,
            ];
        })->values()->all();

        return response()->json([
            'status' => 'SUCCESS',
            'message' => 'Index Showed Successfully',
            'order_invoice_billed' => $order_invoice_billed,
            'order_invoice_pay_vendor' => $order_invoice_pay_vendor,
            'order_invoice_expense' => $order_invoice_expense
        ], 200);
    }
}
