function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 16.5, lng: 106.5 }, // Center between Hanoi and HCMC
    zoom: 6,
    disableDefaultUI: true,
    styles: [
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
    ]
  });

  // Add markers for Hanoi and Ho Chi Minh City
  const hanoi = new google.maps.Marker({
    position: { lat: 21.0285, lng: 105.8542 },
    map: map,
    title: "Hà Nội"
  });

  const hcmc = new google.maps.Marker({
    position: { lat: 10.7769, lng: 106.7009 },
    map: map,
    title: "Hồ Chí Minh"
  });
} 