// Initialize the map
const map = L.map('map').setView([10.762622, 106.660172], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

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