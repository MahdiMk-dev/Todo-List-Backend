<?php
include('connection.php');

$title=$_POST['title'];
$description=$_POST['description'];
$importance=$_POST['imp'];
$user_id=$_POST['user_id'];

$query = $mysqli->prepare("insert into tasks (title,description,importance,user_id) values (?,?,?,?)");
$query->bind_param("sssi", $title, $description,$importance,$user_id);
//var_dump($query);
if($query->execute()){
//var_dump($mysqli->error);
$response['status'] = "success";
$response["message"]="Task created Succesfuly";
}
else{
$response["status"] = "failed";
$response["message"]="Task Not Created";
}
    //$response['message'] = "failed". $mysqli->error;;





header('Content-Type: application/json');

echo json_encode($response);



?>