const squares = document.querySelectorAll('.grid div')
const scoreDisplay = document.querySelector('span')
const start = document.querySelector('.start')

const width = 10
let currentIdx = 0
let appleIdx = 0
let currentSnake = [2,1,0]
let direction=1
let score = 0
let speed = 0.9
let intervalTime = 0
let interval = 0

document.addEventListener('keydown',controls)
start.addEventListener('click',startGame)

function controls (e){
    squares[currentIdx].classList.remove('snake')

    if(e.keyCode === 39) direction = 1
    else if (e.keyCode == 38) direction = -width
    else if(e.keyCode === 37) direction =  -1
    else if (e.keyCode === 40) direction = +width
}

function randApple(){
    do{
        appleIdx = Math.floor(Math.random()*squares.length)
    } while (squares[appleIdx].classList.contains('snake'))
    squares[appleIdx].classList.add('apple')
}


function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIdx].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake= [2,1,0]
    currentIdx = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes,intervalTime)
}

function moveOutcomes(){
    if( (currentSnake[0]+ width >= (width*width) && direction === width)    ||  // hits bottom
        (currentSnake[0] % width === width-1 && direction === 1)            ||  // hits right wall
        (currentSnake[0] % width === 0 && direction === -1)                 ||  // hits left wall
        (currentSnake[0] - width < 0 && direction === -width)               ||  // hits top
        (squares[currentSnake[0]+direction].classList.contains('snake'))){      // hits itself
            return clearInterval(interval)
    }
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0]+direction)

    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randApple()
        scoreDisplay.textContent = ++score
        clearInterval(interval)
        intervalTime*=speed
        interval = setInterval(moveOutcomes,intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}