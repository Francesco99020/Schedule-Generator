const express = require('express');
const cors = require('cors');
const { GenerateNewSchedule } = require('./scheduleGenerator');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/schedule/generator', (req, res) => {
    try {
        const request = Number(req.body.message);

        const response = GenerateNewSchedule(request);

        res.json({ message: response });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});