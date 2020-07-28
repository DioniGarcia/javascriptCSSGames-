const container2 = document.querySelector(".test2 .container")
const butAdd2 = document.querySelector(".test2 #add")
butAdd2.addEventListener('click', () =>{
    newChild = document.createElement("div")
    newChild.classList.add("item")
    newChild.innerHTML = "11111"
    container2.appendChild(newChild)
})

const butRem2 = document.querySelector("#rem")
butRem2.addEventListener('click', () =>{
    if(container2.childNodes.length > 1){
        container2.removeChild(container2.childNodes[0])
    }
    console.log(container2.childNodes.length)
    
})