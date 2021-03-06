import { Button, Container, Heading, Icon, InputField, Link, PageContent, Paragraph, styled } from 'bumbag';
import React from 'react';

const FloatingIcon = styled(Icon)`
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-20px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  animation: float 6s ease-in-out infinite;
`;

const ButtondownContainer = () => {
  const [email, setEmail] = React.useState('');

  const [attemptedSubmit, setAttemptedSubmit] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasErrored, setHasErrored] = React.useState(false);

  const onSubmit = () => {
    const form = new FormData();
    form.append('email', email);
    form.append('hidden', '1');

    setIsSubmitting(true);
    setAttemptedSubmit(true);

    fetch('https://buttondown.email/api/emails/embed-subscribe/ericjiang97', {
      method: 'POST',
      body: form,
    })
      .then((resp) => {
        if (resp.status === 200) {
          setHasErrored(false);
          setIsSubmitting(false);
        }
      })
      .catch(() => {
        setHasErrored(true);
        setIsSubmitting(false);
      });
  };
  return (
    <Container
      backgroundColor="primary400"
      color="white"
      minWidth="100%"
      display="flex"
      flexDirection="column"
      padding="1rem"
      paddingTop="2rem"
    >
      <PageContent>
        <Container breakpoint="max-mobile">
          <Container>
            <Heading use="h5">Like what you read? You may want to subscribe to my newsletter</Heading>
            <Paragraph marginTop="1rem">
              I also occassionally write on my newsletter, so please subscribe below.
            </Paragraph>
          </Container>
          {!attemptedSubmit && (
            <Container marginTop="1.5rem">
              <InputField
                label="Your Email"
                type="email"
                placeholder="demo@acme.xyz"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <Button onClick={() => onSubmit()} marginTop="1rem" width="100%" palette="coral">
                Submit
              </Button>
              <Container textAlign="center" marginTop="1rem">
                Powered by{' '}
                <Link href="https://buttondown.email/?utm_source=ericjiang.dev" color="secondary">
                  Buttondown
                </Link>
              </Container>
            </Container>
          )}
          {isSubmitting && (
            <Container
              paddingTop="3rem"
              paddingBottom="1rem"
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <FloatingIcon icon="solid-paper-plane" fontSize="3rem" id="plane" />
              <Heading use="h6" fontWeight="400" marginTop="1rem">
                Submitting...
              </Heading>
            </Container>
          )}
          {attemptedSubmit && !isSubmitting && !hasErrored && (
            <Container marginY="1rem">
              <Heading use="h5">Successfully Submitted!</Heading>
              <Paragraph>Now check your email to confirm your subscription!</Paragraph>
            </Container>
          )}
          {attemptedSubmit && !isSubmitting && hasErrored && (
            <Container marginY="1rem">
              <Heading use="h5">Something went wrong?</Heading>
              <Paragraph>
                Something went wrong during submission. Please try again later, if the issue persists contact me at{' '}
                <Link href="mailto:support@ericjiang.dev">support@ericjiang.dev</Link>
              </Paragraph>
            </Container>
          )}
        </Container>
      </PageContent>
    </Container>
  );
  {
    /* <form
    action=""
    method="post"
    target="popupwindow"
    onSubmit="window.open('https://buttondown.email/ericjiang97', 'popupwindow')"
    class="embeddable-buttondown-form"
  >
    <label for="bd-email">Enter your email</label>
    <input type="email" name="email" id="bd-email"></input>
    <input type="hidden" value="1" name="embed"></input>
    <input type="submit" value="Subscribe"></input>
    <p>
      <a href="https://buttondown.email" target="_blank">
        Powered by Buttondown.
      </a>
    </p>
  </form> */
  }
};

export default ButtondownContainer;
