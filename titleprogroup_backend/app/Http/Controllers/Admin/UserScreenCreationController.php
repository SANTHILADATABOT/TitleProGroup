<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserScreenCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserScreenCreationController extends Controller
{
    private function get_menu_screens1($cnt1, $Menu, $main_id, $main_screen_name)
    {
        $Menu1 = UserScreenCreation::select('main_id', 'id as user_screen_id', 'screen_name', 'order_number', 'more_options', 'remove_options', 'status')
            ->where('delete_status', 'no')
            ->where('main_id', $main_id)
            ->orderBy('order_number', 'asc')
            ->get();

        if ($Menu1 != null) {
            $cnt = 1;
            foreach ($Menu1 as $Menu2) {
                $main_screen_name1 = $main_screen_name;
                $Menu[] = [
                    'cnt' => $cnt1 . $cnt . ') ',
                    'main_id' => $Menu2->main_id,
                    'main_name' => !empty($main_screen_name1) ? implode(' > ', $main_screen_name1) : '',
                    'user_screen_id' => $Menu2->user_screen_id,
                    'screen_name' => $Menu2->screen_name,
                    'order_number' => $Menu2->order_number,
                    'more_options' => $Menu2->more_options,
                    'remove_options' => $Menu2->remove_options,
                    'status' => $Menu2->status,
                ];
                $main_screen_name1[] = $Menu2->screen_name;
                $Menu = $this->get_menu_screens1($cnt1 . $cnt . '.', $Menu, $Menu2->user_screen_id, $main_screen_name1);
                $cnt++;
            }
        }

        return $Menu;
    }
    public function user_screen_creation_index(Request $request)
    {
        $Menu = [];
        $main_screen_name = [];
        $Menu = $this->get_menu_screens1('', $Menu, '0', $main_screen_name);
        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_screen_creation_index' => $Menu], 200);
    }

    private function get_menu_screens2($Menu, $main_id, $main_screen_name)
    {
        $Menu1 = UserScreenCreation::select('main_id', 'id as user_screen_id', 'screen_name', 'order_number')->where('delete_status', 'no')->where('main_id', $main_id)->orderBy('order_number', 'asc')->get();
        if ($Menu1 != null) {
            foreach ($Menu1 as $Menu2) {
                $main_screen_name1 = $main_screen_name;
                $main_screen_name1[] = $Menu2->screen_name;
                $Menu[] = ['user_screen_id' => $Menu2->user_screen_id, 'screen_name' => implode('>', $main_screen_name1)];
            }
        }
        return $Menu;
    }
    public function user_screen_creation_create(Request $request)
    {
        $Menu = [];
        $main_screen_name = [];
        $Menu = $this->get_menu_screens2($Menu, '0', $main_screen_name);
        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_screen_creation_create' => $Menu], 200);
    }

    public function user_screen_creation_insert(Request $request)
    {
        $entry_date = Carbon::now()->toDateString();
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];

        $userscreen = new UserScreenCreation([
            'entry_date' => $entry_date,
            'main_id' => $request->input('main_id'),
            'screen_name' => $request->input('screen_name'),
            'order_number' => $request->input('order_number'),
            'more_options' => $request->input('more_options'),
            'remove_options' => $request->input('remove_options'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'delete_status' => 'no',
            'created_user_id' => '1',
            'created_ipaddress' => $created_ipaddress
        ]);
        $userscreen->save();
        if($userscreen){
            $userscreen1 = UserScreenCreation::whereRaw("main_id='".$userscreen->main_id."' and order_number>='".$userscreen->order_number."' and delete_status='no' and id!='".$userscreen->id."'")->get();
            if($userscreen1 != null){
                foreach($userscreen1 as $userscreen2){
                    $userscreen2->order_number = intval($userscreen2->order_number)+1;
                    $userscreen2->save();
                }
            }
            $Menu1 = UserScreenCreation::whereRaw("main_id='".$userscreen->main_id."' and delete_status='no'")->orderBy('order_number', 'asc')->get();
            if($Menu1 != null){
                $cnt1 = 1;
                foreach($Menu1 as $Menu2){
                    $Menu2->order_number = $cnt1;
                    $Menu2->save();
                    $cnt1++;
                }
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Data Inserted Successfully'], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Insert Not Found'], 404);
        }
    }

    public function user_screen_creation_edit(Request $request)
    {
        $user_screen_id = $request->input('user_screen_id');

        if (empty($user_screen_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $user_screen_creation_edit = UserScreenCreation::select('id as user_screen_id', 'entry_date', 'main_id', 'screen_name', 'order_number', 'more_options', 'remove_options', 'description', 'status')
            ->where('id', $user_screen_id)
            ->get();

        if ($user_screen_creation_edit != null) {
            $Menu = [];
            $main_screen_name = [];
            $Menu = $this->get_menu_screens2($Menu, '0', $main_screen_name);
            return response()->json(['status' => 'SUCCESS', 'message' => 'Edit Showed Successfully', 'user_screen_creation_edit' => $user_screen_creation_edit, 'Menu' => $Menu], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Edit Not Found'], 404);
        }
    }

    public function user_screen_creation_update(Request $request)
    {
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];
        $user_screen_id = $request->input('user_screen_id');
        if (empty($user_screen_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $entry_date = Carbon::now()->toDateString();
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        $userscreen = UserScreenCreation::where('delete_status', 'no')->where('id',$user_screen_id)->first();
        if($userscreen != null){
            $userscreen->main_id = $request->input('main_id');
            $userscreen->remove_options = $request->input('remove_options');
            $userscreen->screen_name = $request->input('screen_name');
            $userscreen->order_number = $request->input('order_number');
            $userscreen->description = $request->input('description');
            $userscreen->status = $request->input('status');
            $userscreen->updated_user_id = '1';
            $userscreen->updated_ipaddress = $created_ipaddress;
            //$userscreen->created_by = '1';
            $userscreen->more_options = $request->input('more_options');
            $userscreen->save();

            $userscreen1 = UserScreenCreation::whereRaw("main_id='".$userscreen->main_id."' and order_number>='".$userscreen->order_number."' and delete_status='no' and id!='".$userscreen->id."'")->get();
            if($userscreen1 != null){
                foreach($userscreen1 as $userscreen2){
                    $userscreen2->order_number = intval($userscreen2->order_number)+1;
                    $userscreen2->save();
                }
            }
            $Menu1 = UserScreenCreation::whereRaw("main_id='".$userscreen->main_id."' and delete_status='no'")->orderBy('order_number', 'asc')->get();
            if($Menu1 != null){
                $cnt1 = 1;
                foreach($Menu1 as $Menu2){
                    $Menu2->order_number = $cnt1;
                    $Menu2->save();
                    $cnt1++;
                }
            }
        }
        return response()->json(['status' => 'SUCCESS', 'message' => 'Data Updated Successfully'], 200);
    }

    public function user_screen_creation_delete(Request $request)
    {
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];
        $user_screen_id = $request->input('user_screen_id');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();

        if (empty($user_screen_id)) {
            return response()->json(['status' => 'FAILURE', 'message' => 'Id Not Found'], 404);
        }

        $userscreen =  UserScreenCreation::findOrFail($user_screen_id);
        if($userscreen != null){
            $userscreen->delete_status = 'yes';
            $userscreen->deleted_user_id = '1';
            $userscreen->deleted_ipaddress = $created_ipaddress;
            $userscreen->save();

            $Menu1 = UserScreenCreation::whereRaw("main_id='".$userscreen->main_id."' and delete_status='no'")->orderBy('order_number', 'asc')->get();
            if($Menu1 != null){
                $cnt1 = 1;
                foreach($Menu1 as $Menu2){
                    $Menu2->order_number = $cnt1;
                    $Menu2->save();
                    $cnt1++;
                }
            }
        }
        return response()->json(['status' => 'SUCCESS', 'message' => 'Data Deleted Successfully'], 200);
    }
}
