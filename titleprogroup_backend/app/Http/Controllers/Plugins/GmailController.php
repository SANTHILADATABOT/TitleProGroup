<?php

namespace App\Http\Controllers\Plugins;

use App\Http\Controllers\Controller;
use Exception;

class GmailController extends Controller
{
    public function sentMail($to_mailid, $to_name, $subject, $body)
    {
        $to_mailid1 = [];
        if($to_mailid != ''){
            $to_mailid1[] = $to_mailid;
        }
        // $to_mailid1 =['ranjith4santhila@gmail.com'];
        if ((count($to_mailid1) > 0) && ($to_name != '') && ($subject != '') && ($body != '')) {
            try {
                $endpoint = 'https://santhila.com/titlepro_mail_test/';
                $postData = ['to_mailid' => json_encode($to_mailid1), 'to_name' => $to_name, 'subject' => $subject, 'body' => $body];
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $endpoint);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($ch);
                curl_close($ch);
                return ($response == '1');
            } catch (Exception $e) {
                return false;
            }
        } else {
            return false;
        }
    }
    public function sentMail_attachments($to_mailid, $subject, $body, $files)
    {
        // $to_mailid =['ranjith4santhila@gmail.com'];
        if ((count($to_mailid) > 0) && ($subject != '') && ($body != '')) {
            try {
                $endpoint = 'https://santhila.com/titlepro_mail_test/';
                $postData = ['to_mailid' => json_encode($to_mailid), 'subject' => $subject, 'body' => $body];
                $post_files = [];
                if (count($files) > 0) {
                    foreach($files as $files1){
                        if($files1['url'] != null || $files1['url'] != ""){
                            $fileContents = file_get_contents($files1['url']);
                            if ($fileContents) {
                                $post_files[] = [
                                    'fileContents' => base64_encode($fileContents),
                                    'fileName' => $files1['file_name']
                                ];
                            }
                        }
                    }
                }
                $postData['files'] = $post_files;
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $endpoint);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($ch);
                if ($response === false) {
                    $error = curl_error($ch);
                    curl_close($ch);
                    return false;
                } else {
                    curl_close($ch);
                    return ($response == '1');
                }
            } catch (Exception $e) {
                return $e;
            }
        } else {
            return false;
        }
    }






}
