const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
let addTransaction = e => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    console.log('please values');
    editButton.style.display = 'none';
  } else {
    const transaction = {
      id: randomId(),
      text: text.value,
      amount: parseInt(amount.value)
    };

    transactions.push(transaction);
    addTransactionDom(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
};

// Generate simple id
let randomId = () => {
  return Math.floor(Math.random() * 10000000);
};

// Add transactions to the DOM
let addTransactionDom = transaction => {
  // Get the sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  //   const inputItem = document.createElement('input');
  //   item.setAttribute('id', 'editText');

  // Add Class based on income or expense

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  // Your button's onclick function's variables must be assigned with a quotes because it's value is String.
  item.innerHTML = `   
  <div class='wrapper'>
    <div class='inner-wrapper' onClick = 'selectEditValue(
        ${transaction.id},  
        "${transaction.text}",
        ${transaction.amount})'>    
        ${transaction.text} <span>${sign} ${Math.abs(
    transaction.amount
  )}</span> 
    </div>

    <div>
        <button class='delete-btn' onClick='removeTransaction(${
          transaction.id
        })'>
            X
        </button>
    </div>
  </div>
  
    `;
  list.appendChild(item);
};
var inx;
// Grab selected value to update
let selectEditValue = (id, text, amount) => {
  inx = id;
  console.log(inx, text, amount);
  document.getElementById('text').value = text;
  document.getElementById('amount').value = amount;
  submitButton.style.display = 'none';
  editButton.style.display = 'block';
};

// Handle selected values to edit
let handleSelectedValue = id => {
  console.log(inx);
  const textInputEdit = (document.getElementById('text').value = text.value);
  const amountInputEdit = (document.getElementById('amount').value =
    amount.value);

  transactions.map((item, i) => {
    if (item.id === inx) {
      transactions[i] = {
        id: inx,
        text: textInputEdit,
        amount: parseInt(amountInputEdit)
      };
    }
  });

  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';

  submitButton.style.display = 'block';

  init();
};

// Update the balance, income and expense
let updateValues = () => {
  const amounts = transactions.map(amount => amount.amount);

  const total = amounts
    .reduce((acc, item) => {
      return acc + item;
    }, 0)
    .toFixed(2);

  const income = amounts
    .filter(item => {
      if (item > 0) {
        return item;
      }
    })
    .reduce((acc, item) => {
      return acc + item;
    }, 0)
    .toFixed(2);

  const expense =
    amounts
      .filter(item => {
        if (item < 0) {
          return item;
        }
      })
      .reduce((acc, item) => {
        return acc + item;
      }, 0)
      .toFixed(2) * -1;
  balance.innerText = `${total}`;
  money_plus.innerText = `${income}`;
  money_minus.innerText = `${expense}`;
};

// Delete funtionality
let removeTransaction = id => {
  transactions = transactions.filter((item, i) => {
    if (item.id !== id) {
      return item;
    }
    updateLocalStorage();
    init();
  });
  console.log(transactions);
};

// Update local storage transactions

let updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Init app
let init = id => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDom);
  updateValues(id);
  editButton.style.display = 'none';
};

init();

form.addEventListener('submit', addTransaction);
