import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { usePosition } from 'use-position';

import MapStyles from './MapStyles';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
};

export default function GoogleMaps({ fullAddress }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const { originLat, originLon, err } = usePosition();

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: 'Weston, FL', // Pass usePosition dinamically
          destination: fullAddress,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          console.log(result);
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setError(result);
          }
        }
      );
    }
  }, [isLoaded, fullAddress]);

  if (error) {
    return <h1>{error}</h1>;
  }

  console.log(isLoaded);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="GoogleMaps">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        //zoom={12}
        //center={marker}
        options={options}
        //defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
