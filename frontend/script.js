document.querySelector(".connect").addEventListener("click", () => {
    const input = document.querySelector(".url").value
    const ip = document.querySelector(".ip").value


    localStorage.setItem("stream", input)
    localStorage.setItem("ip", ip)
    window.location.href = "addup.html"
    const date = new Date()
    const formatted = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
    });
    document.querySelector(".time").textContent = "Last Connected:" + formatted

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
