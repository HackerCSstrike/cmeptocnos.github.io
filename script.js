const tg = window.Telegram.WebApp;
tg.expand();

let balance = 1000;
const cube = document.getElementById('cube');

const faceAngles = {
    1: 'translateZ(-40px) rotateY(0deg)',
    2: 'translateZ(-40px) rotateY(-90deg)',
    3: 'translateZ(-40px) rotateY(-180deg)',
    4: 'translateZ(-40px) rotateY(90deg)',
    5: 'translateZ(-40px) rotateX(-90deg)',
    6: 'translateZ(-40px) rotateX(90deg)'
};

function playGame() {
    const bet = parseInt(document.getElementById('bet-amount').value);
    const pick = document.getElementById('bet-outcome').value;

    if (isNaN(bet) || bet <= 0 || bet > balance) {
        tg.HapticFeedback.notificationOccurred('error');
        return alert("Недостаточно средств!");
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
        else if (parseInt(pick) === res) win = true;

        setTimeout(() => {
            if (win) {
                balance += bet;
                tg.HapticFeedback.notificationOccurred('success');
            } else {
                balance -= bet;
                tg.HapticFeedback.notificationOccurred('warning');
            }
            document.getElementById('balance').innerText = `$${balance.toLocaleString()}`;
        }, 400);
    }, 600);
}

// Пополнение через Crypto Pay (базовая реализация)
function openCryptoBot() {
    tg.HapticFeedback.impactOccurred('light');
    // Ссылка на оплату должна генерироваться твоим сервером через Crypto Pay API
    tg.openTelegramLink('https://t.me/CryptoBot?start=pay'); 
}

function toggleModal(s) { document.getElementById('modal').style.display = s ? 'flex' : 'none'; }
