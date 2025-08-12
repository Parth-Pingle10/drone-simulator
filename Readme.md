#  Drone Telemetry Dashboard

A real-time drone telemetry and monitoring dashboard that collects data from a drone system via ESP-32, stores it in a database, and displays it on Frontend, along with ESP-cam live video feed and the current location on real-time map. The system also includes an admin panel for managing and exporting telemetry data.



## About
Drone Telemetry Dashboard is a web-based real-time monitoring system that collects telemetry from an ESP32-equipped drone, stores it in MongoDB, and displays live GPS, altitude, speed, heading, and battery along with interactive Leaflet map. It also supports an ESP-CAM video feed and includes an admin panel for searching, exporting (CSV), and backing up telemetry data.

It’s perfect for:
- Hobby drone projects  
- UAV flight testing  
- IoT telemetry experiments 



## Live Demo
 **[Click here to view the Drone Telemetry Dashboard](https://dashboard-ocgd.onrender.com)**
 
 **[Click here to view the Drone Admin Panel](https://adminpanel-7mma.onrender.com)**

## Screenshots

### Dashboard  View
![Dashboard Screenshot](screenshots/dashboard.png)
### Admin Panel
![Admin Panel Screenshot](screenshots/admin_panel.png)

## Demo Video

To see the Drone Telemetry Dashboard in action and learn how to use its features, watch this quick video walkthrough:

[![Watch the demo](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

This video covers:
- Connecting the drone and receiving live telemetry  
- Viewing the real-time map and ESP-CAM video feed  
- Using the admin panel to search, export, and back up data

##  Features

### **Frontend**
-  **Real-time Telemetry**: Live updates from the ESP device.
-  **Live Map**: Displays drone location using GPS coordinates  using [Leaflet.js](https://leafletjs.com/).
-  **ESP-CAM Feed**: Optional live video stream from the drone camera.
-  **Dark/Light Mode**: For better viewing in different lighting conditions.

### **Admin Panel**
-  View all stored telemetry data.
-  Search through stored data by coordinates, heading, or other parameters.
-  **CSV Export**: Download selected data in CSV format.
-  **Data Backup**: Automatically moves exported data to a backup database to keep the main database clean.


##  Data Structure
Telemetry data received from the ESP is stored and displayed in the following format:

```json
{
  "gps": {
    "latitude": "xx.xxxxxx",
    "longitude": "yy.yyyyyy"
  },
  "heading": "xxx",
  "speed": "xx.x",
  "altitude": "xx.x",
  "battery": "xx%"
}
```

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Leaflet.js
- **Backend**: Node.js (Express)
- **Hardware**: ESP32 connected to Pixhawk Drone
- **Database**: MongoDB (for data storage)


## Contact

If you'd like to learn more about this project or get in touch, feel free to contact me:

**Parth Pingle**  
[LinkedIn](https://www.linkedin.com/in/parth-pingle/) | [GitHub](https://github.com/Parth-Pingle10) | Email: parthpingle1234@gmail.com
