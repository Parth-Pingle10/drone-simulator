import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Drone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Telemetry = new mongoose.Schema({
    heading: {
        type: Number,
        required: true
    },
    altitude: {
        type: Number,
        required: true
    },
    battery: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    gps: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Data = mongoose.model('Drone', Telemetry, 'DroneData');
const Copieddata = mongoose.model('copy', Telemetry, 'CopyData');

app.post('/upload', async (req, res) => {
    try {

        const { heading,
            altitude,
            battery,
            speed,
            gps: {
                latitude,
                longitude
            } } = req.body;

        const NewData = new Data({
            heading,
            altitude,
            battery,
            speed,
            gps: {
                latitude,
                longitude
            }
        }); await NewData.save();
        res.status(201).send("Data saved successfully");
    }
    catch (err) {
        res.status(400).send("Error saving data: " + err.message);
    }
});


app.get('/data', async (req, res) => {
    try {
        const allData = await Data.find().sort({ timestamp: -1 });
        res.json(allData);
    } catch (err) {
        res.status(500).send("Error fetching data: " + err.message);
    }
});

app.post('/copy', async (req, res) => {
    try {
        const info = await Data.find({});
        await Copieddata.insertMany(info);
        res.send(`Copied ${info.length} entries to backup.`);
    } catch (err) {
        res.status(500).send('Failed to copy data');
    }
});

app.delete('/delete', async (req, res) => {
    try {
        await Data.deleteMany({});
        res.send("Data deleted successfully");

    } catch (err) {
        console.log(err)
    }
})


app.listen(5000, () => console.log("Server running at http://localhost:5000"));