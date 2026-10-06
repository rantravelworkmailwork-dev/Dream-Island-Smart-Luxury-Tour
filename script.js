document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.5, 80.5], 8);

  // Clean English-Only Map (Esri - Free, No API Key, No Watermarks)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Route pins matching the exact 7-day itinerary
  const routeStops = [
    {
      day: "Days 1 – 3",
      title: "Habarana & Sigiriya Region",
      stay: "Habarana Village by Cinnamon, Amaya Lake or Kassapa Lion Rock (3 Nights, Half Board)",
      coords: [8.0339, 80.7533],
      desc: "Airport arrival & transfer, Sigiriya Rock Fortress, Village Tour, Habarana Safari & Ayurveda Massage."
    },
    {
      day: "Day 4",
      title: "Kandy",
      stay: "Golden Crown, Amaya Boutique Hill or Thilanka Kandy (1 Night, Half Board)",
      coords: [7.2906, 80.6337],
      desc: "Golden Temple / Cave Temple, Spice Garden, Temple of the Tooth Relic & Traditional Cultural Show."
    },
    {
      day: "Day 5",
      title: "Nuwara Eliya",
      stay: "Galway Heights, Araliya Green Hills or Lynden Grove (1 Night, Half Board)",
      coords: [6.9497, 80.7891],
      desc: "Gem Museum, Tea Garden & Factory tour, Ramboda Falls."
    },
    {
      day: "Day 6",
      title: "Colombo",
      stay: "Marino Beach Colombo, Kingsbury Colombo or Grandbell Hotel (1 Night, Half Board)",
      coords: [6.9271, 79.8612],
      desc: "Scenic mountain drive, 1.5-hour Colombo City Tour & hotel check-in."
    },
    {
      day: "Day 7",
      title: "Negombo / Departure",
      stay: "Departure Transfer",
      coords: [7.2083, 79.8358],
      desc: "Transfer to Bandaranaike International Airport in Negombo for departure flight home."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin:0; color:#334155;"><strong>Stay:</strong> ${stop.stay}</p>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});
