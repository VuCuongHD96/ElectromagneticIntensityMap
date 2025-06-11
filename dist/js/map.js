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
        const response = await fetch('/api/data');
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
                        <div>
                           <div style="margin-bottom: 10px; font-size: 20px; background-color: #0356b2; color: white; padding: 5px; text-align: center; display: flex; justify-content: space-between; align-items: center;">
                            <div style="flex-grow: 1;"><strong>Thông tin chung</strong></div>
                            <div style="display: flex; gap: 10px;">
                                <button onclick="downloadExcel(this.getAttribute('data-row'))" data-row='${JSON.stringify(row)}' style="background: none; border: none; color: white; cursor: pointer; padding: 5px;">
                                      <i class="fas fa-print"></i>
                                </button>
                            </div>
                        </div>
                            <div style="margin-left: 10px;">
                                <strong>Thời gian tiếp nhận:</strong> ${row[28] || 'N/A'}<br>
                                <strong>Nhà cung cấp:</strong> ${row[29] || 'N/A'}<br>
                                <strong>Địa chỉ:</strong> ${row[3] || 'N/A'}<br>
                                <strong>Xã (phường) đặt nhà trạm:</strong> ${row[4] || 'N/A'}<br>
                                <strong>Huyện (quận) đặt nhà trạm:</strong> ${row[6] || 'N/A'}<br>
                            </div>
                        </div>
                        <div style = "padding-top: 15px;">
                            <div style="background-color: #0356b2; font-size: 18px; color: white; padding: 5px; text-align: center;">
                                <strong>Thông tin chi tiết</strong><br>
                            </div>
                            <div style="margin-left: 10px; padding-bottom: 10px; overflow-x: auto;">
                                <table style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Mã SITE/LAC</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Tên trạm gốc</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Mã cell</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Mã phường (xã) đặt trạm</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Mã huyện (quận) đặt trạm</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Tỉnh (thành phố) đặt nhà trạm</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Mã tỉnh/ thành phố (đặt trạm)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Kinh độ</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Vĩ độ</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Độ cao ăng-ten (m)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Hãng sản xuất ăng-ten</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Chủng loại ăng-ten</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Kiểu ăng-ten</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Phân cực ăng-ten</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Tăng ích của ăng-ten (dBi)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Góc phương vị của ăng-ten (deg)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Góc cụp của ăng-ten (deg)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Độ rộng búp sóng chính của ăng-ten (deg)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Hãng sản xuất máy phát VTĐ</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Chủng loại thiết bị máy phát VTĐ</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Công suất phát (dBm)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Tần số phát (MHz)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Băng thông (MHz)</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Công nghệ vô tuyến</strong></td>
                                        <td style="padding: 4px; border: 1px solid #ddd; min-width: 150px;"><strong>Ghi chú</strong></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[0] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[1] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[2] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[5] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[7] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[8] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[9] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[10] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[11] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[12] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[13] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[14] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[15] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[16] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[17] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[18] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[19] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[20] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[21] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[22] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[23] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[24] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[25] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[26] || 'N/A'}</td>
                                        <td style="padding: 4px; border: 1px solid #ddd;">${row[27] || 'N/A'}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                marker.bindPopup(popupContent, {
                    minWidth: 600, 
                  });
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

// Load locations and initialize UI elements when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const mapStyleSelect = document.getElementById('mapStyle');

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

    // Load locations
    displayLocations();
}); 