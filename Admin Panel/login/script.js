const img = document.querySelector(".eye");

document.querySelector(".submit").addEventListener("click", () => {
    const input = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;

    if (input !== "drc_spit" && password !== "DRC_spit@1106") {
        document.querySelector(".alert").style.display = "flex"
        setTimeout(() => {
            document.querySelector(".alert").style.display = "none"
        }, 3000);
    }
    if (input === "drc_spit" && password === "DRC_spit@1106") {

        window.location.href = "../frontend/index.html";
    }
});

img.addEventListener("click", () => {
    if (img.src.includes("eye.png")) {
        img.src = "eye-off.png";
        document.querySelector(".password").type = "text";
    } else {
        img.src = "eye.png";
        document.querySelector(".password").type = "password";
    }

})

document.querySelector(".password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.querySelector(".submit").click();
    }
})