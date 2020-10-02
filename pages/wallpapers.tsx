import React from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Image, Heading, Paragraph, Text, Container, Tag, Link } from 'bumbag';
import wallpapers from '../data/wallpapers';

export default function Wallpapers() {
  return (
    <PageLayout title="Wallpapers" pageMeta={{ description: '404: Droids Not found' }}>
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
      <Container display="flex" flexWrap="wrap" justifyContent="flex-start" marginTop="1.5rem">
        {wallpapers.map((wallpaperGroup, groupIndex) => {
          return (
            <Container flex={1} minWidth="280px" maxWidth="45%" marginX={0} key={groupIndex}>
              <Heading use="h4" fontWeight="400" marginY="0.75rem">
                {wallpaperGroup.title}
              </Heading>
              <Image
                src={wallpaperGroup.previewUrl}
                alt={`${wallpaperGroup.title} preview`}
                width="100%"
                marginY="0.5rem"
              />
              <Container width="100%" display="flex" flexWrap="wrap">
                {wallpaperGroup.wallpapers.map((wallpaper, wallpaperIndex) => {
                  const { title, meta, resolution, downloadUrl } = wallpaper;
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
                      <Link href={downloadUrl} fontSize="100">
                        Download
                      </Link>
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
