const end = document.querySelector('#finish');
const sidebar = document.querySelector('.rulesBar')
const buttons = document.querySelectorAll('.finish')
const addPerson = document.querySelector('#addPerson')
const removePerson = document.querySelector('#removePerson')
let players = document.querySelectorAll('.player');
let success = document.querySelectorAll('.round.end.button');
let scores = document.querySelectorAll('input.score.end');
let editing = document.querySelectorAll('.player_edit');
let endRound = false;
const root = document.querySelector(':root')
const darkButton = document.querySelector('#darkToggle')
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        darkToggle()
    }
}

function resetVariables() {
    players = document.querySelectorAll('.player');
    success = document.querySelectorAll('.round.end.button');
    scores = document.querySelectorAll('input.score.end');
    editing = document.querySelectorAll('.player_edit');
}

// open and close round ending ---------------
end.addEventListener('click', () => {
    if (endRound === true) {
        addRound()
        addScore()
    };
    for (const element of players) {
        element.classList.toggle('open');
    };
    endRound = !endRound;
})

// success button toggle ---------------
for (const btn of success) {
    btn.addEventListener('click', () => {
        btn.classList.toggle('success');
    })
}

// sidebar toggle ---------------
sidebar.addEventListener('click', () => {
    sidebar.classList.toggle('out');
})

// adding loops ---------------
function addRound() {
    for (const round of success) {
        if (round.classList.contains('success')) {
            round.classList.toggle('success');
            const roundCount = round.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
            roundCount.value++
            if (roundCount.value < 10) {
                roundCount.value = '0' + roundCount.value;
            }
        }
    }
}

function addScore() {
    for (const score of scores) {
        const total = score.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
        total.value = Number(total.value) + Number(score.value);
        score.value = "";
    }
}

// Editing Drop Down---------------
for (let edit of editing) {
    edit.addEventListener('click', () => {
        let painter = edit.nextElementSibling.firstElementChild;
        edit.nextElementSibling.classList.toggle('show');
        painter.addEventListener('input', () => {
            let paint = painter.value + "50"
            edit.parentElement.parentElement.style.backgroundColor = paint
        })
    })
}

// This will eventually close the edit toggle when you click away just don't feel like figuring it out right now -------
// document.addEventListener('click', (event) => {
//     const outsideClick = !elem.contains(event.target);
//     for (let edit of editing) {
//         edit.nextElementSibling.classList.remove('show');
//     }
// })

addPerson.addEventListener('click', () => {
    let player = players[0].cloneNode(true);
    let title = player.firstElementChild.nextElementSibling;
    title.value = `Player ${players.length + 1}`;
    document.querySelector('.board').append(player);
    resetVariables();
})

removePerson.addEventListener('click', () => {
    players[players.length - 1].remove();
    resetVariables();
})

darkButton.addEventListener('click', () => {
    darkToggle()
    // yes dark
    if (document.body.classList.contains('dark-bg')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
})

function darkToggle() {
    document.body.classList.toggle('dark-bg');
    darkButton.firstElementChild.classList.toggle('hide');
    darkButton.firstElementChild.nextElementSibling.classList.toggle('hide');
}