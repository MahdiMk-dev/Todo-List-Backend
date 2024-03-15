<?php
include('connection.php');
$id=$_POST['id'];

$query = $mysqli->prepare("delete from tasks where id=?");
$query->bind_param("i", $id);

        // Execute the statement
        if ($query->execute()) {
            // Task deleted successfully
            echo json_encode(array("status" => "success", "message" => "Task deleted successfully"));
        } else {
            // Error executing query
            echo json_encode(array("status" => "error", "message" => "Error deleting task"));
        }




?>
