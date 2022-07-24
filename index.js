const beginButton = document.getElementById('beginButton')
const scoreKeeper = document.querySelector('#score-keeper span')
let wizard = document.getElementById('wizard')



//Added Event Listener for button and made it to where on click instruction start screen dissappears
beginButton.addEventListener("click", (event) => {
    playGame()
})

function playGame(){
    beginButton.style.display = 'none'
    howToPlay.style.display = 'none'
}
