<?php 
include('connection.php');
$task_id = $_POST['id'];

// SQL to update task status to completed
$sql = "UPDATE tasks SET status = 'completed' WHERE id = $task_id";

if ($mysqli->query($sql) === TRUE) {
    $response['status'] = "success";
    $response['message'] = "Task Completed successfully";
} else {
    $response["status"] = "error";
    $response["message"] = "Task Failed to Complete";
}


header('Content-Type: application/json');
echo json_encode($response);
?>