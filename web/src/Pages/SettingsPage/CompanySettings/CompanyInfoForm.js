import React, { useMemo, useState } from 'react';
import { Form, Input, Select } from 'semantic-ui-react';
import { getImageUrl, uploadImage } from '../../../api/image';
import okResponse from '../../../utils/okResponse';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import { countryOptions } from '../../../components/Registration/FormFields';
import { updateCompanyProfile } from '../../../api/company';
import useStore from '../../../store/store';
import useToggle from '../../../hooks/useToggle';

export default function CompanyInfoForm({ company }) {
  const notify = useStore((state) => state.addNotification);

  const [loading, { on, off }] = useToggle(false);
  const [imageProperties, setImageProperties] = useState(null);
  const [coverImageProperties, setCoverImageProperties] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(company);

  async function handleUploadImage(id, content, contentType) {
    const s3UploadRes = await uploadImage(id, content, contentType);

    if (okResponse(s3UploadRes) && s3UploadRes.data && s3UploadRes.data.Key) {
      return s3UploadRes.data.Key;
    } else {
      notify('error', 'Error uploading image');
    }
  }

  async function handleSave(e) {
    e.preventDefault();

    on();

    let profileS3Key;
    let coverS3Key;

    // so it turns out we DONT have to delete images before reuploading.
    // if an object with the same key already exists, it will be overwritten.
    if (imageProperties?.fileContents) {
      profileS3Key = await handleUploadImage(
        `${company.id}-profile`,
        imageProperties.fileContents.split(',')[1],
        imageProperties.contentType
      );
    }

    if (coverImageProperties?.fileContents) {
      coverS3Key = await handleUploadImage(
        `${company.id}-cover`,
        coverImageProperties.fileContents.split(',')[1],
        coverImageProperties.contentType
      );
    }

    const res = await updateCompanyProfile(company.id, {
      name: companyDetails.name,
      phone: companyDetails.phone,
      address: companyDetails.address,
      profileS3Key,
      coverS3Key,
    });

    if (okResponse(res)) {
      notify('success', 'Company details updated');
    } else {
      console.log(res);
      notify('error', 'Error updating company details');
    }

    off();
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
    setImageProperties(newImageSrc);
  }

  function handleValidCoverImageUploaded(newImageSrc) {
    setCoverImageProperties(newImageSrc);
  }

  const profileImage = useMemo(() => {
    if (company.imageKey) {
      return getImageUrl(company.imageKey);
    } else {
      return null;
    }
  }, [company.imageKey]);

  const coverImage = useMemo(() => {
    if (company.coverImageKey) {
      return getImageUrl(company.coverImageKey);
    } else {
      return null;
    }
  }, [company.coverImageKey]);

  return (
    <Form onSubmit={handleSave}>
      <div className="settings-form__body">
        <ImageUpload
          type="profile"
          imageSrc={imageProperties?.fileContents ?? profileImage}
          handleValidImageUploaded={handleValidProfileImageUploaded}
        />

        <ImageUpload
          type="cover"
          imageSrc={coverImageProperties?.fileContents ?? coverImage}
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
        <Form.Button primary loading={loading}>
          Save
        </Form.Button>
      </div>
    </Form>
  );
}
