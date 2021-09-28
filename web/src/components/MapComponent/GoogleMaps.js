import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import MapStyles from './MapStyles';
import UFHealthLogoStyle from './UFHealthLogo.css';
import SearchMapStyle from './SearchMap.css';
import UFHealthLogo from '../../assets/ufhealth.png';

// import usePlacesAutocomplete, {
//    getGeocode,
//    getLatLng,
//} from 'use-places-autocomplete';

const libraries = ['places'];

const mapContainerStyle = {
  width: '70vw',
  height: '60vh',
};

const center = {
  lat: 29.648657,
  lng: -82.343629,
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
};

export default function GoogleMaps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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
  if (!isLoaded) return 'Loading maps';

  return (
    <div className="GoogleMaps">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <div style={UFHealthLogoStyle}>
          <h1>
            <span role="img" aria-label="UF Health Logo">
              <img src={UFHealthLogo} alt="UF Health Logo" />
            </span>
          </h1>
        </div>

        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      </GoogleMap>
    </div>
  );
}

function SearchMap() {
  /*const {
        ready, 
        value, 
        suggestions: { status, data },
        setValue,
        clearSugestion,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 29.648657, lng: () => -82.343629 },
            radious: 1000, // to look for parking in a 1000 meter radius
        }
    });*/

  return (
    <div className={SearchMapStyle}>
      <h2>Search Bar</h2>
    </div>
  );
}

// PENDING:
// Search for parking around appointment location coordinates. Need to pass clinic lat and lng as props.
// Adding Google Places Search Bar
// Adding Find Me functionality
// Add marker icon
// Info window