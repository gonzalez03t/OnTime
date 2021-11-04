import React, { useState } from 'react';
import { Form, Input, Select } from 'semantic-ui-react';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import { countryOptions } from '../../../components/Registration/FormFields';

export default function CompanyInfoForm({ company }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [coverImageSrc, setCoverImageSrc] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(company);

  console.log(companyDetails);

  function handleSave(e) {
    e.preventDefault();

    alert('TODO: persist changes to DB');
  }

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
            name="name"
            label="Name"
            value={companyDetails?.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            label="Phone"
            name="phone"
            type="tel"
            value={companyDetails?.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Field
            width="8"
            control={Select}
            label="Country"
            name="country"
            value={companyDetails?.address.country}
            options={countryOptions}
            search
            onChange={handleAddressChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Field
            width="12"
            control={Input}
            label="Street address"
            name="street"
            value={companyDetails?.address.street}
            onChange={handleAddressChange}
          />

          <Form.Field
            width="4"
            control={Input}
            label="Unit / Suite"
            name="unit"
            value={companyDetails?.address.unit}
            onChange={handleAddressChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="City"
            name="city"
            value={companyDetails?.address.city}
            onChange={handleAddressChange}
          />

          <Form.Field
            control={Input}
            label="State / Province"
            name="stateProvince"
            value={companyDetails?.address.stateProvince}
            onChange={handleAddressChange}
          />

          <Form.Field
            control={Input}
            label="Postal Code"
            name="postalCode"
            value={companyDetails?.address.postalCode}
            onChange={handleAddressChange}
          />
        </Form.Group>
      </div>
      <div className="settings-form__actions">
        <Form.Button primary>Save</Form.Button>
      </div>
    </Form>
  );
}
