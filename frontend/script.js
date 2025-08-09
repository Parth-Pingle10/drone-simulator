document.querySelector(".connect").addEventListener("click", () => {
fetch('https://drone-backend-ux0x.onrender.com/accept', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ accepting: true }) 
})
.then(() => {
  // This runs after fetch completes
  const input = document.querySelector(".url").value;
  localStorage.setItem("stream", input);
  
  const date = new Date();
  const formatted = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  });
  
  document.querySelector(".time").textContent = "Last Connected: " + formatted;
  
  window.location.href = "addup.html";
})
.catch(err => {
  console.error("Fetch error:", err);
});



})


document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.querySelector(".connect").click()
    }
})


