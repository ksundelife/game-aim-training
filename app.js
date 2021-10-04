const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#e7ebec', '#a99e98', '#d9d5ca', '#98c9cd', '#3a9198', '#358288', '#31616b', '#c7a108', '#282934'];
let startGameInterval = 0;

let time = 0;
let score = 0;
let errors = 0;

startBtn.addEventListener('click', event => {
	event.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	} else if (event.target.classList.contains('restart-btn')) {
		restartGame();
	} else if (event.target.classList.contains('game-over-btn')) {
		window.location.reload();
	} else {
		errors++;
	}
});

function startGame() {
	startGameInterval = setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
		clearInterval(startGameInterval);
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	timeEl.parentNode.classList.add('hide');
	board.innerHTML = `
		<div class="result">
			<h1>Счет: <span class="primary">${score}</span></h1>
			<h1 class="errors"> Промахов: <span> ${errors} </span></h1>
			<button class="button restart-btn time-btn" > Играть снова </button>
			<button class="button game-over-btn time-btn"> Закончить </button>
		</div>
		`;
}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(10, 60);
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add('circle');

	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${x}px`;
	circle.style.left = `${y}px`;

	setColor(circle);
	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
	const color = getRandomColor();
	element.style.background = color;
	element.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`;
}

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function restartGame() {
	screens[1].classList.remove('up');
	time = 0;
	score = 0;
	errors = 0;
	document.querySelector('.result').remove();
	timeEl.parentNode.classList.remove('hide');
}

// function winTheGame() {
	
// 	function kill() {
// 		const circle = document.querySelector('.circle');
// 		if(circle) {
// 			circle.click();
// 		}
// 	}
// 	setInterval(kill, 75);
// }