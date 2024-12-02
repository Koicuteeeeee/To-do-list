<?php

@include 'config.php';

session_start();

    if(isset($_POST['submit'])){

    $name = isset($_POST['name']) ? mysqli_real_escape_string($conn, $_POST['name']) : "";
    $email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : "";
    $pass = isset($_POST['password']) ? $_POST['password'] : ""; // Don't hash here
    $cpass = isset($_POST['cpassword']) ? $_POST['cpassword'] : "";
    $user_type = isset($_POST['user_type']) ? $_POST['user_type'] : "";

    // Using prepared statements to prevent SQL injection
    $select = "SELECT * FROM user_form WHERE email =  ? ";
    $stmt = mysqli_prepare($conn, $select);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if(mysqli_num_rows($result) > 0){

        $row = mysqli_fetch_array($result);
  
        if($row['user_type'] == 'admin'){
  
           $_SESSION['admin_name'] = $row['name'];
           header('location:index.php');
  
        }elseif($row['user_type'] == 'user'){
  
           $_SESSION['user_name'] = $row['name'];
           header('location:User.php');
  
        }
       
     }else{
        $error[] = 'incorrect email or password!';
     }
  
  };
  ?>
  

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>login form</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="style.css">

</head>
<body>
   
<div class="form-container">

   <form action="" method="post">
      <h3>login now</h3>
      <?php
      if(isset($error)){
         foreach($error as $error){
            echo '<span class="error-msg">'.$error.'</span>';
         };
      };
      ?>
      <input type="email" name="email" required placeholder="enter your email">
      <input type="password" name="password" required placeholder="enter your password">
      <input type="submit" name="submit" value="login now" class="form-btn">
      
   </form>

</div>

</body>
</html>