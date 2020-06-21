
$(readyNow);

let employees = [];

function readyNow() {
    $('#employeeIn').on('click', addEmployee);
}



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
    for (let employee of array) {
        $('.employeeTable').append(
            `<tr class="${employee.idNumber}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.idNumber}</td>
                <td>${employee.jobTitle}</td>
                <td>$${employee.salary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                <td>
                    <button type="button" id="deleteId${employee.idNumber}">Delete</button>
                </td>
            </tr>`
        );
        // add event handler for delete clicks
        $(`#deleteId${employee.idNumber}`).on('click', deleteEmployee);
    }
    
    // add monthly cost to dom
    $('.costSection').append(
        '<p class="costLabel">Total Monthly:</p>',
        '<p class="costDisplay">', ' $', cost.toLocaleString(undefined, { maximumFractionDigits: 2 }),'</p>'        
        );
    // turn red if cost is > 20000
    if (cost > 20000) {
        $('.costSection').css('background-color','red');
    } else {
        $('.costSection').css('background-color','white');
    }
} // end printEmployees



function deleteEmployee() {
    console.log('in deleteEmployee')
    for (i=0; employees.length > i; i++) {
        console.log('checking array item for delete button match');
        if ('deleteId' + employees[i].idNumber === $(this).attr('id')) {
            employees.splice(i,1);
            console.log('found match');
        }
    }
    printEmployees(employees);
}


