// Google Maps initialization
function initMap() {
    // Default location (you can change these coordinates)
    const defaultLocation = { lat: 10.762622, lng: 106.660172 }; // Ho Chi Minh City coordinates

    // Create the map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: defaultLocation,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
    });

    // Add a marker
    const marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: "Our Location",
        animation: google.maps.Animation.DROP
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: "<h5>Our Location</h5><p>Visit us here!</p>"
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any Bootstrap components
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 