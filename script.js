
const computerScore = document.getElementById('computer-score');
const playerScore = document.getElementById('player-score');
const resultDiv = document.getElementById('result');
const playerDisplay = document.getElementById('player')
const computerDisplay = document.getElementById('computer')

//LOCAL STORAGE CODE FOR DATA STORING
const storedData = JSON.parse(localStorage.getItem('data')) || { playerScore: 0, computerScore: 0 }

let totalScore = storedData;

function saveDataToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(totalScore))
}

initializeScores();

function initializeScores() {
    playerScore.textContent = totalScore.playerScore;
    computerScore.textContent = totalScore.computerScore;
}

//PLAYER CHOICE CODE (MAIN-SECTION)
function playerChoice(playerSelection) {
    const computerSelection = getComputerChoice();
    playerDisplay.textContent = '';
    computerDisplay.textContent = '';

    const score = updateScore(playerSelection, computerSelection);

    displayResult(playerSelection, computerSelection, score);

    document.querySelector('.hero1').classList.add('hidden');
    document.querySelector('#hero2').style.display = 'flex'; // to toggle between hero1 and hero2 classes

    const playerChoiceImg = document.getElementById('playerChoiceImg');
    const computerChoiceImg = document.getElementById('computerChoiceImg');

    playerChoiceImg.innerHTML = `
    <img src="/assets/img/${playerSelection}.svg" alt="" class="img-big">
    <img src="/assets/img/_${playerSelection}.png" class="img-small" alt="">
`;

    computerChoiceImg.innerHTML = `
    <img src="/assets/img/${computerSelection}.svg" alt="" class="img-big">
    <img src="/assets/img/_${computerSelection}.png" class="img-small" alt="">
`;
    //displaying images for both the contestants

    saveDataToLocalStorage() //for localStorage
}

//COMPUTER CHOICE CODE
function getComputerChoice() {
    const random = Math.floor(Math.random() * 3);
    const choices = ['rock', 'paper', 'scissors'];
    return choices[random];
}

//DISPLAYING THE SCORES 
function displayResult(player, computer, score) {
    let resultMessage;

    const pick1 = document.querySelector('.pick1');
    const pick2 = document.querySelector('.pick2');


    if (score === 0) {
        resultMessage = 'TIE UP';
        pick1.classList.remove('pulse');
        pick2.classList.remove('pulse');//removing the pulse animation when score is 0
    } else if (score === 1) {
        resultMessage = '<span class="main-result-text">YOU WIN</span> <br> <span class="comain-result-text">AGAINST PC</span>';
        pick1.classList.add('pulse');
        pick2.classList.remove('pulse'); //toggle animation for the winning class
        ;
    } else {
        resultMessage = '<span class="main-result-text" style="font-weight: 600; font-size: 3rem; letter-spacing: 2px;">YOU LOST</span> <br>  <span style=" font-size: 1 rem; margin: 20px 0;">AGAINST PC</span>';
        pick2.classList.add('pulse');
        pick1.classList.remove('pulse');
    }

    playerScore.textContent = totalScore.playerScore;
    computerScore.textContent = totalScore.computerScore; //score updating

    resultDiv.innerHTML = `<h1>${resultMessage}</h1>`;
}

//SCORE UPDATE CODE 
function updateScore(player, computer) {
    if (player === computer) {
        return 0; // It's a tie
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        // totalScore.playerScore += 1;
        totalScore['playerScore'] += 1;
        return 1; // Player wins
    } else {
        totalScore['computerScore'] += 1;
        // totalScore.computerScore += 1;
        return -1; // Computer wins
    }
}

//PLAYING AGAIN CODE
function playAgain() {
    // Clear result message
    resultDiv.innerHTML = '';

    // Reset player and computer choices
    playerDisplay.textContent = '';
    computerDisplay.textContent = '';


    const playerChoiceImg = document.getElementById('playerChoiceImg');
    const computerChoiceImg = document.getElementById('computerChoiceImg');

    // Clear images in hero2
    playerChoiceImg.innerHTML = '';
    computerChoiceImg.innerHTML = '';

    document.querySelector('.hero1').classList.remove('hidden');
    document.querySelector('#hero2').style.display = 'none'; // show hero2

    saveDataToLocalStorage()
}

//RULES CONTAINER CODE
function toggleContainer() {
    var container = document.getElementById('myContainer');

    // Toggle the visibility of the container
    container.style.display = (container.style.display === 'none' || container.style.display === '') ? 'block' : 'none';

}

//RULES BUTTON CODE
function rulesToggle() {
    var container = document.getElementById('myContainer');
    var rulesButton = document.getElementById('rulesButton');

    // If the container is visible, hide it; otherwise, show it
    container.style.display = (container.style.display === 'none') ? 'block' : 'block';
    // container.style.display = (container.style.display === 'none' || container.style.display === '') ? 'block' : 'none';

    // Update the "RULES" button visibility based on the container
    rulesButton.style.display = (container.style.display === 'block') ? 'block' : 'none';
    // rulesButton.classList.toggle('hidden');

}

