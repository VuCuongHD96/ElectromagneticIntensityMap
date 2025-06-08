const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');

// Cấu hình CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

exports.handler = async function(event, context) {
  // Xử lý CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Khởi tạo Google Sheets API
    const auth = await authenticate({
      keyfilePath: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Thay thế các giá trị này bằng ID của Google Sheet và range của bạn
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'Sheet1!A1:Z1000'; // Điều chỉnh range theo nhu cầu

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data: rows
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch data from Google Sheet'
      })
    };
  }
}; 