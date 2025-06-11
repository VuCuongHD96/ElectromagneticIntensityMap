const express = require( "express");
const { google } = require( "googleapis");
const app = express();
app.get("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "./js/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    }) ;
    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: "1Mm_xxrdwJq-dEHoFBSdrRzBV2BU7BKHCWpmZmhbmxIE",
        range: "Sheet1",
    });

    res.send(getRows.data.values);
}) ;
app.listen(3000, (req, res) => console.log("running on 3000"));