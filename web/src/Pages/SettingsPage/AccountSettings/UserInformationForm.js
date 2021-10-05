import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import shallow from 'zustand/shallow';
import { updateUserProfile } from '../../../api/user';
import ProfileImageUpload from '../../../components/ProfileImageUpload/ProfileImageUpload';
import useStore from '../../../store/store';

export default function UserInformationForm() {
  const { userImage, user } = useStore(
    (state) => ({
      userImage: state.getUserImage(),
      user: state.user,
    }),
    shallow
  );

  const [imageSrc, setImageSrc] = useState(null);
  const [userDetails, setUserDetails] = useState(user);

  console.log(userDetails);

  async function handleSave(e) {
    alert('TODO');

    let imageUrl;

    if (imageSrc) {
      // TODO: store in image storage solution
      // TODO: once stored, obtain imageUrl
      // TODO: add new imageUrl to payload;
    }

    const res = await updateUserProfile({ ...userDetails, imageUrl });

    console.log(res);

    // TODO: notify user if successful save.
    // TODO: if successful save, update store
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
            name="firstName"
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
