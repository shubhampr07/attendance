require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error while connecting to DB", err);
    }
};

// Define your schema
const attendanceSchema = new mongoose.Schema({
  name: String,
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date, default: null }
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

// check in route
app.post('/attendance', async (req, res) => {
  try {
    const { name } = req.body;
    const newEntry = new Attendance({ name });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//check-out-route
app.post('/attendance/:id/checkout', async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Attendance.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    record.checkOutTime = new Date();
    await record.save();
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/attendance', async (req, res) => {
  try {
    const dateParam = req.query.date;
    const date = dateParam ? new Date(dateParam) : new Date();
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);
    const records = await Attendance.find({
      checkInTime: { $gte: startOfDay, $lt: endOfDay }
    }).sort({ checkInTime: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/names', async (req, res) => {
  try {
    const prefix = req.query.prefix || '';
    const names = await Attendance.find({ name: { $regex: `^${prefix}`, $options: 'i' } }).distinct('name');
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(port, () => {
    connectDb();
    console.log(`Server running on http://localhost:${port}`);
});
