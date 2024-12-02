<?php
  $host="localhost";
  $user="root";
  $pass="";
  $db="congviec";
  
  
  $conn=new mysqli($host,$user,$pass,$db);
 
  /*if($conn->connect_error){
    echo"FAILED CONNECTED TO DB".$conn->connect_error;
  } else {
    echo 'CONNECTED TO DB';
  }*/
  ?>