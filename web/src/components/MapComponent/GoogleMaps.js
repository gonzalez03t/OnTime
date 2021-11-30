import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

import MapStyles from './MapStyles';
import { Dimmer, Loader } from 'semantic-ui-react';

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

export default function GoogleMaps({ fullAddress, imageUrl }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && fullAddress) {
      // Get latitude and longitude via utility functions
      getGeocode({ address: fullAddress })
        .then((results) => getLatLng(results[0]))
        .then((coords) => {
          setMarker(coords);
          process.env.NODE_ENV !== 'production' &&
            console.log('📍 Coordinates: ', coords);
        })
        .catch((error) => {
          process.env.NODE_ENV !== 'production' &&
            console.log('😱 Error: ', error);
        });
    }
  }, [isLoaded, fullAddress]);

  // Marker state to display where user clicks
  const [marker, setMarker] = React.useState();

  const onMapClick = React.useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  // For search and find me functionality
  const mapRef = React.useRef(); // To retain state without rerender
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';

  if (!fullAddress) throw new Error('fullAddress missing from props');

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '20rem' }}>
        <Loader active />
      </div>
    );
  }

  return (
    <div className="GoogleMaps">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={marker}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      </GoogleMap>
    </div>
  );
}
