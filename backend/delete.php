<?php
include('connection.php');
$id=$_POST['id'];

$query = $mysqli->prepare("delete from tasks where id=?");
$query->bind_param("i", $id);
        if ($query->execute()) {
            echo json_encode(array("status" => "success", "message" => "Task deleted successfully"));
        } else {
            echo json_encode(array("status" => "error", "message" => "Error deleting task"));
        }




?>
