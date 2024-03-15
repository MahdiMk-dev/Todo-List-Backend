<?php
include('connection.php');
$id=$_POST['id'];
$title=$_POST['title'];
$description=$_POST['decription'];
$importance=$_POST['importance'];
$user_id=$_POST['user_id'];

$query = $mysqli->prepare("update tasks set title='$title',description='$description',importance='$importance' where id='$id'");
$query->execute();



?>
