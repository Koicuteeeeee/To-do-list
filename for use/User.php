<?php

@include 'config.php';

session_start();

if(!isset($_SESSION['user_name'])){
   header('location:login.php');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="table.css">

    <style>
  .center { text-align: center; 
    padding-right: 200px;}
 
</style>
</head>

   
<body>
<h3 class="center">Chào <span><?php echo $_SESSION['user_name'] ?></span>, đây là những việc bạn cần làm</h1>
   
   
    <form>
     <table class="table table-dark table-hover">
         <thead>
             <tr>
                 <th>STT</th>
                 <th>Công việc</th>
 
             </tr>
         </thead>
         
         <tbody>
         <?php
      require_once 'connect.php';
      $rows = mysqli_query($conn, "SELECT * FROM `giao việc`ORDER BY STT ASC");
      $i = 1;
      ?>
      <?php foreach($rows as $row) : ?>
        <tr id = <?php echo $row["STT"]; ?>>
        <td><?php echo $i++; ?></td>
        <td><?php echo $row["Công việc"]; ?></td>
        
      </tr>
      <?php endforeach; ?>
         </tbody>
     </table>
   
    
    </form>
    
   
    <div class="content">
    <a href="logout.php" class="btn">logout</a>
    </div>

   
</body>
</html>