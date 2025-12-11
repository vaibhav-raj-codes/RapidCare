if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');


const emergencyRoutes = require('./routes/emergency');

const path = require('path');

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../rapidcare/dist')));

app.use('/api/emergencies', emergencyRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../rapidcare/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});