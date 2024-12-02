<?php
require_once 'connect.php'; 
/*if ($conn->connect_error) {
  die("Kết nối CSDL thất bại: " . $conn->connect_error);
} */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $tableData = $_POST['tableData'];
    $sql = "DELETE FROM `giao việc`"; 
    if ($conn->query($sql) === TRUE) {
        echo "Đã xóa dữ liệu cũ thành công. ";
    } else {
        echo "Lỗi xóa dữ liệu: " . $conn->error;
    }
    foreach ($tableData as $row) {
      $stt = $row['STT'];
      $congviec = $row['Congviec'];
  
      // Câu lệnh SQL INSERT
      $sql = "INSERT INTO `giao việc` (`STT`,`Công việc`) VALUES ('$stt', '$congviec')";
  
      if ($conn->query($sql) === TRUE) {
          echo "Thêm dữ liệu thành công";
      } else {
          echo "Lỗi: " . $sql . "<br>" . $conn->error;
      }
  }
  mysqli_query($conn, $query);
  }
    ?>