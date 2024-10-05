let employees = [];
let editIndex = -1;

function validateEmployee(employee) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if (employee.account.length < 4 || employee.account.length > 6) {
        alert("Tài khoản phải từ 4-6 ký số.");
        return false;
    }
    if (!nameRegex.test(employee.name)) {
        alert("Tên nhân viên phải là chữ.");
        return false;
    }
    if (!emailRegex.test(employee.email)) {
        alert("Email không hợp lệ.");
        return false;
    }
    if (!passwordRegex.test(employee.password)) {
        alert("Mật khẩu phải chứa 6-10 ký tự, ít nhất 1 số, 1 chữ hoa và 1 ký tự đặc biệt.");
        return false;
    }
    if (employee.salary < 1000000 || employee.salary > 20000000) {
        alert("Lương cơ bản phải từ 1.000.000 đến 20.000.000.");
        return false;
    }
    if (!employee.position) {
        alert("Vui lòng chọn chức vụ.");
        return false;
    }
    if (employee.hours < 80 || employee.hours > 200) {
        alert("Giờ làm trong tháng phải từ 80 đến 200.");
        return false;
    }

    return true;
}

function calculateTotalSalary(employee) {
    switch (employee.position) {
        case "Sếp":
            return employee.salary * 3;
        case "Trưởng phòng":
            return employee.salary * 2;
        case "Nhân viên":
            return employee.salary;
        default:
            return 0;
    }
}

function classifyEmployee(employee) {
    if (employee.hours >= 192) {
        return "Xuất sắc";
    } else if (employee.hours >= 176) {
        return "Giỏi";
    } else if (employee.hours >= 160) {
        return "Khá";
    } else {
        return "Trung bình";
    }
}

function addEmployee() {
    const account = document.getElementById('tknv').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const date = document.getElementById('datepicker').value;
    const salary = Number(document.getElementById('luongCB').value);
    const position = document.getElementById('chucvu').value;
    const hours = Number(document.getElementById('gioLam').value);

    const newEmployee = {
        account,
        name,
        email,
        password,
        date,
        salary,
        position,
        hours,
        totalSalary: calculateTotalSalary({ salary, position }),
        type: classifyEmployee({ hours })
    };

    if (!validateEmployee(newEmployee)) {
        return;
    }

    if (editIndex === -1) {
        employees.push(newEmployee);
    } else {
        employees[editIndex] = newEmployee;
        editIndex = -1;
    }

    displayEmployees();
    clearForm();
    $('#myModal').modal('hide');
}

function displayEmployees(filteredEmployees = employees) {
    const tableBody = document.getElementById('tableDanhSach');
    tableBody.innerHTML = '';

    filteredEmployees.forEach((employee, index) => {
        const row = `<tr>
            <td>${employee.account}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.date}</td>
            <td>${employee.position}</td>
            <td>${employee.totalSalary}</td>
            <td>${employee.type}</td>
            <td>
                <button onclick="editEmployee(${index})" class="btn btn-warning">Cập Nhật</button>
                <button onclick="deleteEmployee(${index})" class="btn btn-danger">Xóa</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function searchEmployeeByType() {
    const searchType = document.getElementById('searchType').value.trim().toLowerCase();

    if (!searchType) {
        displayEmployees();
        return;
    }

    const filteredEmployees = employees.filter(employee => {
        return employee.type.toLowerCase().includes(searchType);
    });

    displayEmployees(filteredEmployees);
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    displayEmployees();
}

function editEmployee(index) {
    const employee = employees[index];
    document.getElementById('tknv').value = employee.account;
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('password').value = employee.password;
    document.getElementById('datepicker').value = employee.date;
    document.getElementById('luongCB').value = employee.salary;
    document.getElementById('chucvu').value = employee.position;
    document.getElementById('gioLam').value = employee.hours;

    editIndex = index;
    $('#myModal').modal('show');
}

function clearForm() {
    document.getElementById('tknv').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('datepicker').value = '';
    document.getElementById('luongCB').value = '';
    document.getElementById('chucvu').value = '';
    document.getElementById('gioLam').value = '';
    editIndex = -1;
}

document.getElementById('btnThemNV').addEventListener('click', addEmployee);

document.getElementById('btnThem').addEventListener('click', function() {
    clearForm();
    editIndex = -1;
    $('#myModal').modal('show');
});

document.getElementById('btnTimNV').addEventListener('click', searchEmployeeByType);