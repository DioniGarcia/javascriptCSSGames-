const tablero = document.getElementById("tablero")
const parrafos = Array.from(document.getElementsByTagName('p'))
const puntuacion = document.querySelector(".puntuacion")
const disparos = document.querySelector(".disparos")
const sideSize = 10
const boatSizes = [2,3,4]
var boats = []
var nDisparos = 40
var nPuntuacion = 0

function randCellStart(){
    return Math.floor(Math.random()*(sideSize*sideSize - 0) + 0)
}

function randMinMax(min,max){
    return Math.floor(Math.random()*(max - min + max))+min
}

function buildBoatPositions(orient, direcc, boatSize){
    
    var done = false
    var boatPositions = []
    while (!done){
        boatPositions = []
        var inicio = randCellStart()
        var positions = boatSize
        for (var i = inicio; positions > 0; positions-- ){
            if( document.getElementById(""+i).classList.contains("barco")){
                break;
            }
            boatPositions.push(i)

            var oldI = i

            if(orient === 0 && direcc === 0){         //H L
                if(i % 10 === 0){
                    break
                } 
                i--
            }else if (orient === 0 && direcc === 1){  //H R
                i++
                if(i % 10 === 0){
                    break
                } 
            } else if (orient === 1 && direcc === 0){ //V U
                i-=sideSize;
            } else {                                  //V D
                i+=sideSize;
            }

            if (i < 0 || i > sideSize*sideSize -1 ){
               break;
            }
        } 
        
        if(boatPositions.length === boatSize){ 
            done = true;
        }
    }

    return boatPositions
}

function insertBoatGrid(boatPositions){
    for(var i =0; i< boatPositions.length; i++){
        document.getElementById(""+boatPositions[i]).classList.remove("primera")
        document.getElementById(""+boatPositions[i]).classList.add("barco")
    }
}



function randomizeBoats(){
    boats = []
    for(var i =0; i< boatSizes.length;i++){
        var orientation = randMinMax(0,1) // 0 horizontal | 1 vertical
        var direction = randMinMax(0,1) // 0 Up/Left | 1 Down/Right
        boatPositions = buildBoatPositions(orientation,direction,boatSizes[i])
        boats.push(boatPositions)
        insertBoatGrid(boatPositions)
    }
    
}

function checkTocado(casilla){
    return document.getElementById(""+casilla).classList.contains("tocado")
}

function markHundido(posicionesBarco){
    for(var i = 0; i< posicionesBarco; i++){
        document.getElementById(""+posicionesBarco[i]).remove("tocado")
        document.getElementById(""+posicionesBarco[i]).add("hundido")
    }

}

function verifyHundido(id){
    console.log("ENTRA_VERIFYHUNDIDO")
    idNumeric = parseInt(id)
        console.log(idNumeric)
        console.log(typeof(idNumeric))
    for(var i = 0; i< boats.length; i++){
        
        console.log("BARCO: "+boats[i])
        console.log("T/O: "+typeof(boats[i][0]))
        if(idNumeric in boats[i]){
            console.log("ESTA")
            var hundido = boats[i].every(checkTocado)
            if (hundido){
                console.log("ENTRA_HUNDIDO")
                markHundido(boats[i])
            }
        }
    }
   
}


function changeState(){
    
    var casillaId = this.getAttribute("id")
   
    var casilla = document.getElementById(""+casillaId)

    if(casilla.classList.contains("nueva") && casilla.classList.contains("barco")){
        casilla.classList.remove("nueva")
        casilla.classList.add("tocado")
        verifyHundido(casillaId)
    }
    

}


function crearTabla(){
    nPuntuacion = 0
    nDisparos = 0
    
    puntuacion.innerHTML = nPuntuacion
    disparos.innerHTML = nDisparos
    
    tablero.innerHTML = ""
    for(var i = 0; i< sideSize*sideSize; i++){
        elem = document.createElement('div')
        elem.addEventListener('click',changeState)
        elem.setAttribute("id",""+i)
        elem.innerHTML = i;
        elem.classList.add("casilla", "nueva")
        tablero.appendChild(elem)
    }
    randomizeBoats()
}