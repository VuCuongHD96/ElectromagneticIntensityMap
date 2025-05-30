// Google Maps initialization
function initMap() {
    // Default center location (Ho Chi Minh City)
    const defaultLocation = { lat: 10.762622, lng: 106.660172 };

    // Custom map styles to hide all places
    const mapStyles = [
        {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.park",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.business",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.school",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.medical",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.attraction",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.government",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "landscape",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "road",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "water",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }
    ];

    // Create the map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: defaultLocation,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        disableDefaultUI: true,
        styles: mapStyles
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