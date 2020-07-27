import React, { useState } from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Heading, Container, FieldWrapper, Input, TextareaField, FieldStack, Button, Paragraph, Card } from 'bumbag';

const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = () => {
    const formData = new FormData();
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
      .then((resp) => {
        console.log(resp);
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
    setIsSending(false);
    setHasErrored(false);
  };
  const isEmailValid = emailRegex.test(email) && email !== '';

  return (
    <PageLayout title="Contact">
      <Heading use="h3">Contact</Heading>
      <Paragraph>Feel free to contact me using the below form</Paragraph>
      <Container>
        <Card standalone>
          <Card.Title>
            <Heading use="h4">Contact Me</Heading>
          </Card.Title>
          <Card.Content marginTop="0.5rem">
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
            <Button
              palette="primary"
              onClick={() => submitForm()}
              disabled={!(isEmailValid && message.length > 0) || isSending}
            >
              Submit
            </Button>
            {isSending && <Paragraph color="info">Sending...</Paragraph>}
            {hasSent && !hasErrored && <Paragraph color="success">Successfully sent!</Paragraph>}
            {!isSending && !hasSent && hasErrored && <Paragraph color="danger">An Error Occured</Paragraph>}
          </Card.Footer>
        </Card>
      </Container>
    </PageLayout>
  );
};

export default Contact;
