import React, { useEffect } from 'react';
import { GdeltLocation } from './types';

interface MapViewProps {
  locations: GdeltLocation[];
}

const MapView: React.FC<MapViewProps> = ({ locations }) => {
  const mapContainerId = 'gdelt-map';
  
  useEffect(() => {
    // Clean up any existing map
    const existingMap = window._leafletMap;
    if (existingMap) {
      existingMap.remove();
      window._leafletMap = null;
    }
    
    if (!locations || locations.length === 0) return;
    
    // Initialize map after component is mounted
    const initMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');
        
        // Find first location with coordinates to center the map
        const firstLocationWithCoords = locations.find(loc => loc.coords);
        
        if (!firstLocationWithCoords || !firstLocationWithCoords.coords) return;
        
        // Create map instance
        const map = L.map(mapContainerId).setView(
          [firstLocationWithCoords.coords.lat, firstLocationWithCoords.coords.lon],
          5
        );
        
        // Save to window for cleanup
        window._leafletMap = map;
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add markers for each location with coordinates
        locations.forEach(location => {
          if (location.coords) {
            L.marker([location.coords.lat, location.coords.lon])
              .addTo(map)
              .bindPopup(`<strong>${location.name}</strong>`);
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };
    
    initMap();
    
    // Cleanup function
    return () => {
      if (window._leafletMap) {
        window._leafletMap.remove();
        window._leafletMap = null;
      }
    };
  }, [locations]);
  
  return <div id={mapContainerId} className="h-[400px] w-full border border-gray-200 rounded-md" />;
};

// Add this definition to prevent TypeScript errors
declare global {
  interface Window {
    _leafletMap: any;
  }
}

export default MapView;