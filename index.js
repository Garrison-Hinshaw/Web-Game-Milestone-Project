const beginButton = document.getElementById('beginButton')







//Added Event Listener for button and made it to where on click instruction start screen dissappears
beginButton.addEventListener("click", (event) => {
    playGame()
})

function playGame(){
    beginButton.style.display = 'none'
    howToPlay.style.display = 'none'
}