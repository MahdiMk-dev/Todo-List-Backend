<?php
include('connection.php');
$id=$_GET['id'];

$query = $mysqli->prepare("select id,title,description,importance,status,user_id from tasks where id=?");
$query->bind_param('i', $id);
$query->execute();
$query->bind_result($id,$title, $description, $importance,$status,$user_id);
$tasks = array();
    while ($query->fetch()) {
        // Store each row in an associative array
        $task = array(
            "id"=>$id,
            "title" => $title,
            "description" => $description,
            "importance" => $importance,
            "status"=>$status,
            "user_id"=>$user_id
        );
        $tasks[] = $task;
    }
    
    // Return tasks as JSON
    header('Content-Type: application/json');
    echo json_encode($tasks);





?>
