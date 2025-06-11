const XLSX = require('xlsx');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        // Read the Excel file
        const workbook = XLSX.readFile(path.join(__dirname, '../data/data.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to load data' })
        };
    }
}; 