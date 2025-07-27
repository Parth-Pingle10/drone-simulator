document.querySelector(".search").addEventListener("input", () => {
    const input = document.querySelector(".search").value;
    const cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(input) ? "flex" : "none";
    });
})


fetch(`http://localhost:5000/data`)
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".card-container");
        container.innerHTML = ""
        data.forEach(entry => {
            const dateTime = new Date(entry.timestamp).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata"
            });

            const card = document.createElement("div")
            card.classList.add("card")
            card.innerHTML = `
                <div>Altitude: ${entry.altitude}</div>
                <div>Heading: ${entry.heading}</div>
                <div>Battery: ${entry.battery}</div>
                <div>Latitude: ${entry.gps.latitude}</div>
                <div>Longitude: ${entry.gps.longitude}</div>
                <div>Time: ${dateTime}</div>
            `;

            container.appendChild(card);
        })
    });

document.querySelector(".clear").addEventListener("click", () => {
    document.querySelector(".card-container").innerHTML = ""
})