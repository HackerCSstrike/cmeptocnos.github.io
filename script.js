// Получаем элементы DOM
const balanceElement = document.getElementById('balance');
const addApplesButton = document.getElementById('add-apples');
const buyModal = document.getElementById('buy-modal');
const appleInput = document.getElementById('apple-input');
const totalPrice = document.getElementById('total-price');
const buyApplesButton = document.getElementById('buy-apples');
const instructionButton = document.getElementById('instruction-button');
const instructionModal = document.getElementById('instruction-modal');
const closeInstructionButton = document.getElementById('close-instruction');

// Переменная для хранения баланса
let balance = 0;

// Функция увеличения баланса
function increaseBalance() {
  balance += 1;
  balanceElement.textContent = balance;
}

// Показать окно покупки яблок
addApplesButton.addEventListener('click', () => {
  buyModal.classList.remove('hidden');
  buyModal.classList.add('visible');
});

// Закрыть окно покупки яблок
document.addEventListener('click', (event) => {
  if (!buyModal.contains(event.target) && !addApplesButton.contains(event.target)) {
    buyModal.classList.add('hidden');
    buyModal.classList.remove('visible');
  }
});

// Расчет стоимости яблок
appleInput.addEventListener('input', () => {
  const apples = parseFloat(appleInput.value) || 0;
  const price = apples * 3.15;
  totalPrice.textContent = `Общая стоимость: $${price.toFixed(2)}`;
});

// Купить яблоки (перенаправление на ссылку)
buyApplesButton.addEventListener('click', () => {
  window.location.href = 'https://t.me/anon_spire ';
});

// Показать модальное окно инструкции
instructionButton.addEventListener('click', () => {
  instructionModal.classList.remove('hidden');
  instructionModal.classList.add('visible');
});

// Закрыть модальное окно инструкции
closeInstructionButton.addEventListener('click', () => {
  instructionModal.classList.add('hidden');
  instructionModal.classList.remove('visible');
});

// Закрыть модальное окно при клике вне его области
document.addEventListener('click', (event) => {
  if (!instructionModal.contains(event.target) && !instructionButton.contains(event.target)) {
    instructionModal.classList.add('hidden');
    instructionModal.classList.remove('visible');
  }
});