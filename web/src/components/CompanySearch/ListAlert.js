import React, { useState } from 'react';
import { Message, Icon } from 'semantic-ui-react';

export default function ListAlert() {
  const [alert, setAlert] = useState(
    <Message icon>
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>Loading...</Message.Header>
      </Message.Content>
    </Message>
  );

  let timer = setTimeout(() => {
    setAlert(
      <Message info>
        <Message.Header>Please search again</Message.Header>
        <p>We did not found any company with that name</p>
      </Message>
    );
  }, 1000);

  return <div>{alert}</div>;
}
