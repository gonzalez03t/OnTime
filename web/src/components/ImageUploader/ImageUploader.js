import * as nsfwjs from 'nsfwjs';
import React, { useCallback, useRef } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import useToggle from '../../hooks/useToggle';
import getUploadedImageContents, {
  classifyUploadedImage,
} from '../../utils/imageUpload';
import useStore from '../../store/store';

export default function ImageUploader({
  onValidImageUploaded,
  useButton,
  buttonLabel,
}) {
  const [loading, { on, off }] = useToggle(false);

  const imageRef = useRef(null);

  const notify = useStore((state) => state.addNotification);

  function setImageRefSrc(src) {
    imageRef.current.src = src;
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    setImageRefSrc(null);

    if (!acceptedFiles) {
      // none
    } else if (acceptedFiles.length > 1) {
      // too many files
    } else {
      // accepted
      on();

      const file = acceptedFiles[0];

      const imageProperties = await getUploadedImageContents(file);
      setImageRefSrc(imageProperties.fileContents);

      const model = await nsfwjs.load();

      const isValid = await classifyUploadedImage(imageRef, model);
      setImageRefSrc(null);

      if (isValid) {
        onValidImageUploaded(imageProperties);
      } else {
        notify('error', 'Please upload a more appropriate image');
      }

      off();
    }
  }, []);

  const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    noClick: useButton,
    noKeyboard: useButton,
    noDrag: useButton,
  });

  return (
    <div {...getRootProps()}>
      <img ref={imageRef} style={{ display: 'none' }} />

      <input {...getInputProps()} />

      {useButton ? (
        <Button size="small" loading={loading} type="button" onClick={open}>
          {buttonLabel ?? 'Upload Image'}
        </Button>
      ) : (
        <div>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </div>
  );
}
