<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\UserLogCreation;
use App\Models\Admin\UserCreation;
use App\Models\Admin\UserTypeCreation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserLogsController extends Controller
{
    public function user_logs_index(Request $request)
    {
        $userlog_tb = (new UserLogCreation())->getTable();
        $user_tb = (new UserCreation())->getTable();
        $usertype_tb = (new UserTypeCreation())->getTable();
        $user_logs_index1 = UserLogCreation::select("$userlog_tb.id", "$userlog_tb.user_id", "$user_tb.user_name", "$usertype_tb.user_type_name", "$userlog_tb.login_at", "$userlog_tb.description")
            ->leftJoin($user_tb,"$user_tb.id", "$userlog_tb.user_id")
            ->leftJoin($usertype_tb,"$usertype_tb.id", "$user_tb.user_type_id")
            ->get();

        if ($user_logs_index1 != null) {
            $user_logs_index = [];
            foreach ($user_logs_index1 as $user_logs_index2) {
                $user_logs_index2['login_at'] = date('d-m-Y h:i A',strtotime($user_logs_index2['login_at']));
                $user_logs_index[] = $user_logs_index2;
            }
            return response()->json(['status' => 'SUCCESS', 'message' => 'Index Showed Successfully', 'user_logs_index' => $user_logs_index], 200);
        } else {
            return response()->json(['status' => 'FAILURE', 'message' => 'Index Not Found'], 404);
        }
    }

}
