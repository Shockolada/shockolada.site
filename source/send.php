<?php
$to = "shockolada.site@gmail.com";
$from = $_POST['email'];
$subject = $_POST['subject'];
$txt = $_POST['message'];
$headers = "From:" . $from;

mail($to,$subject,$txt,$headers);
?>
