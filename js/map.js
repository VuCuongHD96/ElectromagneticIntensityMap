// Initialize the map
const map = L.map('map').setView([16.0, 106.0], 6);  // Centered on Vietnam with zoom level 6

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

// Function to fetch data from API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to display locations on map
async function displayLocations() {
    try {
        const data = await fetchData();
        
        // Create a layer group for markers
        const markersLayer = L.layerGroup().addTo(map);
        
        // Add markers for each location
        data.slice(1).forEach(row => {
            const longitude = parseFloat(row[10]);
            const latitude = parseFloat(row[11]);
            
            if (!isNaN(latitude) && !isNaN(longitude)) {
                const marker = L.marker([latitude, longitude]).addTo(markersLayer);
                
                // Add popup with information
                const popupContent = `
                    <div style="font-size: 14px;">
                        <h3 style="margin: 0 0 10px 0; color: #2c3e50;">${row[1] || 'Không có tên trạm'}</h3>
                        <div style="margin-bottom: 5px;">
                            <strong>Mã SITE/LAC:</strong> ${row[0] || 'N/A'}<br>
                            <strong>Mã cell:</strong> ${row[2] || 'N/A'}<br>
                            <strong>Địa chỉ:</strong> ${row[3] || 'N/A'}<br>
                            <strong>Vị trí:</strong> ${row[4]}, ${row[6]}, ${row[8]}<br>
                            <strong>Tọa độ:</strong> ${longitude}°, ${latitude}°<br>
                            <strong>Độ cao ăng-ten:</strong> ${row[12] || 'N/A'} m<br>
                            <strong>Công nghệ:</strong> ${row[25] || 'N/A'}<br>
                            <strong>Nhà cung cấp:</strong> ${row[28] || 'N/A'}
                        </div>
                    </div>
                `;
                marker.bindPopup(popupContent);
            }
        });

        //Mã SITE/LAC	Tên trạm gốc	Mã cell	Địa chỉ	Xã (phường) đặt nhà trạm	Mã phường (xã) đặt trạm	Huyện (quận) đặt nhà trạm	Mã huyện (quận) đặt trạm	Tỉnh (thành phố) đặt nhà trạm	Mã tỉnh/ thành phố (đặt trạm)	Kinh độ	Vĩ độ	Độ cao ăng-ten (m)	Hãng sản xuất ăng-ten	Chủng loại ăng-ten	Kiểu ăng-ten	Phân cực ăng-ten	Tăng ích của ăng-ten (dBi)	Góc phương vị của ăng-ten (deg)	Góc cụp của ăng-ten (deg)	Độ rộng búp sóng chính của ăng-ten (deg)	Hãng sản xuất máy phát VTĐ	Chủng loại thiết bị máy phát VTĐ	Công suất phát (dBm)	Tần số phát (MHz)	Băng thông (MHz)	Công nghệ vô tuyến	Ghi chú	Thời gian tiếp nhận	Nhà cung cấp
        
        // Fit map bounds to show all markers
        const bounds = L.latLngBounds(data.slice(1)
            .filter(row => !isNaN(parseFloat(row[10])) && !isNaN(parseFloat(row[11])))
            .map(row => [parseFloat(row[11]), parseFloat(row[10])]));
        
        if (!bounds.isValid()) {
            map.setView([16.0, 106.0], 6);  // Default to Vietnam view if no valid markers
        } else {
            map.fitBounds(bounds);
        }
    } catch (error) {
        console.error('Error displaying locations:', error);
        alert('Có lỗi xảy ra khi tải dữ liệu vị trí!');
    }
}

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

// Load locations when the page loads
document.addEventListener('DOMContentLoaded', displayLocations); 