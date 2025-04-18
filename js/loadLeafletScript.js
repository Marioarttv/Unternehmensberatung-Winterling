// Function to dynamically load the Leaflet script
window.loadLeafletScript = function () {
    // Check if Leaflet is already loaded
    if (window.L) {
        window.initMap();
        return;
    }

    // Create and load the Leaflet script if not already loaded
    var script = document.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = function () {
        window.initMap();
    };
    document.body.appendChild(script);
};

// Map initialization function
window.initMap = function () {
    console.log("Initializing map...");

    // Check if the map container exists
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) {
        console.error("Map container not found");
        return;
    }

    try {
        // Define the coordinates for the location (Munich office)
        const lat = 48.167727; // Coordinates for Franz-Marc-Straße 12, München
        const lng = 11.538869;

        // Initialize the map
        const map = L.map('mapContainer').setView([lat, lng], 15);

        // Add the OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Add a marker for the office location
        const marker = L.marker([lat, lng]).addTo(map);

        // Add a popup to the marker
        marker.bindPopup(`
                <strong>Unternehmensberatung Andreas Winterling</strong><br>
                Franz-Marc-Straße 12<br>
                80637 München
            `).openPopup();

        // Ensure the map renders correctly by triggering a resize after it's visible
        setTimeout(function () {
            map.invalidateSize();
        }, 300);

        console.log("Map initialized successfully");
    } catch (error) {
        console.error("Error initializing map:", error);
    }
};

// Function to check for URL fragment and scroll to that section
window.checkForFragmentAndScroll = function () {
    const hash = window.location.hash;
    if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};