const tg = window.Telegram.WebApp;
tg.expand();

const userId = tg.initDataUnsafe?.user?.id || "guest";
let balance = parseInt(localStorage.getItem(`bal_${userId}`)) || 1000;

const cube = document.getElementById('cube');
const angles = {
    1: 'translateZ(-40px) rotateY(0deg)',
    2: 'translateZ(-40px) rotateY(-90deg)',
    3: 'translateZ(-40px) rotateY(-180deg)',
    4: 'translateZ(-40px) rotateY(90deg)',
    5: 'translateZ(-40px) rotateX(-90deg)',
    6: 'translateZ(-40px) rotateX(90deg)'
};

function updateUI() {
    document.getElementById('balance').innerText = `$${balance.toLocaleString()}`;
    localStorage.setItem(`bal_${userId}`, balance);
}

function playGame() {
    const bet = parseInt(document.getElementById('bet-amount').value);
    const pick = document.getElementById('bet-outcome').value;

    if (isNaN(bet) || bet > balance || bet <= 0) return alert("Ошибка ставки!");

    tg.HapticFeedback.impactOccurred('medium');
    cube.classList.add('spinning');

    setTimeout(() => {
        cube.classList.remove('spinning');
        const res = Math.floor(Math.random() * 6) + 1;
        cube.style.transform = angles[res];

        let win = false;
        if (pick === 'even' && res % 2 === 0) win = true;
        else if (pick === 'odd' && res % 2 !== 0) win = true;
        else if (pick === 'more' && res > 3) win = true;
        else if (pick === 'less' && res <= 3) win = true;

        setTimeout(() => {
            if (win) { balance += bet; tg.HapticFeedback.notificationOccurred('success'); }
            else { balance -= bet; tg.HapticFeedback.notificationOccurred('error'); }
            updateUI();
        }, 500);
    }, 600);
}

function toggleModal(s) { document.getElementById('modal').style.display = s ? 'flex' : 'none'; }
function openCryptoBot() { tg.openTelegramLink('https://t.me/CryptoBot?start=pay'); }

updateUI(); // Загружаем баланс при старте
