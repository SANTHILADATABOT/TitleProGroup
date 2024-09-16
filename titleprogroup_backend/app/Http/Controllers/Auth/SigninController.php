<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserCreation;
use App\Models\Admin\UserLogCreation;
use App\Models\Admin\UserTypeCreation;
use App\Models\Master\AssignTypeCreation;
use App\Models\Master\StaffCreation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SigninController extends Controller
{
    public function user_sign_in_check(Request $request)
    {
        $user_sign_in_check = UserCreation::select('id', 'user_type_id', 'staff_id', 'assign_type_id', 'mobile_number','mail_id', 'user_name', 'password', 'description', 'status', 'delete_status')
            ->where('mail_id', $request->input('mail_id'))
            ->where('delete_status', 'no')
            ->where('status', 'active')
            ->first();
        if($user_sign_in_check != null){
            if(\Illuminate\Support\Facades\Hash::check($request->input('password'), $user_sign_in_check->password)){
                $entry_date = Carbon::now()->toDateString();
                $user_log = new UserLogCreation([
                    'entry_date'=>$entry_date,
                    'user_id'=>$user_sign_in_check->id,
                    'login_at'=>Carbon::now(),
                    'description'=>'Website Login'
                ]);
                $user_log->save();

                $user_type = UserTypeCreation::where('id', $user_sign_in_check['user_type_id'])->first();
                $staff = StaffCreation::where('id', $user_sign_in_check['staff_id'])->first();
                $assign_type = null;
                if($user_sign_in_check['assign_type_id'] != ''){
                    $assign_type = AssignTypeCreation::whereIn('id',json_decode($user_sign_in_check['assign_type_id'],true))->pluck('assign_type_name')->toArray();
                }

                $user_sign_in_check1 = [
                    'id' => $user_sign_in_check->id,
                    'user_type_id' => (($user_type != null) ? $user_type['id'] : ''),
                    'user_type_name' => (($user_type != null) ? $user_type['user_type_name'] : ''),
                    'staff_id' => $user_sign_in_check->staff_id,
                    'staff_name' => (($staff != null) ? $staff['staff_name'] : ''),
                    'assign_type_id' => ($user_sign_in_check->assign_type_id != '') ? json_decode($user_sign_in_check->assign_type_id, true) : [],
                    'assign_type' => (($assign_type != null) ? $assign_type : []),
                    'mobile_number' => $user_sign_in_check->mobile_number,
                    'mail_id' => $user_sign_in_check->mail_id,
                    'user_name' => $user_sign_in_check->user_name,
                    'description' => $user_sign_in_check->description,
                ];

                return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_sign_in_check' => $user_sign_in_check1], 200);
            } else {
                return response()->json(['status' => 'FAILURE', 'message' => 'Invalid Password'], 404);
            }
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Invalid Mobile Number'], 404);
        }
    }

}
