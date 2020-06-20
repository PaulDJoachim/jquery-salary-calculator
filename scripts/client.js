
$(readyNow);

let employees = [];

function readyNow() {
    $('#employeeIn').on('click', addEmployee);
}

function addEmployee() {
    const employeeObj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        idNumber: $('#idNumber').val(),
        jobTitle: $('#jobTitle').val(),
        salary: $('#salary').val()
    }
    employees.push(employeeObj);
    console.log(`added ${employees[employees.length-1].firstName} ${employees[employees.length-1].lastName}`);
    
}