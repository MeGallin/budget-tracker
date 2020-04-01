const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

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
    alert('please values');
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

  // Add Class based on income or expense

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
        ${transaction.text} <span>${sign} ${Math.abs(
    transaction.amount
  )}</span> <button class='delete-btn' onClick='removeTransaction(${
    transaction.id
  })'>X</button>
    `;
  list.appendChild(item);
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
  transactions = transactions.filter(item => {
    if (item.id !== id) {
      return item;
    }
    updateLocalStorage();
    init();
  });
};

// Update local storage transactions

let updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Init app
let init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDom);
  updateValues();
};

init();

form.addEventListener('submit', addTransaction);
