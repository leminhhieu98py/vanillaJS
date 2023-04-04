const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const formElement = document.getElementById('form');
const transactionsContainer = document.getElementById('list');
const balanceElement = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');

const data = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || []
};

const saveTransactionsToStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(data.transactions));
};

const resetHTML = () => {
  renderTransactions();
  renderBalanceInfo();
};

const removeTransaction = (id) => {
  data.transactions = data.transactions.filter(
    (transaction) => transaction.id !== id
  );

  resetHTML();
  saveTransactionsToStorage();
};

const renderBalanceInfo = () => {
  let moneyPlusAmount = 0;
  let moneyMinusAmount = 0;

  data.transactions.forEach(({ amount }) => {
    if (amount > 0) {
      moneyPlusAmount += Number(amount);
    } else {
      moneyMinusAmount += Number(amount);
    }
  });

  balanceElement.innerHTML = `$${(moneyPlusAmount + moneyMinusAmount).toFixed(
    2
  )}`;
  moneyPlus.innerHTML = `+$${moneyPlusAmount.toFixed(2)}`;
  moneyMinus.innerHTML = `-$${moneyMinusAmount.toFixed(2)}`;
};

const renderTransactions = () => {
  transactionsContainer.innerHTML = '';
  data.transactions.forEach((transaction) => {
    transactionsContainer.insertAdjacentHTML(
      'beforeend',
      `<li class=${transaction.amount > 0 ? 'plus' : 'minus'}>
     ${transaction.text}
    <span>${transaction.amount > 0 ? '+' : '-'}${Math.abs(
        transaction.amount
      )}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
       x
    </button>
    
  </li>`
    );
  });
};

const handleAddTransaction = (e) => {
  e.preventDefault();
  const text = textInput.value;
  const amount = amountInput.value;

  if (!text || !amount) {
    console.log('invalid transaction info');
    return;
  }

  data.transactions.push({ text, amount, id: new Date().getTime() });
  resetHTML();
  saveTransactionsToStorage();
};

const init = () => {
  formElement.addEventListener('submit', handleAddTransaction);
  resetHTML();
};

init();
