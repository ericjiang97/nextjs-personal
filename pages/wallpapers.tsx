import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Image, Heading, Paragraph, Text, Container, Tag, Link } from 'bumbag';
import wallpapers from '../data/wallpapers';
import LinkButton from '../components/buttons/LinkButton';

export default function Wallpapers() {
  const anchorProps = Link.useProps({ fontSize: '100' });
  return (
    <PageLayout
      title="Wallpapers"
      pageMeta={{
        description:
          'Some of my photos edited and optimised as wallpapers, optimised for Mac & Other Displays. Includes support for 4K, 5K & 6K displays, in addition to P3 color profiles for more vibrant colors.',
      }}
    >
      <Heading use="h3">Wallpapers</Heading>
      <Paragraph marginY="1.25rem">
        Some of my photos edited and optimised as wallpapers, optimised for Mac & Other Displays. Includes support for{' '}
        <Tag palette="secondary" variant="tint" marginX="0.15rem">
          4K, 5K & 6K
        </Tag>
        displays, in addition to{' '}
        <Tag palette="primary" variant="tint" marginX="0.15rem">
          P3
        </Tag>{' '}
        color profiles for more vibrant colors.
      </Paragraph>
      <Paragraph marginY="1.25rem">
        Like the wallpapers? Please consider donating to help compensate for my time and also that I can continue making
        these awesome wallpapers.
        <LinkButton href="paypal.me/lorderikir" iconBefore="brand-paypal">
          Donate via Paypal
        </LinkButton>
      </Paragraph>
      <Container display="flex" flexWrap="wrap" justifyContent="flex-start" marginTop="1.5rem">
        {wallpapers.map((wallpaperGroup, groupIndex) => {
          const { wallpapers, slug, wallpaperSlug } = wallpaperGroup;
          return (
            <Container flex={1} minWidth="280px" maxWidth="45%" marginX={0} key={groupIndex}>
              <Heading use="h4" fontWeight="400" marginY="0.75rem">
                {wallpaperGroup.title}
              </Heading>
              <Image
                src={`/downloads/wallpapers/${slug}/preview.webp`}
                alt={`${wallpaperGroup.title} preview`}
                width="100%"
                marginY="0.5rem"
              />
              <Container width="100%" display="flex" flexWrap="wrap">
                {wallpapers.map((wallpaper, wallpaperIndex) => {
                  const { title, meta, resolution, screenType } = wallpaper;
                  const downloadUrl = `/downloads/wallpapers/${slug}/${wallpaperSlug}_${screenType}_${meta.colorType}_${resolution}.jpg`;
                  const { colorType, hdRes } = meta;
                  return (
                    <div key={wallpaperIndex} style={{ marginRight: '1.5rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Heading use="h6">{title}</Heading>
                        {colorType === 'P3' && (
                          <Tag palette="primary" variant="tint" marginX="0.15rem">
                            P3
                          </Tag>
                        )}
                        {hdRes && (
                          <Tag palette="secondary" variant="tint" marginX="0.15rem">
                            {hdRes}
                          </Tag>
                        )}
                      </div>
                      <Container>
                        <Text fontSize="100">{resolution}</Text>
                      </Container>
                      <a href={downloadUrl} {...anchorProps} download>
                        Download
                      </a>
                    </div>
                  );
                })}
              </Container>
            </Container>
          );
        })}
      </Container>
    </PageLayout>
  );
}
