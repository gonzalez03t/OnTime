import React, { useState } from 'react';
import { Form, Input } from 'semantic-ui-react';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';

export default function CompanyInfoForm({ company }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(company);

  function handleSave() {}

  function handleChange(e, { name, value }) {
    setCompanyDetails((curr) => {
      return { ...curr, [name]: value };
    });
  }

  function handleAddressChange(e, { name, value }) {
    setCompanyDetails((curr) => ({
      ...curr,
      address: {
        ...curr.address,
        [name]: value,
      },
    }));
  }

  function handleValidProfileImageUploaded(newImageSrc) {
    setImageSrc(newImageSrc);
  }

  function handleValidCoverImageUploaded(newImageSrc) {
    setCoverImageSrc(newImageSrc);
  }

  return (
    <Form onSubmit={handleSave}>
      <div className="settings-form__body">
        <ImageUpload
          type="profile"
          imageSrc={imageSrc ?? companyDetails?.image}
          handleValidImageUploaded={handleValidProfileImageUploaded}
        />

        <ImageUpload
          type="cover"
          imageSrc={coverImageSrc ?? companyDetails?.coverImage}
          handleValidImageUploaded={handleValidCoverImageUploaded}
        />

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Name"
            value={companyDetails?.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            label="Phone"
            type="tel"
            value={companyDetails?.phone}
            onChange={handleChange}
          />
        </Form.Group>
      </div>
      <div className="settings-form__actions">
        <Form.Button primary>Save</Form.Button>
      </div>
    </Form>
  );
}
