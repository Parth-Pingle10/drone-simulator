document.querySelector(".connect").addEventListener("click",()=>{
    const input=document.querySelector(".url").value
    const ip=document.querySelector(".ip").value
    window.location.href="addup.html"
    localStorage.setItem("stream",input)
    localStorage.setItem("ip",ip)
})


document.querySelector("body").addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        document.querySelector(".connect").click()
    }
})