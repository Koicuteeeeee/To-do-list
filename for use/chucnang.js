
const thembtn = document.getElementById("thembtn");
const xoabtn = document.getElementById("xoabtn");
const tableBody = document.querySelector("table tbody");

let selectedRow = null; 
let nextId = 1;

function selectRow(row) {
    // Kiểm tra xem đã có hàng nào được chọn trước đó chưa
    if (selectedRow) {
      // Nếu có, bỏ chọn hàng đó (ví dụ: xóa lớp CSS "selected")
      selectedRow.classList.remove("selected");
    }
  
    // Chọn hàng mới
    selectedRow = row;
    row.classList.add("selected"); // Thêm lớp CSS để đánh dấu hàng đã chọn
  }
  function updateSTT() {
    const rows = tableBody.rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1; // Cập nhật STT cho mỗi hàng
    }
}
thembtn.addEventListener("click", function(event) {
  event.preventDefault();
  const newRow = document.createElement("tr");
  

  const sttCell = document.createElement("td");
  const congviecCell = document.createElement("td");

  sttCell.textContent = tableBody.rows.length + 1;

  newRow.appendChild(sttCell);
  newRow.appendChild(congviecCell);
  tableBody.appendChild(newRow);


});

tableBody.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.tagName === "TD" && event.target.cellIndex === 1) { 
      selectRow(event.target.parentNode);
      const row = event.target.parentNode; 
   
    var rowlength = tableBody.rows.length;
    
    const currentContent = event.target.textContent;
  
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentContent;
      event.target.innerHTML = "";
      event.target.appendChild(input);
      input.focus;

      
      input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") { 
        var newContent = input.value;
        event.target.textContent = newContent;
        
      
     
      
        const tableData = [];
        const rows = tableBody.rows;
        for (let i = 0; i < rows.length; i++) {
            const stt = i + 1; // STT bắt đầu từ 1
            const congviec = rows[i].cells[1].textContent; // Lấy nội dung từ cột thứ 2 (Công việc)
            tableData.push({ STT: stt, Congviec: congviec });
            
          }

        // Gửi dữ liệu đến file PHP
        $.ajax({
            url: 'getdata.php', // Thay 'save_data.php' bằng tên file PHP của bạn
            method: 'post',
            data: { tableData: tableData }, // Gửi dữ liệu dưới dạng mảng
            success: function(response) {
                // Xử lý phản hồi từ server nếu cần
                console.log(response);
            }
        });
       /* if (sessionStorage.getItem('isReloaded')) {
          console.log('Trang web đã được tải lại');
        } else {
          sessionStorage.setItem('isReloaded', true);
          console.log('Trang web được tải lần đầu');
        } kiểm tra xem liệu trang web có bị tải lại hay không, dùng trong việc kiểm tra 
        và fix lỗi sau kh bấm enter thì trang web tự động thêm dòng mới vào*/ 
        
            
      
      }
      });
    }
});



// Delete selected row
xoabtn.addEventListener("click", function(event) {
    event.preventDefault();
    if (selectedRow) {
        tableBody.removeChild(selectedRow);
        updateSTT();
        selectedRow = null;
        const tableData = [];
        const rows = tableBody.rows;
        for (let i = 0; i < rows.length; i++) {
            const stt = i + 1; // STT bắt đầu từ 1
            const congviec = rows[i].cells[1].textContent; // Lấy nội dung từ cột thứ 2 (Công việc)
            tableData.push({ STT: stt, Congviec: congviec });
            
          }

        // Gửi dữ liệu đến file PHP
        $.ajax({
            url: 'getdata.php', // Thay 'save_data.php' bằng tên file PHP của bạn
            method: 'post',
            data: { tableData: tableData }, // Gửi dữ liệu dưới dạng mảng
            success: function(response) {
                // Xử lý phản hồi từ server nếu cần
                console.log(response);
            }
        });
      } else {
        alert("Vui lòng chọn một hàng để xoá.");
    }
});
