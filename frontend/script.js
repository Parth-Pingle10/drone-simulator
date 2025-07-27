const connect = document.querySelector(".connect");
const line=document.querySelector(".line")
const img = document.querySelector(".connected");
let isconnect = false;
let socket;
let latitude = 19.123210;
let longitude = 72.836805;
let heading = 180;
let battery = 100;
let altitude = 0;
let ip=""

document.querySelector(".ip").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        connect.click();
    }
});


function connectsocket() {
    
 socket = new WebSocket(`ws://${ip}:81`);
 console.log(`ws://${ip}:81`)

    socket.addEventListener("open", async () => {
        console.log("Connected to ESP-32");
    });

    socket.addEventListener("message", async (e) => {
        try {
            const data = JSON.parse(e.data);

            latitude = data.gps.lat;
            longitude = data.gps.lon;
            heading = data.heading;
            altitude = data.altitude;
            battery = data.battery
            const now = new Date();
            document.querySelector(".time").innerHTML = "Last Updated:" + now.toLocaleTimeString();

            if(battery<20){
                alert("Battery is low")
            }

            const res = await fetch('http://localhost:5000/upload', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ heading, altitude, battery, latitude, longitude })
            })

            document.querySelector(".angle").textContent = data.heading ?? "N/A";
            document.querySelector(".height").textContent = data.altitude ?? "N/A";
            document.querySelector(".charge").textContent = data.battery ?? "N/A";
            document.querySelector(".latitude").textContent = latitude.toFixed(6);
            document.querySelector(".longitude").textContent = longitude.toFixed(6);

            if (marker) {
                marker.setLatLng([latitude, longitude])
                    .setPopupContent(`Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)}`);
                map.setView([latitude, longitude]);
            }
        } catch (err) {
            console.error("Invalid data received:", e.data);
        }
    });

    socket.addEventListener("close", () => {
        console.log("WebSocket closed.");
    });

    socket.addEventListener("error", (err) => {
        console.error("WebSocket error:", err);
    });
}

function disconnectsocket() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
    } else {
        console.log("WebSocket is already closed or not initialized.");
    }
}

// Map Setup
const map = L.map('map').setView([latitude, longitude], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([latitude, longitude]).addTo(map)
    .bindPopup(`
        <div class="popup-content">
          <div><span style="color:#1e90ff; font-weight:bold;">Lat:</span> ${latitude.toFixed(6)}</div>
          <div><span style="color:#ff6347; font-weight:bold;">Lon:</span> ${longitude.toFixed(6)}</div>
        </div>
    `, {
        className: 'custom-popup'
    }).openPopup();



// // Optional: Random move every 5 seconds (testing/demo)
// function getRandomCoordinate(base, range = 0.005) {
//     return base + (Math.random() - 0.5) * 2 * range;
// }

// setInterval(() => {
//     if (!isconnect) {
//         const newLat = getRandomCoordinate(latitude);
//         const newLon = getRandomCoordinate(longitude);
//         marker.setLatLng([newLat, newLon])
//             .setPopupContent(`
//                 <div>
//                     <span style="color:#1e90ff; font-weight:bold;">Lat:</span> ${newLat.toFixed(6)}<br>
//                     <span style="color:#ff6347; font-weight:bold;">Lon:</span> ${newLon.toFixed(6)}
//                 </div>
//               `)
//             .openPopup();
//         map.setView([newLat, newLon]);
//     }
// }, 5000);

// Toggle connect/disconnect
connect.addEventListener("click", () => {
    // connect.classList.toggle("clicked");
    // document.querySelector(".box").classList.toggle("daba");
    ip=document.querySelector(".ip").value
    if(ip===""){
        document.querySelector(".alert").style.display="flex"
        setTimeout(()=>{
            document.querySelector(".alert").style.display="none"
            
        },2000)
    }
    else{
        isconnect = !isconnect;
        
}
    if (isconnect) {
        img.src = "wifi.png";
        document.querySelector(".box").style.backgroundColor="#00aaff"
        document.querySelector(".mahiti").textContent = "Connected";
        connect.style.color="#E6E6E6"
        connect.style.backgroundColor="#e64c4c"
        connect.innerHTML = "Disconnect";
        document.querySelector(".heading").style.display = "flex";
        document.querySelector(".altitude").style.display = "flex";
        document.querySelector(".battery").style.display = "flex";
        document.querySelector(".dis").style.display = "none";
        document.querySelector(".data").style.display = "flex";
        document.getElementById("map").style.display = "block";
        
        
        setTimeout(() => {
            map.invalidateSize();
            map.setView([latitude, longitude]);
        }, 100);
        
        
        connectsocket();
    } else {
        img.src = "wifioff.png";
        document.querySelector(".box").style.backgroundColor="#e64c4c"
        connect.innerHTML = "Connect";
        document.querySelector(".mahiti").textContent = "Disconnected";
        connect.style.color="#0c0f12"
        connect.style.backgroundColor="#00aaff"
        document.querySelector(".heading").style.display = "none";
        document.querySelector(".altitude").style.display = "none";
        document.querySelector(".battery").style.display = "none";
        document.querySelector(".dis").style.display = "flex";
        document.querySelector(".data").style.display = "none";
        document.getElementById("map").style.display = "none";

        disconnectsocket();
    }
});


