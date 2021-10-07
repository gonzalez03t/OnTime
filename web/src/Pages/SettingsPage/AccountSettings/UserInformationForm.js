import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import shallow from 'zustand/shallow';
import { updateUserProfile } from '../../../api/user';
import ProfileImageUpload from '../../../components/ProfileImageUpload/ProfileImageUpload';
import useStore from '../../../store/store';

export default function UserInformationForm() {
  const { userImage, user, updateDetails } = useStore(
    (state) => ({
      userImage: state.getUserImage(),
      user: state.user,
      updateDetails: state.setUserDetails,
    }),
    shallow
  );

  const [imageSrc, setImageSrc] = useState(null);
  const [userDetails, setUserDetails] = useState(user);

  function isSame() {
    return (
      user.firstName === userDetails.firstName &&
      user.lastName === userDetails.lastName &&
      user.email === userDetails.email &&
      user.phone === userDetails.phone
    );
  }

  async function handleSave(e) {
    if (isSame() && !imageSrc) {
      alert('NO CHANGES');
      return;
    }

    let imageUrl;

    if (imageSrc) {
      // TODO: store in image storage solution
      // TODO: once stored, obtain imageUrl
      // TODO: add new imageUrl to payload;
    }

    const res = await updateUserProfile({ ...userDetails, imageUrl });

    if (res?.status === 200 && res.data) {
      updateDetails(res.data.user);
      alert('PROFILE UPDATED');
    } else {
      console.log(res);
      alert('RUH ROH');
    }
  }

  function handleChange(e, { name, value }) {
    setUserDetails((curr) => {
      return { ...curr, [name]: value };
    });
  }

  function handleValidImageUploaded(newImageSrc) {
    console.log('in handler');
    setImageSrc(newImageSrc);
  }

  return (
    <Form onSubmit={handleSave}>
      <div className="settings-form__body">
        <ProfileImageUpload
          imageSrc={imageSrc ?? userImage}
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
        <Form.Button primary>Save</Form.Button>
      </div>
    </Form>
  );
}
