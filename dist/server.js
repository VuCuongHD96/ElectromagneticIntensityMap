const express = require('express');
const path = require('path');
const cors = require('cors');
const { google } = require('googleapis');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// API route to get Google Sheets data
app.get('/api/data', async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "./js/credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = await auth.getClient();

        const googleSheets = google.sheets({ version: "v4", auth: client });

        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId: "1Mm_xxrdwJq-dEHoFBSdrRzBV2BU7BKHCWpmZmhbmxIE",
            range: "Sheet1",
        });

        res.json(getRows.data.values);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve static files from the css directory
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the js directory
app.use('/js', express.static(path.join(__dirname, 'js')));

// Listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`To access from other devices in the same network, use your computer's IP address`);
}); 