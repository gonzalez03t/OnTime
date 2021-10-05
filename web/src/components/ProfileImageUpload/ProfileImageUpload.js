import React from 'react';
import { Image } from 'semantic-ui-react';
import ImageUploader from '../ImageUploader/ImageUploader';
import './ProfileImageUpload.css';

export default function ProfileImageUpload({
  imageSrc,
  handleValidImageUploaded,
}) {
  return (
    <div>
      <div className="field">
        <label>Profile Photo</label>
      </div>

      <div className="container">
        <span className="profile-image__container">
          {imageSrc ? (
            <Image style={{ objectFit: 'cover' }} src={imageSrc} />
          ) : (
            <svg
              className="profile-image__placeholder"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </span>

        <ImageUploader
          onValidImageUploaded={handleValidImageUploaded}
          useButton
          buttonLabel="Change"
        />
      </div>
    </div>
  );
}
