// Initialize the map
const map = L.map('map').setView([10.762622, 106.660172], 13);

// Define map tile layers
const mapLayers = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }),
    satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: '© Esri'
    }),
    terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '© OpenTopoMap'
    }),
    dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© CartoDB'
    })
};

// Add default layer
mapLayers.osm.addTo(map);

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const mapStyleSelect = document.getElementById('mapStyle');

async function searchCity() {
    const cityName = searchInput.value;
    if (!cityName) return;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`);
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon, display_name } = data[0];
            
            // Update map view
            map.setView([lat, lon], 13);
        } else {
            alert('Không tìm thấy thành phố!');
        }
    } catch (error) {
        console.error('Error searching city:', error);
        alert('Có lỗi xảy ra khi tìm kiếm!');
    }
}

// Add event listeners
searchButton.addEventListener('click', searchCity);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCity();
    }
});

// Handle map style changes
mapStyleSelect.addEventListener('change', (e) => {
    const selectedStyle = e.target.value;
    
    // Remove all existing layers
    Object.values(mapLayers).forEach(layer => {
        map.removeLayer(layer);
    });
    
    // Add the selected layer
    mapLayers[selectedStyle].addTo(map);
}); 