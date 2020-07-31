const grid = document.querySelector(".grid")
const numerosL = document.querySelector(".numeros.left")
const letrasU = document.querySelector(".letras.up")
const pOneWon = document.querySelector(".playerOneWon")
const pTwoWon = document.querySelector(".playerTwoWon")
const message = document.querySelector(".mensaje")
/*const title = document.querySelector("h1")
title.addEventListener('click', () => {
    el1 = document.querySelector(".pyro > .before")
    el2 = document.querySelector(".pyro > .after")


    if(el2.style.animationPlayState === "running"){
        el1.style.animationPlayState = "pause"
        el2.style.animationPlayState = "pause"
    }else{
        el1.style.animationPlayState = "running"
        el2.style.animationPlayState = "running"
    }
    

})*/

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
    console.log("ENTRA IS CURR..piece: "+piece)
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
    console.log("ENTERS KILL")
    const elSource = document.getElementById(idS)
    var symbolS = elSource.innerHTML

    const elDestiny = document.getElementById(idD)
    var symbolD = elDestiny.innerHTML

    elSource.innerHTML = ""
    elDestiny.innerHTML = symbolS

    el = document.createElement("div")
    el.innerHTML = symbolD
    if(turn === "W"){
       
        pOneWon.appendChild(el)
        blackPieces--
    } else {
        
        pTwoWon.appendChild(el)
        whitePieces--
    }
    mensajeOK()
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

function borrarMensaje(){
    message.innerHTML = ""
    message.classList.remove("red","green", "show")
}

function mensajeOK(){
    console.log("IMPRIME MENSAJE OK")
    var min = 0
    var max = goodMessages.length-1
    var rdPos = Math.floor(Math.random()*(max-min+1))+min;
    message.innerHTML=goodMessages[rdPos]
    message.classList.add("green","show")
}


function movePeon(idS, idD){
    var el = document.getElementById(idS)
    var primerMov = el.classList.contains("primerMovimiento")
    var moveDone = false

    var avance = calcAvance(idS,idD)
    
    // AVANCE 1 o 2 posiciones hacia delante
    if(  ( avance === 2 && primerMov  || avance === 1 ) && 
           eqCol(idS,idD) ){
        if ( turn === "W" && !isBlocked(idS, ""+(parseInt(idS[0])+1)+""+idS[1]) ||
             turn !== "W" && !isBlocked(idS, ""+(parseInt(idS[0])-1)+""+idS[1])){
            swapPieces(idS,idD)
            moveDone = true
        }

    //Matar en diagonal
    } else if (avance === 1 && validDiagonalPeonAttack(idS,idD)){
        KillPiece(idS,idD)
        moveDone = true
    }

    if(moveDone){
        if (checkReachedFinal(idD)) upgrade2Queen(idD)
        
        if (el.classList.contains("primerMovimiento")){
            el.classList.remove("primerMovimiento")
        }
        
        changeTurn()
        changeMarker() 
         
    } else {
        mensajeMovInvalido()
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
    console.log("MUEVE TORRE")
    var moveDone = false

    if (!blockedBeforeTarget(idS,idD) && ( eqCol(idS,idD) || eqRow(idS,idD) )){

        if(document.getElementById(idD).innerHTML === ""){
            swapPieces(idS,idD)
        }else{
            KillPiece(idS,idD)
        }
        console.log("IDS: "+idS+" IDD: "+idD)              
        moveDone = true
    }
    
    if(moveDone){ 
        changeTurn()
        changeMarker()
                           
    } else {
        mensajeMovInvalido()
    }
}


function eqDiagonal(idS,idD){
    return Math.abs(parseInt(idS[0]) - parseInt(idD[0])) === 
    Math.abs(cLetters.indexOf(idS[1]) - cLetters.indexOf(idD[1]))
}

function diagonalNotBloqued(idS,idD){
    console.log("Ver si diagonal bloqueada...")
    var startNUmber = parseInt(idS[0])
    var endNumber = parseInt(idD[0])
    var idxLetterStart = cLetters.indexOf(idS[1])
    var idxLetterEnd = cLetters.indexOf(idD[1])

    console.log("LETRA S: "+idxLetterStart+", LETRA D: "+idxLetterEnd)


    var ascendNumber = true
    var ascendLetter = true

    // determinar si van en incemento/decremento el número/letra
    if (startNUmber > endNumber) ascendNumber = false
    if( idxLetterStart > idxLetterEnd) ascendLetter = false

    console.log("Numero en ascenso: "+ascendNumber+", letra en descenso: "+ascendLetter)

    var nIterations = Math.abs(startNUmber-endNumber) -1
    console.log("nIterations: "+nIterations)

    while (nIterations > 0){
        console.log("preInc_SN: "+startNUmber+", SL: "+idxLetterStart)
        ascendNumber ? ++startNUmber : --startNUmber;
        ascendLetter ? ++idxLetterStart : --idxLetterStart;
        console.log("postInc_SN: "+startNUmber+", SL: "+idxLetterStart)

        if (document.getElementById(""+startNUmber+cLetters[idxLetterStart]).innerHTML !== ""){
            console.log("bloqueo con..."+""+startNUmber+cLetters[idxLetterStart])
            return false;
        }

        nIterations--
    }
    ascendNumber ? ++startNUmber : --startNUmber;
    ascendLetter ? ++idxLetterStart : --idxLetterStart;
    return ((startNUmber)+cLetters[idxLetterStart]) === idD

}


function moveAlfil(idS, idD){
    console.log("MUEVE ALFIL")
    var moveDone = false

    if (eqDiagonal(idS,idD) && diagonalNotBloqued(idS,idD)){
        if(document.getElementById(idD).innerHTML === ""){
            swapPieces(idS,idD)
        }else{
            KillPiece(idS,idD)
        }
        console.log("IDS: "+idS+" IDD: "+idD)              
        moveDone = true
    }
    
    if(moveDone){ 
        changeTurn()
        changeMarker()
                           
    } else {
        mensajeMovInvalido()
    }
    
}

function selectAlgorithm(idS, nS, idD, nD){
    if(nS === "peon" ){
        movePeon(idS, idD, nD);
    }else if(nS === "torre"){
        moveTorre(idS, idD, nD);
    }else if(nS === "alfil"){
        moveAlfil(idS, idD, nD);
    }else if(nS === "caballo"){
        moveCaballo(idS, idD, nD);
    }else if(nS === "reina"){
        moveReina(idS, idD, nD);
    }else if(nS === "rey"){
        moveRey(idS, idD, nD);
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


function try2computeMovement(idSource, idDestiny){
  
    sourceName = getChessName(document.getElementById(idSource).innerHTML)
    destinyName = getChessName(document.getElementById(idDestiny).innerHTML)

    selectAlgorithm(idSource,sourceName, idDestiny, destinyName )

    document.getElementById(idChosenCell).style.border = "";
    
    idChosenCell=""
    idNextCell=""
}


function clickCell(){
    console.log("SE_CLICKA")
    // PRIMER CLICK A CASILLA CONTRARIA O VACIA 
    if( idChosenCell === "" && !isCurrentPlayerChess(this.innerHTML) ){
        console.log("->1")
        /* DO NOTHING */

    //CLICAS PARA SELECCIONAR ALGUNA DE TUS CASILLAS
    }else if( idChosenCell === "" && isCurrentPlayerChess(this.innerHTML) ){
        console.log("->2")
        borrarMensaje()
        this.style.border = "3px solid blue";
        idChosenCell = this.getAttribute("id")

    //CLICAS MISMA CASILLA DESACTIVAS
    } else if (idChosenCell === this.getAttribute("id")){ 
        console.log("->3")
        document.getElementById(idChosenCell).style.border = "";
        idChosenCell = ""
        idNextCell = ""
    
    //Intento matar una pieza de tu color
    }else if(idChosenCell !== "" && isCurrentPlayerChess(this.innerHTML)){
        console.log("->4")
        mensajeMovInvalido()    
    
    
    } else {
        console.log("->5")
        idNextCell = this.getAttribute("id")
        try2computeMovement(idChosenCell,idNextCell)
    }

    console.log("ID_Chosen: <"+idChosenCell+">, "+"ID_NE: <"+idNextCell+">")

}

function isPeon(piece){
    if(piece === unicodeToSymbol(whiteChess.get("peon")) || 
       piece === unicodeToSymbol(blackChess.get("peon"))){
            return true;
       }
    return false;
}


function createBoard(){
    //BOARD creation
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

function unicodeToSymbol(unicode){
    
    el = document.createElement("div")
    el.innerHTML = unicode
    return el.innerHTML
}


function changeTurn(){
    turn = turn === "W"? "B":"W" 
}

createBoard()


