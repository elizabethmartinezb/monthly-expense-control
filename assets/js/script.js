let expenseNameArray = [];
let expenseValueArray = [];
let expenseDescriptionArray = [];

function addExpense () {
    let expenseName = document.getElementById('expenseName').value;
    let expenseValue = Number(document.getElementById('expenseValue').value);
    let expenseDescription = document.getElementById('expenseDescription').value;

    expenseNameArray.push(expenseName);
    expenseValueArray.push(expenseValue);
    expenseDescriptionArray.push(expenseDescription)
    
    updateExpenseList();
    expenseAlert(expenseValue);
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    const totalSum = document.getElementById('expenseTotal');

    let htmlList = '';
    let expenseTotal = 0;

    expenseNameArray.forEach((element, position) => {
        const expenseValue = Number(expenseValueArray[position]);
        const expenseDescription = expenseDescriptionArray[position];
        htmlList += `<tr>
                            <td>${element}</td>
                            <td>USD ${expenseValue.toFixed(2)}</td>
                            <td>${expenseDescription}</td>
                            <td><button class="update-btn m-2"><i class="bi bi-pencil"></i></button><button onclick="deleteExpense(${position});"><i class="bi bi-x-circle"></i></button></td>
                        </tr>`;
        // Calculando el total de los gastos
        expenseTotal += Number(expenseValue);
    });

    expenseList.innerHTML = htmlList;
    totalSum.innerHTML = expenseTotal.toFixed(2);
    cleanFields();
}

function cleanFields() {
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseValue').value = '';
    document.getElementById('expenseDescription').value = '';
}

function deleteExpense(position) {
    console.log(position);
    
    expenseNameArray.splice(position, 1);
    expenseValueArray.splice(position, 1);
    expenseDescriptionArray.splice(position, 1);
    updateExpenseList();
}

function expenseAlert(expenseValue) {
    if(expenseValue > 150) {
        alert('Take care of your finances.! \nYou have spent more than $150 USD!')
    }
}