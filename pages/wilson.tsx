import { Container, Heading } from 'bumbag';
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
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/XUYdGEb1C1M?autoplay=1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
