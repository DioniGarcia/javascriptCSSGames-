const butt = document.getElementById('butt');
butt.addEventListener('click',newItem)
const title = document.getElementById('title');
var elems = document.querySelectorAll('li')
var uList = document.querySelector('ul');
var idxChosen = -1;
var counter = 3

uList.addEventListener("click",activateItem)



function newItem(){
    uList.innerHTML += "<li>Item "+counter+"</li>"
    counter++
}

function activateItem(e){
    console.log(e.target.nodeName)
    if(e.target.nodeName == "LI"){
        title.innerHTML = e.target.innerHTML
        for(i=0; i<e.target.parentNode.children.length;i++){
            e.target.parentNode.children[i].classList.remove("active");
        }
        e.target.classList.add("active");

    }
}
