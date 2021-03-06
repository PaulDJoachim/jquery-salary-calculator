
$(readyNow);

// main employee array
let employees = [];

function readyNow() {
    $('#employeeIn').on('click', addEmployee);
    $('.employeeTable').on('click', $('.deleteBtn'), deleteEmployee)
} // end readyNow


// add an employee to the table, clear the input fields
function addEmployee() {
    // check to make sure there is a unique ID number
    $('.error').empty();
    for (employee of employees){
        if (employee.idNumber === $('#idNumber').val()) {
            $('.error').append('<p>New employees must have a unique ID Number!');
            return;
        }
    }
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
    // clear the input fields
    $('#firstName').val('')   
    $('#lastName').val('')
    $('#idNumber').val('')
    $('#jobTitle').val('')
    $('#salary').val('')
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


// display the employees in the array on the DOM
function printEmployees(array) {
    let cost = monthlyCost(employees);
    // clear any previous table / cost calculation
    $('.employeeTable').empty();
    $('.costSection').empty();
    // re-create table header
    $('.employeeTable').append(
        `<tr class="tableHeader">
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID #</th>
            <th>Job Title</th>
            <th>Annual Salary</th>`
    );
    // add rows with data for each employee
    // create a delete button with a unique ID matching the associated employee
    for (let employee of array) {
        $('.employeeTable').append(
            `<tr class="${employee.idNumber}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>$${employee.salary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                <td>
                    <button type="button" class="deleteBtn" id="deleteId${employee.idNumber}">Delete</button>
                </td>
            </tr>`
        );
        // add event handler for delete clicks (moved this to onReady)
        // $(`#deleteId${employee.idNumber}`).on('click', deleteEmployee);
    }
    
    // add monthly cost to dom
    $('.costSection').append(
        '<p class="costLabel">Total Monthly:</p>&nbsp',
        `<p class="costDisplay">$${cost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>`        
        );
    // turn red if cost is > 20000
    if (cost > 20000) {
        $('.costSection').css('background-color','rgb(204, 30, 30)');
    } else {
        $('.costSection').css('background-color', 'hsl(213, 26%, 85%)');
    }
} // end printEmployees


// match the delete button ID to an employee in the array and delete them
function deleteEmployee(event) {
    console.log('in deleteEmployee')
    // search through the employee array
    for (i=0; employees.length > i; i++) {
        console.log('checking array item for delete button match');
        // check for matches between the delete button ID and the employee ID in the employees array
        if (event.originalEvent.target.id === 'deleteId' + employees[i].idNumber) {
            // if found, delete the employee from the array
            employees.splice(i,1);
            console.log('found match');
        }
    }
    // re-print the table (without the deleted employee)
    printEmployees(employees);
}// end deleteEmployee
