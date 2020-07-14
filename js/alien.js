const squares = document.querySelectorAll('.grid div')
const resultDisplay = document.querySelector('#result')
let width = 15
let currentShooterIdx = 202
let currentInvaderIdx = 0
let alienInvadersTakenDown = []
let result = 0
let direction = 1
let currentId

const alienInvaders = [  //This is not a range!
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

alienInvaders.forEach(invader=> squares[currentInvaderIdx+invader].classList.add('invader'))

squares[currentShooterIdx].classList.add('shooter')

function moveShooter(e){
    squares[currentShooterIdx].classList.remove('shooter')
    switch(e.keyCode){
        case 37: 
            if(currentShooterIdx % width !== 0) currentShooterIdx-=1
            break;
        case 39:
            if(currentShooterIdx % width < width-1) currentShooterIdx+=1
            break;
    }
    squares[currentShooterIdx].classList.add('shooter')
}

document.addEventListener('keydown',moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length-1] % width === width-1

    if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
        direction = width
    }else if (direction === width){
        if(leftEdge) direction = 1
        else direction =-1
    }
    for(let i = 0; i<=alienInvaders.length-1;i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
    for(let i = 0; i<=alienInvaders.length-1;i++){
        alienInvaders[i]+=direction
    }
    for(let i = 0; i<=alienInvaders.length-1;i++){
        if(!alienInvadersTakenDown.includes(i)){
            squares[alienInvaders[i]].classList.add('invader')
        }
        
    }

    if(squares[currentShooterIdx].classList.contains('invader','shooter')){
        resultDisplay.textContent = 'Game Over'
        squares[currentShooterIdx].classList.add('boom')
        clearInterval(invaderId)
    }

    for(let i =0; i<=alienInvaders.length-1; i++){
        if(alienInvaders[i] > (squares.length-(width-1))){
            resultDisplay.textContent = 'Game Over'
            clearInterval(invaderId)
        }
    }
    if(alienInvadersTakenDown.length === alienInvaders.length){
        resultDisplay.textContent = 'You win'
        clearInterval(invaderId)
    }
}

invaderId = setInterval(moveInvaders, 500)


function shoot(e){
    let laserId
    let currentlaserIdx = currentShooterIdx

    function moveLaser(){
        squares[currentlaserIdx].classList.remove('laser')
        currentlaserIdx-=width
        squares[currentlaserIdx].classList.add('laser')
        if(squares[currentlaserIdx].classList.contains('invader')){
            squares[currentlaserIdx].classList.remove('laser')
            squares[currentlaserIdx].classList.remove('invader')
            squares[currentlaserIdx].classList.add('boom')

            setTimeout(()=> squares[currentlaserIdx].classList.remove('boom'), 250)
            clearInterval(laserId)

            const alienTakenDown = alienInvaders.indexOf(currentlaserIdx)
            alienInvadersTakenDown.push(alienTakenDown)
            resultDisplay.textContent=++result
        }

        if(currentlaserIdx < width){
            clearInterval(laserId)
            setTimeout(()=> squares[currentlaserIdx].classList.remove('laser'),100)
        }
    }
   switch(e.keyCode){
       case 32:
           laserId = setInterval(moveLaser,100)
           break
   }
}

document.addEventListener('keydown',shoot)