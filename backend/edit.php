<?php
include('connection.php');
$id=$_POST['id'];
$title=$_POST['title'];
$description=$_POST['description'];
$importance=$_POST['imp'];


$query = $mysqli->prepare("update tasks set title=?,description=?,importance=? where id=?");
$query->bind_param("sssi", $title, $description,$importance,$id);
if($query->execute()){
    $response['status'] = "success";
    $response["message"]="Task Updated Succesfuly";
    }
    else{
    $response["status"] = "failed";
    $response["message"]="Task Not updated";
    }
    header('Content-Type: application/json');

    echo json_encode($response);

?>
