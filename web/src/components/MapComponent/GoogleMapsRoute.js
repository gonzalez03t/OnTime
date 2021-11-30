import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
} from '@react-google-maps/api';
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

export default function GoogleMaps({ fullAddress }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded && fullAddress) {
      // Get latitude and longitude via utility functions
      getGeocode({ address: fullAddress })
        .then((results) => getLatLng(results[0]))
        .then((coords) => {
          getdestination(coords);
          process.env.NODE_ENV !== 'production' &&
            console.log('📍 Coordinates: ', coords);
        })
        .catch((error) => {
          process.env.NODE_ENV !== 'production' &&
            console.log('😱 Error: ', error);
        });
    }

    let target;
    let places = [];

    function getdestination(coords) {
      console.log(coords);
      target = {
        latitude: coords.lat,
        longitude: coords.lng,
      };
      places.push(target);
    }

    //places.push(target);
    places.push({ latitude: 25.8103146, longitude: -80.1751609 });
    places.push({ latitude: 28.4813018, longitude: -81.4387899 });

    const waypoints = places.map((p) => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true,
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          waypoints: waypoints,
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

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="GoogleMaps">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        //center={marker}
        options={options}
        //defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
