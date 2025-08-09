const video = document.getElementById('webcam');
const map = L.map('map').setView([19.0760, 72.8777], 13);
const slider = document.querySelector(".slider");
const stream = localStorage.getItem("stream")
const ip = localStorage.getItem("ip")

const newUrl = stream;
const iframe = document.getElementById("webcam");
iframe.src = newUrl;

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
function connectsocket() {

    socket = new WebSocket(`ws://${ip}:81`)
    socket.addEventListener("open", () => {
    });
    socket.addEventListener("message", async (e) => {
        try {

            const data = JSON.parse(e.data)
            latitude = data.gps.lat;
            longitude = data.gps.lon;
            heading = data.heading;
            altitude = data.altitude;
            battery = data.battery;
            speed = data.speed;
            const now = new Date();
            document.querySelector(".cont").textContent = heading
            document.querySelector(".lat").textContent = latitude
            document.querySelector(".long").textContent = longitude
            document.querySelector("#battery").textContent = battery
            document.querySelector("#altitude").textContent = altitude
            document.querySelector(".actual").textContent = speed

            const res = await fetch('https://drone-backend-ux0x.onrender.com/upload', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    heading,
                    altitude,
                    battery,
                    speed,
                    gps: {
                        latitude,
                        longitude
                    }
                })
            })
            if (marker) {
                marker.setLatLng([latitude, longitude])
                    .setPopupContent(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`);
                map.setView([latitude, longitude]);
            }
        } catch (err) {
            console.log(err)
        }
    });

    if (marker) {
        marker.setLatLng([latitude, longitude])
            .setPopupContent(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`);
        map.setView([latitude, longitude]);
    }



}



// Auto-start simulation on page load
document.addEventListener("DOMContentLoaded", () => {
    connectsocket();
});



function disconnectsocket() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
    } 
}
document.querySelector('.disconnect').addEventListener("click", () => {
    window.location.href = "index.html"
})


