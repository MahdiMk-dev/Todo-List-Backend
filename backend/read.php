<?php
include('connection.php');
$user_id=$_GET['user_id'];

$query = $mysqli->prepare("select id,title,description,importance,status from tasks where user_id=?");
$query->bind_param('i', $user_id);
$query->execute();
$query->bind_result($id,$title, $description, $importance,$status);
$tasks = array();
    while ($query->fetch()) {
        // Store each row in an associative array
        $task = array(
            "id"=>$id,
            "title" => $title,
            "description" => $description,
            "importance" => $importance,
            "status"=>$status
        );
        $tasks[] = $task;
    }
    
    // Return tasks as JSON
    header('Content-Type: application/json');
    echo json_encode($tasks);





?>
