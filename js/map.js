// Initialize the map
const map = L.map('map').setView([10.762622, 106.660172], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker
const marker = L.marker([10.762622, 106.660172]).addTo(map);
marker.bindPopup("<b>Hello!</b><br>I am a popup.").openPopup(); 