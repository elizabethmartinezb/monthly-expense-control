let expenseNameArray = [];
let expenseValueArray = [];
let expenseDescriptionArray = [];
let message = "";

function validateFields(expenseName, expenseValue) {
    let errors = [];
    message = '';

    if (expenseName.trim() === "") {
        errors.push("Please fill the expense Name input.");
    }

    if (expenseValue === "") {
        errors.push("Please fill the expense value input.");
    } else {
        expenseValue = Number(expenseValue);
        if (isNaN(expenseValue) || expenseValue <= 0) {
            errors.push("Please enter a valid number greater than 0.");
        }
    }

    if (errors.length > 0) {
        message = errors.join(" ");
    }
}

function addExpense() {
    let expenseName = document.getElementById("expenseName").value;
    let expenseValue = document.getElementById("expenseValue").value;
    let expenseDescription = document.getElementById("expenseDescription").value;

    validateFields(expenseName, expenseValue);

    if (message !== '') {
        alert(message);
        return;
    }

    expenseValue = Number(expenseValue);
    expenseNameArray.push(expenseName);
    expenseValueArray.push(expenseValue);
    expenseDescriptionArray.push(expenseDescription);

    updateExpenseList();
    expenseAlert(expenseValue);
}

function updateExpenseList() {
    const expenseList = document.getElementById("expenseList");
    const totalSum = document.getElementById("expenseTotal");

    let htmlList = "";
    let expenseTotal = 0;

    expenseNameArray.forEach((element, position) => {
        const expenseValue = Number(expenseValueArray[position]);
        const expenseDescription = expenseDescriptionArray[position];
        htmlList += `<tr>
                            <td>${element}</td>
                            <td>USD ${expenseValue.toFixed(2)}</td>
                            <td>${expenseDescription}</td>
                            <td><button class="m-2" onclick="editExpense(${position})"><i class="bi bi-pencil"></i></button><button onclick="deleteExpense(${position});"><i class="bi bi-x-circle"></i></button></td>
                        </tr>`;
        // Calculando el total de los gastos
        expenseTotal += Number(expenseValue);
    });

    expenseList.innerHTML = htmlList;
    totalSum.innerHTML = expenseTotal.toFixed(2);
    cleanFields();
}

function cleanFields() {
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseValue").value = "";
    document.getElementById("expenseDescription").value = "";
}

function deleteExpense(position) {
    console.log(position);

    expenseNameArray.splice(position, 1);
    expenseValueArray.splice(position, 1);
    expenseDescriptionArray.splice(position, 1);
    updateExpenseList();
}

function expenseAlert(expenseValue) {
    if (expenseValue > 150) {
        alert("Take care of your finances.! \nYou have spent more than $150 USD!");
    }
}

function editExpense(position) {
    // Carga los valores del gasto seleccionado en los inputs
    document.getElementById("expenseName").value = expenseNameArray[position];
    document.getElementById("expenseValue").value = expenseValueArray[position];
    document.getElementById("expenseDescription").value = expenseDescriptionArray[position];
    
    // Modifica el botón para ejecute la función updateExpense
    document.getElementById("formButton").setAttribute("onclick", `updateExpense(${position})`);
    document.getElementById("formButton").innerHTML = "Update Expense";
}

function updateExpense(position) {
    let expenseName = document.getElementById("expenseName").value;
    let expenseValue = Number(document.getElementById("expenseValue").value);
    let expenseDescription = document.getElementById("expenseDescription").value;

    // Validar los campos antes de actualizar el gasto
    validateFields(expenseName, expenseValue);

    if (message !== '') {
        alert(message);
        return;
    }

    // Actualizar los valores en los arrays
    expenseNameArray[position] = expenseName;
    expenseValueArray[position] = expenseValue;
    expenseDescriptionArray[position] = expenseDescription;

    // Restablece el botón para permitir agregar gastos
    document.getElementById("formButton").setAttribute("onclick", "addExpense()");
    document.getElementById("formButton").innerHTML = "Add Expense";

    // Actualizar la lista de gastos y limpiar los campos
    updateExpenseList();
}
