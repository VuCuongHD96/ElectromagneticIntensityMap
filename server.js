const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the UI directory
app.use(express.static(path.join(__dirname, 'UI')));

// Serve static files from the css directory
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the js directory
app.use('/js', express.static(path.join(__dirname, 'js')));

// Listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`To access from other devices in the same network, use your computer's IP address`);
}); 