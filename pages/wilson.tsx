import { Container, Heading, Image } from 'bumbag';
import HeroBase from '../components/core/HeroBase';
import PageLayout from '../containers/layouts/PageLayout';

const Wilson = () => {
  return (
    <PageLayout
      title="Hello Wilson"
      banner={
        <HeroBase backgroundVariant="color" backgroundColor="primary600">
          <Container breakpoint="desktop">
            <Heading>Hello Wilson</Heading>
            <Image
              width="100%"
              src="https://media-exp1.licdn.com/dms/image/C5603AQHbiO77Tv-JVQ/profile-displayphoto-shrink_200_200/0/1598670201624?e=1617840000&v=beta&t=3bK_Lh6oDa7Zvd9NB6-jrHUmA6q8SKFMmZK3Dum38fw"
            />
          </Container>
        </HeroBase>
      }
      pageMeta={{
        endpoint: '/wilson',
      }}
    ></PageLayout>
  );
};

export default Wilson;
