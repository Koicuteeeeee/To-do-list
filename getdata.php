<?php
require_once 'connect.php'; 
if ($conn->connect_error) {
  die("Kết nối CSDL thất bại: " . $conn->connect_error);
} 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST; 
    if (isset($data['id'])) {
      $id = intval($data['id']); // Chuyển đổi $id thành số nguyên
      $key = "congviec_" . explode("_", $data['id'])[1];
      $congviec = $data[$key];

      $sql = "UPDATE giao việc SET `Công việc` = ? WHERE STT = ?";
      $stmt = $conn->prepare($sql);

      if ($stmt === false) {
          die("Lỗi prepare: " . $conn->error);
      }
        
      $stmt->bind_param("si", $congviec, $id); 

        if ($stmt->execute()) {
          echo "Công việc đã được cập nhật thành công!";
        } else {
          echo "Lỗi: " . $stmt->error;
        }
        $stmt->close();
    } else {
        foreach ($data as $key => $value) {
            if (strpos($key, 'congviec_') === 0) {
              $congviec = $value;
              $sql = "INSERT INTO giao việc (`Công việc`) VALUES (?)"; 
              $stmt = $conn->prepare($sql);
              $stmt->bind_param("s", $congviec);
        
              if ($stmt->execute()) {
                echo "Công việc '$congviec' đã được thêm thành công!<br>";
              } else {
                echo "Lỗi: " . $stmt->error . "<br>";
              }
              $stmt->close();
            }
          }
    }
    $conn->close();
}
?>