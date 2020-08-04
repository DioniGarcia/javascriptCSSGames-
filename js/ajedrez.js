const grid = document.querySelector(".grid")
const numerosL = document.querySelector(".numeros.left")
const letrasU = document.querySelector(".letras.up")
const p1 = document.querySelector(".p1")
const p2 = document.querySelector(".p2")
const message = document.querySelector(".mensaje")
const btnNewGame = document.querySelector(".nuevoJuego")
const gameOverModal = document.querySelector(".gameOver")
const pantalla = document.querySelector(".pantalla")
var lastCellKilled = ""
var whiteKingPosition = "1E"
var blackKingPosition = "8E"
var animating = false


btnNewGame.addEventListener("click", ()=>{
    createBoard()
    gameOverModal.style.visibility = "hidden"
    pantalla.style.visibility = "hidden"
    btnNewGame.style.visibility = "hidden"
})


var whitePieces = 16
var blackPieces = 16
var bColor = "black"
var color = "white"
var turn = "W"
var idChosenCell = ""
var idNextCell = ""

const goodMessages = [
    "Muy Bien!",
    "Sigue así!",
    "Bravo!",
    "Bien hecho!",
    "Correcto!",
    "Así se hace!",
    "Voilá!",
    "Eso es!",
    "Vamos, tu puedes!"
]


const blackChess = new Map([
    ["peon","&#9823"],
    ["caballo","&#9822"],
    ["alfil", "&#9821"],
    ["torre", "&#9820"],
    ["reina", "&#9819"],
    ["rey", "&#9818"]
]);

var blackChessSymbols = []


const whiteChess = new Map([
    ["peon","&#9817"],
    ["caballo","&#9816"],
    ["alfil", "&#9815"],
    ["torre", "&#9814"],
    ["reina", "&#9813"],
    ["rey", "&#9812"]
]);

var whiteChessSymbols = []

const cLetters = "ABCDEFGH"

function fillSymbols(){
    for(let key of blackChess.keys()){
        blackChessSymbols.push(unicodeToSymbol(blackChess.get(key)))
    }

    for(let key of whiteChess.keys()){
        whiteChessSymbols.push(unicodeToSymbol(whiteChess.get(key)))
    }
}

fillSymbols()

function startAnimations(){
    document.querySelector(".whiteP").classList.add("bouncing")
    document.querySelector(".blackP").classList.add("bouncing")
    /*document.querySelector(".pyro > .before").classList.add("fireworks")
    document.querySelector(".pyro > .after").classList.add("fireworks","fireworks2")*/
}

function stopAnimations(){
    document.querySelector(".whiteP").classList.remove("bouncing", "bouncingFinal")
    document.querySelector(".blackP").classList.remove("bouncing","bouncingFinal")
    document.querySelector(".pyro > .before").classList.remove("fireworks")
    document.querySelector(".pyro > .after").classList.remove("fireworks","fireworks2","fireworksFinal")
}

function animateFinal(){
    document.querySelector(".whiteP").classList.add("bouncingFinal")
    document.querySelector(".blackP").classList.add("bouncingFinal")
    document.querySelector(".pyro > .before").classList.add("fireworks")
    document.querySelector(".pyro > .after").classList.add("fireworks","fireworks2")
    document.querySelector(".pyro > .after").classList.add("fireworksFinal")
}


function swithColor(){
    if(bColor === "white"){
        bColor = "black"
        color = "white"
    } else {
        bColor = "white"
        color= "black"
    } 
}

function paintCell(bColor){
    return bColor==="white" ? "whited" : "blacked"
}

function getCorrespondingChess(id){

    if (id[0] === "7") return blackChess.get("peon");

    else if (id[0] === "8"){
        if (id[1] === "A" || id[1] === "H") return blackChess.get("torre");
        else if (id[1] === "B" || id[1] === "G") return blackChess.get("caballo");
        else if (id[1] === "C" || id[1] === "F") return blackChess.get("alfil");
        else if (id[1] === "D") return blackChess.get("reina");
        else if (id[1] === "E") return blackChess.get("rey");

    } else if (id[0] === "2") return whiteChess.get("peon");

    else if (id[0] === "1") {
        if (id[1] === "A" || id[1] === "H") return whiteChess.get("torre");
        else if (id[1] === "B" || id[1] === "G") return whiteChess.get("caballo");
        else if (id[1] === "C" || id[1] === "F") return whiteChess.get("alfil");
        else if (id[1] === "D") return whiteChess.get("reina");
        else if (id[1] === "E") return whiteChess.get("rey");
    } else return ""
}

function included(arr, elem){
    for(var i=0; i< arr.length; i++){
        if(arr[i] === elem) return true;
    }
    return false;
}

function isCurrentPlayerChess(piece){

   if( turn === "W"){
       return included(whiteChessSymbols,piece)
   }
   return included(blackChessSymbols,piece)
}

function swapPieces(idS,idD){
    var elSource = document.getElementById(idS)
    
    var symbolS = elSource.innerHTML

    var elDestiny = document.getElementById(idD)
    var symbolD = elDestiny.innerHTML

    elSource.innerHTML = symbolD
    elDestiny.innerHTML = symbolS
}

function KillPiece(idS,idD){
    
 
    const elSource = document.getElementById(idS)
    var symbolS = elSource.innerHTML

    const elDestiny = document.getElementById(idD)
    elDestiny.classList.add("killedCell")
    var symbolD = elDestiny.innerHTML

    lastCellKilled = idD


    elSource.innerHTML = ""
    elDestiny.innerHTML = symbolS

    el = document.createElement("div")
    el.innerHTML = symbolD

    turn === "W" ? p1.appendChild(el) : p2.appendChild(el)
    
    mensajeOK()
    startAnimations()
}

/*

    MÉTODOS AUXILIARES A MOVER UN PEON

                                         */


function isBlocked(idSource, idNextStep){
    var idDestiny;
    if(turn === "W"){
        idDestiny = ( parseInt(idSource[0])+1 ) + idSource[1]
        return document.getElementById(idDestiny).innerHTML !== ""
    }
    idDestiny = ( parseInt(idSource[0])-1 ) + idSource[1]
    return document.getElementById(idDestiny).innerHTML !== ""
}

function validDiagonalPeonAttack(idSource, idDestiny){
    
    const idxcurrletter = cLetters.indexOf(idSource[1])
    const idxDestletter = cLetters.indexOf(idDestiny[1])

    var occDestiny = document.getElementById(idDestiny).innerHTML !== ""
   
    if ( Math.abs(idxcurrletter-idxDestletter) === 1  && occDestiny ){
        return true;
    }
    return false;
}

function changeMarker(){
    if (turn === "W"){
        document.querySelector(".player.one").classList.add("turn")
        document.querySelector(".player.two").classList.remove("turn")
    } else {
        document.querySelector(".player.one").classList.remove("turn")
        document.querySelector(".player.two").classList.add("turn")
    }
}

function eqCol(idS,idD){
    return idS[1] === idD[1];
}

function eqRow(idS,idD){
    return idS[0] === idD[0];
}

function calcAvance(idS,idD){
    if(turn === "W"){
        return parseInt(idD[0]) - parseInt(idS[0])
    }
    return parseInt(idS[0]) - parseInt(idD[0])
}

function checkReachedFinal(idD){
    if(turn === "W"){
        return idD[0] === "8";
    }
    return idD[0] === "1";
}

function upgrade2Queen(idD){
    el = document.getElementById(idD)
    if (turn == "W"){
        el.innerHTML = whiteChess.get("reina")
    } else {
        el.innerHTML = blackChess.get("reina")
    }
}

function mensajeMovInvalido(){
    message.innerHTML="Movimiento inválido"
    message.classList.add("show","red")
}

function mensajeJaque(){
    var rey = turn === "W" ? "blanco" : "negro"

    message.innerHTML="Jaque al rey "+rey
    message.classList.add("show","orange")
}

function borrarMensaje(){
    message.innerHTML = ""
    message.classList.remove("red","green", "show")
}

function mensajeOK(){

    var min = 0
    var max = goodMessages.length-1
    var rdPos = Math.floor(Math.random()*(max-min+1))+min;
    message.innerHTML=goodMessages[rdPos]
    message.classList.add("green","show")
}


function movePeon(idS, idD){
    function newPositionChecks(){
        if (checkReachedFinal(idD)) upgrade2Queen(idD)
        
        if (el.classList.contains("primerMovimiento")){
            el.classList.remove("primerMovimiento")
        }
    }

    var el = document.getElementById(idS)
    var primerMov = el.classList.contains("primerMovimiento")
   
    var avance = calcAvance(idS,idD)
    
    // AVANCE 1 o 2 posiciones hacia delante
    if(  ( avance === 2 && primerMov  || avance === 1 ) && 
           eqCol(idS,idD) ){
        if ( turn === "W" && !isBlocked(idS, ""+(parseInt(idS[0])+1)+""+idS[1]) ||
             turn !== "W" && !isBlocked(idS, ""+(parseInt(idS[0])-1)+""+idS[1])){
            swapPieces(idS,idD)
            newPositionChecks()
            return true
        }

    //Matar en diagonal
    } else if (avance === 1 && validDiagonalPeonAttack(idS,idD)){
        KillPiece(idS,idD)
        newPositionChecks()
        return true
    }
}


// Controlar si hay una pieza entremedias up/down/left/right
function blockedBeforeTarget(idS,idD){

    if ( eqCol(idS,idD) ){
        var start = parseInt(idS[0])
        var end = parseInt(idD[0])

        //Controlling both cases.. going up or going down
        if ( start > end){
            var aux = end
            end = start 
            start = aux
        }
        for (var i = start+1; i< end; i++){
            el = document.getElementById(""+i+idS[1])
            if(el.innerHTML !== ""){
                return true;
            }
        }
        
    } else {
        var start = cLetters.indexOf(idS[1])
        var end = cLetters.indexOf(idD[1])

        //Controlling both cases.. going left or going right
        if ( start > end){
            var aux = end
            end = start 
            start = aux
        }

        for (var i = start+1; i< end; i++){
            el = document.getElementById(idS[0]+cLetters[i])
            if(el.innerHTML !== ""){
                return true;
            }
        }

    }
    
    return false;
}

function moveTorre(idS,idD){   /* TODO: SE COME LAS PIEZAS DEL JUGADOR ACTUAL */

    if (!blockedBeforeTarget(idS,idD) && ( eqCol(idS,idD) || eqRow(idS,idD) )){

        if(document.getElementById(idD).innerHTML === ""){
            swapPieces(idS,idD)
        }else{
            KillPiece(idS,idD)
        }
                   
        return true
    }
    return false
}


function eqDiagonal(idS,idD){
    return Math.abs(parseInt(idS[0]) - parseInt(idD[0])) === 
    Math.abs(cLetters.indexOf(idS[1]) - cLetters.indexOf(idD[1]))
}

function diagonalNotBloqued(idS,idD){

    var startNUmber = parseInt(idS[0])
    var endNumber = parseInt(idD[0])
    var idxLetterStart = cLetters.indexOf(idS[1])
    var idxLetterEnd = cLetters.indexOf(idD[1])

    var ascendNumber = true
    var ascendLetter = true

    // determinar si van en incemento/decremento el número/letra
    if (startNUmber > endNumber) ascendNumber = false
    if( idxLetterStart > idxLetterEnd) ascendLetter = false

    var nIterations = Math.abs(startNUmber-endNumber) -1

    while (nIterations > 0){
        
        ascendNumber ? ++startNUmber : --startNUmber;
        ascendLetter ? ++idxLetterStart : --idxLetterStart;

        if (document.getElementById(""+startNUmber+cLetters[idxLetterStart]).innerHTML !== ""){
            return false;
        }
        nIterations--
    }
    ascendNumber ? ++startNUmber : --startNUmber;
    ascendLetter ? ++idxLetterStart : --idxLetterStart;
    return ((startNUmber)+cLetters[idxLetterStart]) === idD
}


function moveAlfil(idS, idD){

    if (eqDiagonal(idS,idD) && diagonalNotBloqued(idS,idD)){
        if(document.getElementById(idD).innerHTML === ""){
            swapPieces(idS,idD)
        }else{
            KillPiece(idS,idD)
        }            
        return true
    } 
    return false
}

function moveCaballo(idS, idD){
   
    var startNUmber = parseInt(idS[0])
    var endNumber = parseInt(idD[0])
    var idxLetterStart = cLetters.indexOf(idS[1])
    var idxLetterEnd = cLetters.indexOf(idD[1])

    if( 
        
        (Math.abs(startNUmber-endNumber) === 2 && Math.abs(idxLetterStart-idxLetterEnd)===1) ||
        (Math.abs(startNUmber-endNumber) === 1 && Math.abs(idxLetterStart-idxLetterEnd)===2) 
        
        ){
            if(document.getElementById(idD).innerHTML === ""){
                swapPieces(idS,idD)
            }else{
                KillPiece(idS,idD)
            }       
            return true
    } 
    return false
}

function moveRey(idS,idD){
 
    var startNUmber = parseInt(idS[0])
    var endNumber = parseInt(idD[0])
    var idxLetterStart = cLetters.indexOf(idS[1])
    var idxLetterEnd = cLetters.indexOf(idD[1])

    if( 
        (Math.abs(startNUmber-endNumber) === 1 && idxLetterStart === idxLetterEnd) ||
        (Math.abs(idxLetterStart-idxLetterEnd)===1 && startNUmber === endNumber) ||
        (Math.abs(idxLetterStart-idxLetterEnd)===1 && Math.abs(startNUmber-endNumber)===1)
        ){
            if(document.getElementById(idD).innerHTML === ""){
                swapPieces(idS,idD)
            }else{
                KillPiece(idS,idD)
            }
                     
            return true
    }
    return false
}

function moveReina(idS, idD){
    if(
        (eqDiagonal(idS,idD) && diagonalNotBloqued(idS,idD)) ||
        (!blockedBeforeTarget(idS,idD) && ( eqCol(idS,idD) || eqRow(idS,idD) ))
    ){
        if(document.getElementById(idD).innerHTML === ""){
            swapPieces(idS,idD)
        }else{
            KillPiece(idS,idD)
        }
        console.log("IDS: "+idS+" IDD: "+idD)              
        return true
    }

    return false

}

function selectAlgorithm(idS, nS, idD, nD){
    if(nS === "peon" ){
        return movePeon(idS, idD, nD);
    }else if(nS === "torre"){
        return moveTorre(idS, idD, nD);
    }else if(nS === "alfil"){
        return moveAlfil(idS, idD, nD);
    }else if(nS === "caballo"){
        return moveCaballo(idS, idD, nD);
    }else if(nS === "reina"){
        return moveReina(idS, idD, nD);
    }else if(nS === "rey"){
        return moveRey(idS, idD, nD);
    }
}

function getChessName(unicPiece){
    if(unicPiece === unicodeToSymbol("&#9823") || 
       unicPiece === unicodeToSymbol("&#9817")){
           return "peon"
    }else if (unicPiece === unicodeToSymbol("&#9822") || 
              unicPiece === unicodeToSymbol("&#9816")){
        return "caballo"
    }else if (unicPiece === unicodeToSymbol("&#9821") || 
              unicPiece === unicodeToSymbol("&#9815")){
        return "alfil"
    }else if (unicPiece === unicodeToSymbol("&#9820") || 
              unicPiece === unicodeToSymbol("&#9814")){
        return "torre"
    }else if (unicPiece === unicodeToSymbol("&#9819") || 
              unicPiece === unicodeToSymbol("&#9813")){
        return "reina"
    }else if (unicPiece === unicodeToSymbol("&#9818") || 
              unicPiece === unicodeToSymbol("&#9812")){
        return "rey"
    }else{
        return "white"
    }
}

function isGameOver(destinyName){
    return destinyName === "rey"
}

function closeGame(){
    
    var winner = turn === "W"? "piezas blancas" : "piezas negras"
    gameOverModal.innerHTML = "FIN DE LA PARTIDA <br><br> Ganador: "+winner+"<br>"+"Enhorabuena !!!"
    pantalla.style.visibility = "visible"
    gameOverModal.style.visibility = "visible"
    btnNewGame.style.visibility="visible"
    animateFinal()

}

function try2computeMovement(idSource, idDestiny){
  
    sourceName = getChessName(document.getElementById(idSource).innerHTML)
    destinyName = getChessName(document.getElementById(idDestiny).innerHTML)

    moveDone = selectAlgorithm(idSource,sourceName, idDestiny, destinyName )

    if(moveDone){ 
        if (isGameOver(destinyName)){
            closeGame()
        }

        if (sourceName === "rey"){
            if(turn === "W"){
                whiteKingPosition = idSource

            } else {
                blackKingPosition = idSource
            }
        }

        var jaque = turn === "W" ? entraEnJaqueElRey(blackKingPosition) : entraEnJaqueElRey(whiteKingPosition)

        if(jaque !== ""){
            mensajeJaque()
        }
        
        changeTurn()
        changeMarker()
                            
    } else {
        mensajeMovInvalido()
    }

    document.getElementById(idChosenCell).style.border = "";
    
    idChosenCell=""
    idNextCell=""
}

function entraEnJaqueElRey(idRey){
    
    return ""

}


function clickCell(){
    //Primer click a casilla contraria o casilla vacía
    if( idChosenCell === "" && !isCurrentPlayerChess(this.innerHTML) ){

    }else if ( idChosenCell === "" && isCurrentPlayerChess(this.innerHTML) ){
        if (lastCellKilled !== ""){
            document.getElementById(lastCellKilled).classList.remove("killedCell")
        }
        stopAnimations()
        borrarMensaje()
        this.style.border = "3px solid blue";
        idChosenCell = this.getAttribute("id")
    
    //Cambio de casilla atacante
    }else if (idChosenCell !== "" && isCurrentPlayerChess(this.innerHTML)){
        document.getElementById(idChosenCell).style.border = "1px solid black"
        idChosenCell = this.getAttribute("id")
        document.getElementById(idChosenCell).style.border = "3px solid blue";

    //Desactivar una casilla atacante
    } else if (idChosenCell === this.getAttribute("id")){ 
        document.getElementById(idChosenCell).style.border = "";
        idChosenCell = ""
        idNextCell = ""
    
    //Caso general: computar el movimiento
    } else {
        idNextCell = this.getAttribute("id")
        try2computeMovement(idChosenCell,idNextCell)
    }

}

function isPeon(piece){
    if(piece === unicodeToSymbol(whiteChess.get("peon")) || 
       piece === unicodeToSymbol(blackChess.get("peon"))){
            return true;
       }
    return false;
}

function resetKilledPieces(){
    while(p1.childNodes.length > 0){
        p1.childNodes[0].remove()
    }

    while(p2.childNodes.length > 0){
        p2.childNodes[0].remove()
    }
}

function createBoard(){
    stopAnimations()
    resetKilledPieces()
    gameOverModal.innerHTML = ""
    grid.innerHTML = ""
    whiteKingPosition = "1E"
    blackKingPosition = "8E"


    for (var row = 8; row>0 ; row--){
        swithColor()
        for (var col=0; col< 8; col++){
            newCell = document.createElement("div")
            newCell.classList.add("cell")
            newCell.setAttribute("id",row+cLetters[col])
            newCell.classList.add(paintCell(bColor))
            newCell.innerHTML = getCorrespondingChess(newCell.getAttribute("id"))
            if (isPeon(newCell.innerHTML)){
                newCell.classList.add("primerMovimiento")
            }
            swithColor()
            newCell.addEventListener('click',clickCell);
    
            grid.appendChild(newCell)
        }
    }
    if (letrasU.childNodes.length < 8){
        //LETTERS & NUMS creation
        for(var i = 0, j= 8; i< 8; i++, j--){
            var num = document.createElement("div")
            num.innerHTML = j 
            num.classList.add("numero")
            num.style.color = "golden"

            var copyNum = num
            numerosL.appendChild(num)

            var letra = document.createElement("div")
            letra.innerHTML = cLetters[i]
            letra.classList.add("letra")
            letra.style.color = "golden"
            var copyLetra = letra
            letrasU.appendChild(copyLetra)
        }
}
    
}

function unicodeToSymbol(unicode){
    
    el = document.createElement("div")
    el.innerHTML = unicode
    return el.innerHTML
}


function changeTurn(){
    turn = turn === "W"? "B":"W" 
}

createBoard()


