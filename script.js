const tg = window.Telegram.WebApp;
tg.expand();

// Уникальный ключ для баланса на основе ID пользователя
const userId = tg.initDataUnsafe?.user?.id || "local";
let balance = parseInt(localStorage.getItem(`webx_bal_${userId}`)) || 1000;

const cube = document.getElementById('cube');
const faceAngles = {
    1: 'translateZ(-40px) rotateY(0deg)',
    2: 'translateZ(-40px) rotateY(-90deg)',
    3: 'translateZ(-40px) rotateY(-180deg)',
    4: 'translateZ(-40px) rotateY(90deg)',
    5: 'translateZ(-40px) rotateX(-90deg)',
    6: 'translateZ(-40px) rotateX(90deg)'
};

function updateView() {
    document.getElementById('balance').innerText = `$${balance.toLocaleString()}`;
    localStorage.setItem(`webx_bal_${userId}`, balance);
}

function playGame() {
    const bet = parseInt(document.getElementById('bet-amount').value);
    const pick = document.getElementById('bet-outcome').value;

    if (isNaN(bet) || bet > balance || bet <= 0) {
        tg.HapticFeedback.notificationOccurred('error');
        return alert("Ошибка ставки!");
    }

    tg.HapticFeedback.impactOccurred('medium');
    cube.classList.add('spinning');

    setTimeout(() => {
        cube.classList.remove('spinning');
        const res = Math.floor(Math.random() * 6) + 1;
        cube.style.transform = faceAngles[res];

        let win = false;
        if (pick === 'even' && res % 2 === 0) win = true;
        else if (pick === 'odd' && res % 2 !== 0) win = true;
        else if (pick === 'more' && res > 3) win = true;
        else if (pick === 'less' && res <= 3) win = true;

        setTimeout(() => {
            if (win) {
                balance += bet;
                tg.HapticFeedback.notificationOccurred('success');
            } else {
                balance -= bet;
                tg.HapticFeedback.notificationOccurred('error');
            }
            updateView();
        }, 500);
    }, 600);
}

function toggleModal(s) { document.getElementById('modal').style.display = s ? 'flex' : 'none'; }
function openCryptoBot() { tg.openTelegramLink('https://t.me/CryptoBot?start=pay'); }

updateView();
