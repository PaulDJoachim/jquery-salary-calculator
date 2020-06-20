
$(readyNow);

let employees = [];

function readyNow() {
    $('#employeeIn').on('click', addEmployee);
}

function addEmployee() {
    // create an object for each new employee
    const employeeObj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        idNumber: $('#idNumber').val(),
        jobTitle: $('#jobTitle').val(),
        salary: Number($('#salary').val())
    } // end employeeObj
    // add the new object to the employees array
    employees.push(employeeObj);
    // log a note in the console to show that the submission is in the array
    console.log(`added ${employees[employees.length-1].firstName} ${employees[employees.length-1].lastName}`);
    // display the employees on the DOM
    printEmployees(employees);
    // calculate the monthly cost
    monthlyCost(employees);
    
} // end addEmployee


// calculate monthly cost
function monthlyCost(array) {
    let total = 0;
    let cost = 0;
    // add all employee salaries
    for (let employee of array) {
        total += employee.salary;
    }
    // divide by 12 to get monthly cost
    cost = total / 12;
    return cost;
} // end monthlyCost

// display the employees on the DOM
function printEmployees(array) {
    // clear any previous table
    $('.employeeTable').empty();
    // create a new table header
    $('.employeeTable').append(
        `<tr class="tableHeader">
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID #</th>
            <th>Job Title</th>
            <th>Annual Salary</th>`
    );
    // add rows with data for each employee
    for (let employee of array) {
        $('.employeeTable').append(
            `<tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.salary}</td>
            </tr>`
        );
    }
}