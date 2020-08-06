const navSlide = () =>{
    const burguer = document.querySelector(".burger");
    const nav = document.querySelector("ul")
    const navLinks = document.querySelectorAll("li")


    burguer.addEventListener('click', ()=>{
        nav.classList.toggle("nav-active")

        navLinks.forEach((link,index) =>{
            if(link.style.animation){
                link.style.animation = ''
            }else{
                link.style.animation = "navLinkFade .5s ease forwards "+(index/7+.5)+"s"
            }
        })

        //burguer animation
        burguer.classList.toggle('toggle')
    })

    
}

navSlide()