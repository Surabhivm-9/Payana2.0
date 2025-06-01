
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  destinations: string[];
  onRouteCalculated?: (route: any) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ destinations, onRouteCalculated }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyDmLQhyUHWYkDBem7vRkkoLlV7dNuXSAyM",
        version: "weekly",
        libraries: ["places", "geometry"]
      });

      const { Map } = await loader.importLibrary("maps");
      const { DirectionsService, DirectionsRenderer } = await loader.importLibrary("routes");

      if (mapRef.current) {
        const mapInstance = new Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
          zoom: 4,
        });

        const directionsServiceInstance = new DirectionsService();
        const directionsRendererInstance = new DirectionsRenderer();
        
        directionsRendererInstance.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (directionsService && directionsRenderer && destinations.length >= 2) {
      calculateRoute();
    }
  }, [destinations, directionsService, directionsRenderer]);

  const calculateRoute = () => {
    if (!directionsService || !directionsRenderer || destinations.length < 2) return;

    const waypoints = destinations.slice(1, -1).map(dest => ({
      location: dest,
      stopover: true
    }));

    const request: google.maps.DirectionsRequest = {
      origin: destinations[0],
      destination: destinations[destinations.length - 1],
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
        onRouteCalculated?.(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default GoogleMap;
