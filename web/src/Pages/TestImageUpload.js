import React from 'react';
import ImageUploader from '../components/ImageUploader/ImageUploader';

export default function TestImageUpload() {
  function handleValidImageUploaded(img) {
    console.log('HANDLING VALID IMAGE:', img);
    // TODO: this is where we would either store the value in a state or
    // send it over to our storage solution for images once we have one.
  }

  return (
    <ImageUploader onValidImageUploaded={handleValidImageUploaded} useButton />
  );
}
