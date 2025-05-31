// Configuration for map locations
const locations = [
  {
    name: "Hà Nội",
    position: { lat: 21.0285, lng: 105.8542 },
    info: {
      "Địa điểm": "Hà Nội",
      "Mô tả": "Thủ đô của Việt Nam",
      "Dân số": "~8.4 triệu người",
      "Mã SITE/LAC": "N/A",
      "Tên trạm gốc": "N/A",
      "Mã cell": "N/A",
      "Xã (phường)": "N/A",
      "Mã phường (xã)": "N/A",
      "Huyện (quận)": "N/A",
      "Mã huyện (quận)": "N/A",
      "Tỉnh (thành phố)": "Hà Nội",
      "Mã tỉnh/ thành phố": "N/A",
      "Kinh độ": 105.8542,
      "Vĩ độ": 21.0285,
      "Độ cao ăng-ten (m)": "N/A",
      "Hãng sản xuất ăng-ten": "N/A"
    }
  },
  {
    name: "Hồ Chí Minh",
    position: { lat: 10.7769, lng: 106.7009 },
    info: {
      "Địa điểm": "Hồ Chí Minh",
      "Mô tả": "Thành phố lớn nhất Việt Nam",
      "Dân số": "~9.3 triệu người",
      "Mã SITE/LAC": "N/A",
      "Tên trạm gốc": "N/A",
      "Mã cell": "N/A",
      "Xã (phường)": "N/A",
      "Mã phường (xã)": "N/A",
      "Huyện (quận)": "N/A",
      "Mã huyện (quận)": "N/A",
      "Tỉnh (thành phố)": "Hồ Chí Minh",
      "Mã tỉnh/ thành phố": "N/A",
      "Kinh độ": 106.7009,
      "Vĩ độ": 10.7769,
      "Độ cao ăng-ten (m)": "N/A",
      "Hãng sản xuất ăng-ten": "N/A"
    }
  },
  {
    name: "Bình Thuận - Thôn Hồng Thắng",
    position: { lat: 11.1005497, lng: 108.4823532 },
    info: {
      "Địa điểm": "Thôn Hồng Thắng xã Hòa Thắng, huyện Bắc Bình, tỉnh Bình Thuận",
      "Mô tả": "Dữ liệu từ ảnh",
      "Dân số": "N/A",
      "Mã SITE/LAC": "2G_BBI055M_BTN",
      "Tên trạm gốc": "CSHT_BTN_00339",
      "Mã cell": "2G_BBI055M13_BT",
      "Xã (phường)": "Xã Hòa Thắng",
      "Mã phường (xã)": "23053",
      "Huyện (quận)": "Huyện Bắc Bình",
      "Mã huyện (quận)": "596",
      "Tỉnh (thành phố)": "Bình Thuận",
      "Mã tỉnh/ thành phố": "60",
      "Kinh độ": 108.4823532,
      "Vĩ độ": 11.1005497,
      "Độ cao ăng-ten (m)": "38",
      "Hãng sản xuất ăng-ten": "Nhãn mờ"
    }
  }
];

// Map styles configuration
const mapStyles = [
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "locality",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [{ visibility: "on" }]
  }
];

// Function to create info window content
function createInfoWindowContent(info) {
  let content = `<div style="padding: 10px; width: 250px;">`;

  // Add the main location name at the top
  if (info["Địa điểm"]) {
    content += `<h4>${info["Địa điểm"]}</h4><hr style="margin: 5px 0;">`;
  }

  // Add other fields in a key-value pair format
  for (const key in info) {
    if (key !== "Địa điểm" && info[key] !== "N/A") { // Exclude main location and N/A values
      content += `<p style="margin: 3px 0;"><strong>${key}:</strong> ${info[key]}</p>`;
    }
  }

  content += `</div>`;
  return content;
}

// Function to add a marker with info window
function addMarkerWithInfoWindow(map, location) {
  const marker = new google.maps.Marker({
    position: location.position,
    map: map,
    title: location.name
  });

  const infoWindow = new google.maps.InfoWindow({
    content: createInfoWindowContent(location.info)
  });

  marker.addListener("click", () => {
    // Close any currently open info window before opening the new one
    if (window.currentInfoWindow) {
      window.currentInfoWindow.close();
    }
    infoWindow.open(map, marker);
    window.currentInfoWindow = infoWindow; // Keep track of the currently open info window
  });

  return marker;
}

function initMap() {
  // Calculate center point between all locations
  const center = {
    lat: locations.reduce((sum, loc) => sum + loc.position.lat, 0) / locations.length,
    lng: locations.reduce((sum, loc) => sum + loc.position.lng, 0) / locations.length
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 6,
    disableDefaultUI: true,
    styles: mapStyles
  });

  // Add markers for all locations
  locations.forEach(location => {
    addMarkerWithInfoWindow(map, location);
  });

  // Add a listener to the map to close the info window when clicking on the map
  map.addListener("click", () => {
    if (window.currentInfoWindow) {
      window.currentInfoWindow.close();
      window.currentInfoWindow = null;
    }
  });
} 