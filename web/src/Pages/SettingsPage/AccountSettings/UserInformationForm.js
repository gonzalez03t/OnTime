import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import shallow from 'zustand/shallow';
import { updateUserProfile } from '../../../api/user';
import { uploadImage, deleteImage } from '../../../api/image';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import useStore from '../../../store/store';
import okResponse from '../../../utils/okResponse';
import useToggle from '../../../hooks/useToggle';
import moment from 'moment';

export default function UserInformationForm() {
  const { userImage, user, updateDetails } = useStore(
    (state) => ({
      userImage: state.getUserImage(),
      user: state.user,
      updateDetails: state.setUserDetails,
    }),
    shallow
  );

  const notify = useStore((state) => state.addNotification);

  const [imageProperties, setImageProperties] = useState(null);
  const [userDetails, setUserDetails] = useState(user);
  const [loading, { on, off }] = useToggle(false);

  function isSame() {
    return (
      user.firstName === userDetails.firstName &&
      user.lastName === userDetails.lastName &&
      user.email === userDetails.email &&
      user.phone === userDetails.phone &&
      user.dob === userDetails.dob
    );
  }

  async function handleSave(e) {
    if (isSame() && !imageProperties) {
      notify('info', 'No changes were made.');
    }

    on();

    let s3Key;

    if (imageProperties) {
      // delete existing image from bucket
      if (user.image) {
        console.log(await deleteImage(user.image.key));
      }

      // store image in bucket
      const s3UploadRes = await uploadImage(
        `${user.id}-profile`,
        imageProperties.fileContents.split(',')[1],
        imageProperties.contentType
      );

      if (okResponse(s3UploadRes)) {
        const { key } = s3UploadRes.data;

        s3Key = key;
      } else {
        console.log(s3UploadRes);
        alert('RUH ROH');
        off();
        return;
      }
    }

    const res = await updateUserProfile({ ...userDetails, s3Key });

    off();

    if (res?.status === 200 && res.data) {
      updateDetails(res.data.user);
      notify('success', 'User details updated.');
    } else {
      console.log(res);
      notify('error', 'Failed to update user details.');
    }
  }

  function handleChange(e, { name, value }) {
    setUserDetails((curr) => {
      return { ...curr, [name]: value };
    });
  }

  function handleValidImageUploaded(newImageProperties) {
    console.log('in handler');
    setImageProperties(newImageProperties);
  }

  return (
    <Form onSubmit={handleSave}>
      <div className="settings-form__body">
        <ImageUpload
          imageSrc={imageProperties?.fileContents ?? userImage}
          handleValidImageUploaded={handleValidImageUploaded}
        />

        <Form.Group widths="equal">
          <Form.Input
            name="firstName"
            label="First name"
            defaultValue={user.firstName}
            onChange={handleChange}
          />
          <Form.Input
            name="lastName"
            label="Last name"
            defaultValue={user.lastName}
            onChange={handleChange}
          />
          <Form.Input
            // width="10"
            type="date"
            name="dob"
            label="Date of Birth"
            defaultValue={moment(user.dob).format('YYYY-MM-DD')}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            width="10"
            name="email"
            label="Email address"
            defaultValue={user.email}
            onChange={handleChange}
          />
          <Form.Input
            width="6"
            name="phone"
            label="Phone number"
            defaultValue={user.phone}
            onChange={handleChange}
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
