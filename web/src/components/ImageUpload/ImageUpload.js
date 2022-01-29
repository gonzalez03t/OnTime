import React from 'react';
import { Image } from 'semantic-ui-react';
import ImageUploader from '../ImageUploader/ImageUploader';
import './ImageUpload.css';

export default function ImageUpload({
  type = 'profile',
  imageSrc,
  handleValidImageUploaded,
}) {
  const isProfile = type === 'profile';
  const classPrefix = isProfile ? 'profile-image' : 'cover-image';

  function renderPlaceholderImage() {
    if (isProfile) {
      return (
        <svg
          className="profile-image__placeholder"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    } else {
      return (
        <svg
          className="cover-image__placeholder"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    }
  }

  return (
    <div>
      <div className="field">
        <label>{type === 'profile' ? 'Profile' : 'Cover'} Photo</label>
      </div>

      <div className={isProfile ? 'container' : 'container-col'}>
        <span className={`${classPrefix}__container`}>
          {imageSrc ? (
            <Image style={{ objectFit: 'fill' }} src={imageSrc} />
          ) : (
            renderPlaceholderImage()
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
