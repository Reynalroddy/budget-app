//grab all elements

let expenseName = document.querySelector("#expense-name");
let expenseAmount = document.querySelector("#expense-amount");
let expenseSubmitBtn = document.querySelector("#submit-expense");
let expenseDashboard = document.querySelector(".expenses-dashboard");

let incomeName = document.querySelector("#income-name");
let incomeAmount = document.querySelector("#income-amount");
let incomeSubmitBtn = document.querySelector("#submit-income");
let incomeDashboard = document.querySelector(".income-dashboard");

let incomeBal = document.querySelector(".income-amnt");
let bal = document.querySelector(".bal-amnt");

let alert = document.querySelector(".notification-alert");
let list = [];
let editCheck = false;
let editElement1;
let editElement2;
expenseDashboard.addEventListener("click", ediDelExp);

incomeDashboard.addEventListener("click", ediDelInc);
//create class ui

class Entry {
  constructor(name, amount, type) {
    this.name = name;
    this.amount = amount;
    this.type = type;
  }
}
class Ui {
  constructor() {}
  /* 
  calculateTotal(type, arrLis) {
    let total = 0;
    let expTotal = 0;
    let incTotal = 0;
    arrLis.forEach(function (item) {
      if (item.type === type) {
        total += parseInt(item.amount);
      }
    });
    console.log(total);

    if (type === "income") {
      arrLis.forEach(function (item) {
        if (item.type === "expense") {
          expTotal += parseInt(item.amount);
        }
      });
      console.log(expTotal);
      incomeBal.textContent = total;
      bal.textContent = parseInt(total) - parseInt(expTotal);
    } else if (type === "expense") {
      arrLis.forEach(function (item) {
        if (item.type === "income") {
          incTotal += parseInt(item.amount);
        }
      });
      console.log(incTotal);
      bal.textContent = parseInt(incTotal) - parseInt(total);
    }
  }
*/

  editItem(type, inpName, inpAmount) {
    if (type === "expense") {
      inpName.innerText = expenseName.value;
      inpAmount.innerText = expenseAmount.value;
    }
  }
  displayCalculation(type, lisst) {
    let total = 0;
    let incTotal = 0;
    let totalExpense = 0;
    lisst.forEach(function (item) {
      if (item.type === type) {
        total += parseInt(item.amount);
      }
    });
    console.log(total);
    if (type === "income") {
      lisst.forEach(function (item) {
        if (item.type === "expense") {
          totalExpense += parseInt(item.amount);
        }
      });
      console.log(total);
      console.log(totalExpense);
      incomeBal.innerText = total;
      bal.innerText = eval(total - totalExpense);
    } else if (type === "expense") {
      lisst.forEach(function (item) {
        if (item.type === "income") {
          incTotal += parseInt(item.amount);
          console.log(incTotal);
        }

        console.log(incTotal);
      });
      bal.innerText = eval(incTotal - total);
    }
  }

  clearInput(arr) {
    arr.forEach((element) => {
      element.value = "";
    });
  }

  displayNotification(p, type) {
    alert.classList.remove("d-none");
    alert.className = `alert ${type} notification-alert`;
    setTimeout(function () {
      alert.classList.add("d-none");
    }, 1000);
    alert.innerText = p;
  }

  displayEntry(type, entry) {
    if (type === "income") {
      const div = document.createElement("div");

      div.className =
        "income-list d-flex justify-content-around align-items-center";
      div.innerHTML = ` <span class="income-dashboard-name">${entry.name}</span>
                              <span class="income-dashboard-price">${entry.amount}</span>
                              <span
                                class="income-dashboard-edit fas fa-edit"
                              ></span>
                              <span
                                class="income-dashboard-de fas fa-trash"
                              ></span>`;

      incomeDashboard.insertAdjacentElement("afterbegin", div);
    } else if (type === "expense") {
      const div = document.createElement("div");
      div.className =
        "expenses-list d-flex justify-content-around align-items-center";
      div.innerHTML = ` <span class="income-dashboard-name">${entry.name}</span>
                              <span class="income-dashboard-price">${entry.amount}</span>
                              <span
                                class="exp-dashboard-edit fas fa-edit"
                              ></span>
                              <span
                                class="exp-dashboard-de fas fa-trash"
                              ></span>`;

      expenseDashboard.insertAdjacentElement("afterbegin", div);
    }
  }
  //create new list
}

//add click function event

const ui = new Ui();
incomeSubmitBtn.addEventListener("click", collectIncomeData);
expenseSubmitBtn.addEventListener("click", collectExpenseData);

function ediDelExp(e) {
  console.log(e.target);
  if (e.target.classList.contains("exp-dashboard-edit")) {
    console.log("edit");
    let element = e.target.parentElement;
    editElement1 = element.firstElementChild;
    editElement2 = editElement1.nextElementSibling;

    expenseName.value = editElement1.innerText;
    expenseAmount.value = editElement2.innerText;
    expenseSubmitBtn.innerText = "edit";
    expenseDashboard.removeChild(element);
    list.forEach(function (item, index) {
      if (editElement1.innerText === item.name) {
        list.splice(index, 1);
      }
    });
    console.log(list);
    ui.displayCalculation("expense", list);
    editCheck = true;
  } else if (e.target.classList.contains("exp-dashboard-de")) {
    console.log("del");
  }
}

function ediDelInc(e) {
  console.log(e.target);
  if (e.target.classList.contains("income-dashboard-edit")) {
    console.log("edit");
    let element = e.target.parentElement;
    editElement1 = element.firstElementChild;
    editElement2 = editElement1.nextElementSibling;

    incomeName.value = editElement1.innerText;
    incomeAmount.value = editElement2.innerText;
    incomeSubmitBtn.innerText = "edit";
    incomeDashboard.removeChild(element);
    list.forEach(function (item, index) {
      if (editElement1.innerText === item.name) {
        list.splice(index, 1);
      }
    });
    console.log(list);
    ui.displayCalculation("income", list);
    editCheck = true;
  } else if (e.target.classList.contains("inc-dashboard-de")) {
    console.log("del");
  }
}
function collectIncomeData() {
  const incomeInput = parseFloat(incomeAmount.value);
  const incomeTitle = incomeName.value;

  if (incomeInput === "" || incomeTitle === "") {
    ui.displayNotification("please fill the form", "alert-danger");
  } else if (incomeInput && incomeTitle) {
    ui.displayNotification("Adding your entry...", "alert-success");

    //create an object instance with the income entry and save to array

    const type = "income";
    const entryIncome = new Entry(incomeTitle, incomeInput, type);
    list.push(entryIncome);
    ui.displayEntry(type, entryIncome);
    ui.clearInput([incomeAmount, incomeName]);
    ui.displayCalculation(type, list);
    //ui.calculateTotal(type, list);
  } else if (incomeInput && incomeTitle && editCheck) {
    const type = "income";
    const entryIncome = new Entry(incomeTitle, incomeInput, type);
    list.push(entryIncome);

    ui.displayNotification("Edit your entry...", "alert-success");
    ui.displayEntry(type, entryIncome);
    ui.clearInput([incomeAmount, incomeName]);
    ui.displayCalculation(type, list);
  }
}

function collectExpenseData() {
  const expenseInput = parseFloat(expenseAmount.value);
  const expenseTitle = expenseName.value;

  if (expenseInput === "" || expenseTitle === "") {
    ui.displayNotification("please fill the form", "alert-danger");
  } else if (expenseInput && expenseTitle) {
    ui.displayNotification("Adding your entry...", "alert-success");

    //create an object instance with the income entry and save to array

    const type = "expense";
    const entryExpense = new Entry(expenseTitle, expenseInput, type);
    list.push(entryExpense);
    ui.displayEntry(type, entryExpense);
    ui.clearInput([expenseAmount, expenseName]);
    ui.displayCalculation(type, list);
    //ui.calculateTotal(type, list);
    console.log(list);
  } else if (expenseInput && expenseTitle && editCheck) {
    const type = "expense";
    const entryExpense = new Entry(expenseTitle, expenseInput, type);
    list.push(entryExpense);
    ui.displayNotification("Edit your entry...", "alert-success");

    ui.displayEntry(type, entryExpense);
    ui.clearInput([expenseAmount, expenseName]);
    ui.displayCalculation(type, list);
  }
}
