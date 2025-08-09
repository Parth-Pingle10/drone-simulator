const video = document.getElementById('webcam');
const map = L.map('map').setView([19.0760, 72.8777], 13);
const slider = document.querySelector(".slider");
const stream = localStorage.getItem("stream")
const ip = localStorage.getItem("ip")

if (stream === "") {
    document.querySelector("#webcam").src = "Black_colour.jpg"
}
else {
    document.querySelector("#webcam").src = stream

}


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Add marker with initial coordinates
let marker = L.marker([19.0760, 72.8777]).addTo(map);
marker.bindPopup(`Latitude: 19.0760<br>Longitude: 72.8777`).openPopup();

// Toggle dark/light mode
slider.addEventListener("click", () => {
    const elements = document.querySelectorAll(
        ".name, .hud, .batt, .sp, .actual, .b, .cont, .lat, .long, .n, .e, .me"
    );
    elements.forEach(el => el.classList.toggle("light"));
});

let latitude = 19.123210;
let longitude = 72.836805;
let heading = 10;
let battery = 100;
let altitude = 100;
let socket;
let speed = 0;

// Simulated socket connection for testing
async function connectsocket() {

    try {
        const response = await fetch('https://drone-backend-ux0x.onrender.com/data');
        const data = await response.json();
        if (data.length > 0) {
            const latest = data[0];
            console.log('Latest data:', latest);
            document.querySelector(".lat").textContent = latest.gps.latitude;
            document.querySelector(".long").textContent = latest.gps.longitude;
            document.querySelector(".cont").textContent = latest.heading;
            document.querySelector("#battery").textContent = latest.battery;
            document.querySelector("#altitude").textContent = latest.altitude;
            document.querySelector(".actual").textContent = latest.speed;
            if (marker) {
                marker.setLatLng([latest.gps.latitude, latest.gps.longitude])
                    .setPopupContent(`Lat: ${latest.gps.latitude.toFixed(6)}, Lon: ${latest.gps.longitude.toFixed(6)}`);
                map.setView([latest.gps.latitude, latest.gps.longitude]);
            }
        }
    
    } catch (error) {
    console.error('Failed to fetch telemetry:', error);
}


}



// Auto-start simulation on page load
document.addEventListener("DOMContentLoaded", () => {
    connectsocket();
    setInterval(() => {
        connectsocket()
    }, 2000);
});




document.querySelector('.disconnect').addEventListener("click", () => {
    window.location.href = "index.html"
})

