const db = firebase.firestore();
const butt = document.getElementById("start-btn")
const grid = document.querySelector(".grid")
var color = "white"

const cLetters = "ABCDEFGH"
var bColor = "black"

function swithColor(){
    if(bColor === "white"){
        bColor = "black"
        color = "white"
    } else {
        bColor = "white"
        color= "black"
    } 
}
const blackChess = new Map([
    ["peon","&#9823"],
    ["caballo","&#9822"],
    ["alfil", "&#9821"],
    ["torre", "&#9820"],
    ["reina", "&#9819"],
    ["rey", "&#9818"]
]);

const whiteChess = new Map([
    ["peon","&#9817"],
    ["caballo","&#9816"],
    ["alfil", "&#9815"],
    ["torre", "&#9814"],
    ["reina", "&#9813"],
    ["rey", "&#9812"]
]);
function paintCell(bColor){
    return bColor==="white" ? "whited" : "blacked"
}

function unicodeToSymbol(unicode){
    
    el = document.createElement("div")
    el.innerHTML = unicode
    return el.innerHTML
}

function isPeon(piece){
    if(piece === unicodeToSymbol(whiteChess.get("peon")) || 
       piece === unicodeToSymbol(blackChess.get("peon"))){
            return true;
       }
    return false;
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

butt.addEventListener('click', async (e)=>{
    e.preventDefault();
    const response = await db.collection('chess').doc().set({
        title: "HI",
        description: "THERE"
    })
    console.log(response)
})

console.log("WORKS")


function createBoard(){
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
            
    
            grid.appendChild(newCell)
        }
    }
}

createBoard()
