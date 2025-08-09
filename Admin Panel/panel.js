document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".search").addEventListener("input", () => {
        const input = document.querySelector(".search").value.toLowerCase().replace(/\s*/g, "");
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            const text = card.textContent.toLowerCase().replace(/\s*/g, "");
            card.style.display = text.includes(input) ? "flex" : "none";
        });
    });

    function fetchdata() {

        fetch(`https://drone-backend-ux0x.onrender.com/data`)
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
            <div>Speed: ${entry.speed}</div>
            <div>Time: ${dateTime}</div>
            `;

                    container.appendChild(card);
                })
            });


    }

    const saveBtn = document.querySelector(".save");


    saveBtn.addEventListener("click", async () => {
        download();

        try {
            const copy = await fetch('https://drone-backend-ux0x.onrender.com/copy', {
                method: "POST"
            });

            const deletedata = await fetch('https://drone-backend-ux0x.onrender.com/delete', {
                method: "DELETE"
            })
        } catch (err) {
            console.log(err);
        }

    });

    function convertToCSV(arr) {
        const header = Object.keys(arr[0]).join(",") + "\n";
        const rows = arr
            .map(obj => Object.values(obj).map(value => `"${value}"`).join(","))
            .join("\n");
        return header + rows;
    }
    function downloadcsv(data,filename="data.csv"){
       const blob=new Blob([data],{type:`text/csv`})
       const url=URL.createObjectURL(blob)
       const a=document.createElement("a")
       a.href=url;
       a.download=filename;
       a.click();
       URL.revokeObjectURL(url)
    }
    async function download() {
        try {
            const res = await fetch('https://drone-backend-ux0x.onrender.com/data')
            const data = await res.json();
            const csv=convertToCSV(data)

           downloadcsv(csv,"DRC_Data.csv")
        }
        catch (err) {
            console.error(err);
        }
    }

    setInterval(() => {
        fetchdata()
    }, 1000);
});