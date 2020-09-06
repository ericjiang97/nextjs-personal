import React, { useState } from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import {
  Heading,
  FieldWrapper,
  Input,
  TextareaField,
  FieldStack,
  Button,
  Paragraph,
  Card,
  styled,
  Image,
} from 'bumbag';
import SocialStack from '../components/SocialStack';

const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const ContactRootContainer = styled.div`
  flex: 1;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
`;

const ContactChild = styled.div`
  flex: 1;
  min-width: 280px;
`;

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('message', message);

    setIsSending(true);
    setHasSent(false);
    setHasErrored(false);
    fetch('https://formspree.io/xbjzqpbd', {
      body: formData,
      method: 'POST',
      // DO NOT REDIRECT
      redirect: 'manual',
    })
      .then(() => {
        resetData();
        setHasSent(true);
      })
      .catch((err) => {
        console.error(err);
        setHasSent(false);
        setIsSending(false);
        setHasErrored(true);
      });
  };

  const resetData = () => {
    setEmail('');
    setMessage('');
    setName('');
    setSurname('');
    setIsSending(false);
    setHasErrored(false);
  };
  const isEmailValid = emailRegex.test(email) && email !== '';

  return (
    <PageLayout title="Contact" pageMeta={{ description: 'Feel free to contact me', endpoint: '/contact' }}>
      <ContactRootContainer>
        <ContactChild>
          <Heading use="h3">Let's Connect</Heading>
          <Paragraph>
            I love to hear from you! Whether its about your career, projects or anything awesome, feel free to contact
            me :)
          </Paragraph>
          <Card standalone flex={1}>
            <Card.Content marginTop="0.5rem">
              <FieldStack orientation="horizontal" marginBottom="0.75rem">
                <FieldWrapper
                  label="First Name"
                  isRequired
                  state={name.length > 0 ? 'success' : 'danger'}
                  validationText={name.length > 0 ? 'All good! :)' : 'Please enter your name'}
                >
                  <Input name="name" onChange={(e: any) => setName(e.target.value)} value={name} />
                </FieldWrapper>
                <FieldWrapper
                  label="Last Name"
                  isRequired
                  state={surname.length > 0 ? 'success' : 'danger'}
                  validationText={surname.length > 0 ? 'All good! :)' : 'Please enter your surname'}
                >
                  <Input name="surname" onChange={(e: any) => setSurname(e.target.value)} value={surname} />
                </FieldWrapper>
              </FieldStack>
              <FieldStack>
                <FieldWrapper
                  label="Email"
                  isRequired
                  state={email.length > 0 && isEmailValid ? 'success' : 'danger'}
                  validationText={email.length > 0 && isEmailValid ? 'All good! :)' : 'Email is invalid!'}
                >
                  <Input type="Email" name="Email" onChange={(e: any) => setEmail(e.target.value)} value={email} />
                </FieldWrapper>
                <TextareaField
                  label="Message"
                  isRequired
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                />
              </FieldStack>
            </Card.Content>
            <Card.Footer>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  palette="primary"
                  onClick={() => submitForm()}
                  disabled={!(isEmailValid && message.length > 0) || isSending}
                >
                  Submit
                </Button>
              </div>
              {isSending && <Paragraph color="info">Sending...</Paragraph>}
              {hasSent && !hasErrored && <Paragraph color="success">Successfully sent!</Paragraph>}
              {!isSending && !hasSent && hasErrored && <Paragraph color="danger">An Error Occured</Paragraph>}
            </Card.Footer>
            <hr />
            <SocialStack />
          </Card>
        </ContactChild>
        <ContactChild
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0.5rem',
          }}
        >
          <Image src="/images/undraw_wilderness.svg" minWidth="280px" width="100%" />
        </ContactChild>
      </ContactRootContainer>
    </PageLayout>
  );
};

export default Contact;
