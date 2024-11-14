
const thembtn = document.getElementById("thembtn");
const suabtn = document.getElementById("suabtn");
const xoabtn = document.getElementById("xoabtn");
const tableBody = document.querySelector("table tbody");

let selectedRow = null; 
let nextId = 1; // Biến đếm để tạo ID cho mỗi hàng

thembtn.addEventListener("click", function(event) {
    event.preventDefault();
    const newRow = document.createElement("tr");
    newRow.id = `congviec_${nextId++}`; // Gán ID cho hàng mới

    const sttCell = document.createElement("td");
    const congviecCell = document.createElement("td");

    sttCell.textContent = tableBody.rows.length + 1;

    newRow.appendChild(sttCell);
    newRow.appendChild(congviecCell);
    tableBody.appendChild(newRow);

    newRow.addEventListener("click", () => selectRow(newRow));
});

tableBody.addEventListener("click", function(event) {
  event.preventDefault();
  if (event.target.tagName === "TD" && event.target.cellIndex === 1) { 
    const currentContent = event.target.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentContent;

    event.target.innerHTML = "";
    event.target.appendChild(input);

    input.focus();

    input.addEventListener("blur", function() {
      const newContent = input.value;
      event.target.textContent = newContent;

      const rowId = event.target.parentNode.parentNode.id; // Lấy ID của hàng
      const inputName = `congviec_${rowId.split('_')[1]}`; // Tạo tên input dựa trên ID

      const data = {
          id: rowId,
          [inputName]: newContent
      };
      console.log("Dữ liệu gửi đi:", data); // Kiểm tra dữ liệu

      $.ajax({
        contentType: 'application/json', // Thêm dòng này
        data: JSON.stringify(data),  
        url: 'getdata.php',
          method: 'POST',
          data: data
          
      });
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
    } else {
        alert("Vui lòng chọn một hàng để xoá.");
    }
});

// Select row function
function selectRow(row) {
    if (selectedRow) {
        selectedRow.style.backgroundColor = ""; // Reset previous selection
    }
    selectedRow = row;
    selectedRow.style.backgroundColor = "#f0f0f0"; // Highlight selected row
}

// Update STT (index) after deleting a row
function updateSTT() {
    Array.from(tableBody.rows).forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}



