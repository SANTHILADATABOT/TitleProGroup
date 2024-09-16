<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserTypeCreation;
use App\Models\Admin\UserScreenCreation;
use App\Models\Admin\UserPermissionCreation;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserPermissionCreationController extends Controller
{
    public function user_permission_get_user_type(Request $request)
    {
        $user_permission_get_user_type = UserTypeCreation::select('id as user_type_id', 'user_type_name')
        ->where('delete_status', 'no')
        ->where('status', 'active')
        ->get();

        if ($user_permission_get_user_type != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_permission_get_user_type' => $user_permission_get_user_type], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    private function get_menu_screens($main_id, $main_screen_name)
    {
        $Menu = [];
        $Menu1 = UserScreenCreation::select('id as user_screen_id', 'screen_name', 'order_number', 'more_options', 'remove_options')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->where('main_id', $main_id)
            ->orderBy('order_number', 'asc')
            ->get();

        foreach ($Menu1 as $Menu2) {
            $main_screen_name1 = $main_screen_name;
            $main_screen_name1[] = $Menu2->screen_name;

            $Menu[$Menu2->user_screen_id] = [
                'screen_name' => $Menu2->screen_name,
                'more_options' => ($Menu2->more_options != '') ? json_decode($Menu2->more_options, true) : [],
                'remove_options' => ($Menu2->remove_options != '') ? json_decode($Menu2->remove_options, true) : [],
                'sub' => $this->get_menu_screens($Menu2->user_screen_id, $main_screen_name1),
            ];
        }
        return $Menu;
    }

    public function user_permission_creation_index(Request $request)
    {
        $user_type_id = $request->input('user_type_id');
        $user_permission_creation_index = null;
        if ($user_type_id != '') {
            $menuPermission_values = [];
            $menuPermission_values1 = UserPermissionCreation::where('user_type_id', $user_type_id)->get();
            if ($menuPermission_values1 != null) {
                foreach ($menuPermission_values1 as $menuPermission_values2) {
                    $menuPermission_values[$menuPermission_values2['user_screen_id']] = [
                        'View' => $menuPermission_values2['view_rights'],
                        'Add' => $menuPermission_values2['add_rights'],
                        'Edit' => $menuPermission_values2['edit_rights'],
                        'Delete' => $menuPermission_values2['delete_rights'],
                        'more_options' => (($menuPermission_values2['more_rights'] != '')?json_decode($menuPermission_values2['more_rights'], true):[]),
                    ];
                }
            }
            $main_screen_name = [];
            $user_permission_creation_index = $this->get_menu_screens('0', $main_screen_name);
        }
        if ($user_permission_creation_index != null) {
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'menuPermission_values' => $menuPermission_values, 'user_permission_creation_index' => $user_permission_creation_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

    public function user_permission_creation_update(Request $request)
    {
        $user_type_id = $request->input('user_type_id');
        $permissions = $request->input('permissions');
        $user_id= $request->input('user_id');
        $ipaddress = $request->ip();
        $created_ipaddress = $_SERVER['REMOTE_ADDR'];
        UserPermissionCreation::where('user_type_id', $user_type_id)->delete();
        foreach($permissions as $permissions1){
            $view_rights = '0';
            $add_rights = '0';
            $edit_rights = '0';
            $delete_rights = '0';
            $more_rights = [];
            foreach($permissions1['options'] as $options){
                $checked1 = ($options['checked'])?'1':'0';
                if($options['label'] == 'View'){
                    $view_rights = $checked1;
                }else if($options['label'] == 'Add'){
                    $add_rights = $checked1;
                }else if($options['label'] == 'Edit'){
                    $edit_rights = $checked1;
                }else if($options['label'] == 'Delete'){
                    $delete_rights = $checked1;
                }else{
                    $more_rights[$options['label']] = $checked1;
                }
            }
            $menu1 = new UserPermissionCreation([
                'user_type_id' => $user_type_id,
                'user_screen_id' => $permissions1['user_screen_id'],
                'view_rights' => $view_rights,
                'add_rights' => $add_rights,
                'edit_rights' => $edit_rights,
                'delete_rights' => $delete_rights,
                'more_rights' => json_encode($more_rights),
                'created_user_id' => '1',
                'created_ipaddress' => $created_ipaddress
            ]);
            $menu1->save();
        }
        return response()->json(['status' => 'SUCCESS'], 200);
    }

    public function get_user_rights(Request $request)
    {
        $user_type_id = $request->input('user_type_id');
        $user_screen_id = $request->input('user_screen_id');
        $get_user_rights = [];
        if (($user_type_id != '') && ($user_screen_id != '')) {
            $get_user_rights = UserPermissionCreation::where('user_type_id', $user_type_id)->where('user_screen_id', $user_screen_id)->first()->toArray();
        }
        if ($get_user_rights != null) {
            $user_screen = UserScreenCreation::select('id', 'screen_name', 'order_number', 'more_options', 'remove_options')
                ->where('delete_status', 'no')
                ->where('status', 'active')
                ->where('id', $user_screen_id)
                ->first();
            if($user_screen != null) {
                $remove_options = ($user_screen['remove_options']!='')?json_decode($user_screen['remove_options'], true):[];
                if(in_array('view', $remove_options)){
                    $get_user_rights['view_rights'] = '0';
                }
                if(in_array('add', $remove_options)){
                    $get_user_rights['add_rights'] = '0';
                }
                if(in_array('edit', $remove_options)){
                    $get_user_rights['edit_rights'] = '0';
                }
                if(in_array('delete', $remove_options)){
                    $get_user_rights['delete_rights'] = '0';
                }
                $get_user_rights['more_rights'] = ($get_user_rights['more_rights'] != '') ? json_decode($get_user_rights['more_rights'], true) : [];
            } else {
                $get_user_rights['view_rights'] = '0';
                $get_user_rights['add_rights'] = '0';
                $get_user_rights['edit_rights'] = '0';
                $get_user_rights['delete_rights'] = '0';
                $get_user_rights['more_rights'] = [];
            }
        }
        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'get_user_rights' => $get_user_rights], 200);
    }
    public function get_user_screen_rights(Request $request)
    {
        $user_type_id = $request->input('user_type_id');
        $user_screen_rights = [];
        $user_screen1 = UserScreenCreation::select('id as user_screen_id', 'screen_name', 'order_number', 'more_options', 'remove_options')
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->get();
        if($user_screen1 != null){
            foreach($user_screen1 as $user_screen2){
                $remove_options = ($user_screen2['remove_options']!='')?json_decode($user_screen2['remove_options'], true):[];
                $get_user_rights1 = null;
                if($user_type_id != ''){
                    $get_user_rights1 = UserPermissionCreation::where('user_type_id', $user_type_id)->where('user_screen_id', $user_screen2['user_screen_id'])->first();
                }
                if($get_user_rights1 != null){
                    $user_screen_rights[$user_screen2['user_screen_id']] = [
                        'user_screen_id' => $user_screen2['user_screen_id'],
                        'view_rights' => (in_array('view', $remove_options) ? '0' : $get_user_rights1['view_rights']),
                        'add_rights' => (in_array('add', $remove_options) ? '0' : $get_user_rights1['add_rights']),
                        'edit_rights' => (in_array('edit', $remove_options) ? '0' : $get_user_rights1['edit_rights']),
                        'delete_rights' => (in_array('delete', $remove_options) ? '0' : $get_user_rights1['delete_rights']),
                        'more_rights' => (($get_user_rights1['more_rights'] != '') ? json_decode($get_user_rights1['more_rights'], true) : [])
                    ];
                }else{
                    $user_screen_rights[$user_screen2['user_screen_id']] = [
                        'user_screen_id' => $user_screen2['user_screen_id'],
                        'view_rights' => '0',
                        'add_rights' => '0',
                        'edit_rights' => '0',
                        'delete_rights' => '0',
                        'more_rights' => []
                    ];
                }
            }
        }
        return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_screen_rights' => $user_screen_rights], 200);
    }

}
