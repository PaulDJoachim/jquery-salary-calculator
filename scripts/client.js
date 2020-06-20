
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