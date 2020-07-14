document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const squareArray = Array.from(squares)
    const playerDisplay = document.querySelector('#player-turn')
    let currentPlayer = 'playerX'
    playerDisplay.innerHTML = currentPlayer

    squares.forEach(square =>{
        square.addEventListener('click',clickOutcome)
    })
   
    function clickOutcome(e){
        
        const index = squareArray.indexOf(e.target)
        playerDisplay.innerHTML = currentPlayer

        if(currentPlayer === 'playerX'){
            squares[index].classList.add('cellX')
            currentPlayer = 'playerO'
        } else {
            squares[index].classList.add('cellO')
            currentPlayer = 'playerX'
        }

        checkGO();

    }

    function checkGO(){
        
    }
})
