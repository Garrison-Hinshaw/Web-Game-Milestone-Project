const beginButton = document.getElementById('beginButton')







//Added Event Listener for button and made it to where on click instruction start screen dissappears
beginButton.addEventListener("click", (event) => {
    playGame()
})

function playGame(){
    beginButton.style.display = 'none'
    howToPlay.style.display = 'none'
}

function moveCharacter(){
if(direction === 'west'){
    x-=1
}
if(direction === 'east'){
    x+=1
}
{
    Element.style.left = x + 'px'
    Element.style.bottom = y + 'px'
}
setInterval(moveCharacter, 1)
document.addEventListener('keypress', function(e)=>{
    
})
}