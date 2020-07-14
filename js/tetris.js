const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay = document.querySelector("#score")
const startBtn = document.querySelector('#start')
const newBtn = document.querySelector('#new')
const width = 10
let nextRandom = 0
let timerId
let score = 0
const colors = ['orange','red','purple','green','blue']
const millisec = 500


const lTetromino = [
    [1, width+1, width*2+1,2],
    [width, width+1, width+2,width*2+2],
    [1,width+1,width*2+1, width*2],
    [width, width*2, width*2+1,width*2+2]

]

const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1,width+2, width*2,width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
]

const tTetromino = [
    [1,width, width+1, width+2],
    [1,width+1,width+2,width*2+1],
    [width, width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
]

const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
]

const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
]

const tetrominoes = [lTetromino, zTetromino,tTetromino,oTetromino,iTetromino ]


let currentPosition = 4
let currentRotation = 0

let random = Math.floor(Math.random()*tetrominoes.length)
let current = tetrominoes[random][currentRotation]

function draw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
    });
}

function unDraw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ""
    });
}


function control(e){
    if(e.keyCode === 37) moveLeft()
    else if( e.keyCode === 38) rotate()
    else if(e.keyCode === 39) moveRight()
    else if(e.keyCode === 40) moveDown()
}

document.addEventListener('keydown',control)

function moveDown(){
    unDraw()
    currentPosition += width
    draw()
    freeze()
}

function freeze(){
    if(current.some(index => squares[currentPosition+index+width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition+index].classList.add('taken'))

        random = nextRandom
        nextRandom = Math.floor(Math.random()*tetrominoes.length)
        current = tetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
    }
}

function moveLeft(){
    unDraw()
    const isAtLeftEdge = current.some(index=>(currentPosition+index)%width === 0)

    if(!isAtLeftEdge) currentPosition-=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition +=1
    }
    draw()
}

function moveRight(){
    unDraw()
    const isAtRightEdge = current.some(index=>(currentPosition+index)%width === width-1)

    if(!isAtRightEdge) currentPosition+=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -=1
    }

    draw()
}

function rotate(){
    unDraw()
    currentRotation++
    if(currentRotation === current.length){
        currentRotation = 0
    }

    current = tetrominoes[random][currentRotation]
    draw()
}

const displaySquares = document.querySelectorAll('.mini div')
const displayWidth = 4
const displayIndex = 0


const upNextTetrominoes = [
    [1,displayWidth+1, displayWidth*2+1,2],
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [1,displayWidth,displayWidth+1,displayWidth+1],
    [0,1, displayWidth, displayWidth+1],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
]

function displayShape(){
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ""
    })
    upNextTetrominoes[nextRandom].forEach(index =>{
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
}

startBtn.addEventListener('click',() =>{
    if(timerId){
        clearInterval(timerId)
        timerId = null
    } else{
        draw()
        timerId = setInterval(moveDown,millisec)
        nextRandom = Math.floor(Math.random()*tetrominoes.length)
        displayShape()
    }
})

newBtn.addEventListener('click', () =>{
    for(var i =0; i<squares-10;i++){
        squares[i].classList.remove('tetromino')
        squares[i].style.backgroundColor = "rgba(224, 255, 255, 0.5)"
    }

    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ""
    })

    scoreDisplay.innerHTML="0"
    scoreDisplay.style.color= "black"

    grid.style.borderTop=""
    newBtn.style.display="none"
    startBtn.style.display="inline"
})


function addScore(){
    for(let i = 0; i< 199; i+=width){
        const row = [i,i+1, i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

        if (row.every(index => squares[index].classList.contains('taken'))){
            score+=10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor=""
            })
            const squaresRemoved = squares.splice(i,width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

function gameOver(){
    if(current.some(index=> squares[currentPosition+index].classList.contains('taken'))){
        startBtn.style.display="none"
        newBtn.style.display="inline"
        
        clearInterval(timerId)
        document.removeEventListener('keydown',control)
        for(var i=0; i<10;i++){
            if(!squares[i].style.backgroundColor){
                squares[i].style.backgroundColor="rgba(255,0,0,0.2)"
            }
        }
        document.getElementsByClassName('ri')[0].style.animation="ovaR 5s 1"
        document.getElementsByClassName('le')[0].style.animation="ovaL 5s 1"
        document.getElementsById('new').style.animation="blink 5s 5"
    }
}