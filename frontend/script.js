document.querySelector(".connect").addEventListener("click", () => {
    const input = document.querySelector(".url").value
    const ip = document.querySelector(".ip").value
   
 
        localStorage.setItem("stream", input)
        localStorage.setItem("ip", ip)
        window.location.href = "addup.html"
    
})


document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.querySelector(".connect").click()
    }
})

function alert() {
    document.querySelector(".alert").style.display = "flex"
    setInterval(() => {
        document.querySelector(".alert").style.display = "none"

    }, 1500);

}
