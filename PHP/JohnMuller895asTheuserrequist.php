<?php

if()
$userName =$_POST['name'];
$From =$_POST['email'];
$subject =$_POST['subject'];
$Message =$_POST['body'];



$email_to = "john.muller8000@gmail.com";
$body = $Message;

mail($to,$subject,$body);

?>
