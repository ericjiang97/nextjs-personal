import React, { useState } from 'react';
import PageLayout from '../containers/layouts/PageLayout';
import { Image, Heading, Paragraph, Container, Tag, Link, Input, Icon, Tooltip } from 'bumbag';
import _wallpapers, { WallpaperGroup } from '../data/wallpapers';
import LinkButton from '../components/buttons/LinkButton';
import { wallpaperSearch } from '../utils/search';

export default function Wallpapers() {
  const [wallpapers, setWallpapers] = useState<WallpaperGroup[]>(_wallpapers);

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
      </Paragraph>
      <LinkButton href="paypal.me/lorderikir" iconBefore="brand-paypal">
        Donate via Paypal
      </LinkButton>
      <Container marginY="0.75rem">
        <Input
          placeholder="Search for a wallpaper"
          before={<Input.Icon icon="solid-search" />}
          onChange={(e) => {
            setWallpapers(wallpaperSearch(e.currentTarget.value, _wallpapers));
          }}
        />
      </Container>
      <Container display="flex" flexWrap="wrap" justifyContent="flex-start" marginTop="1.5rem">
        {wallpapers.map((wallpaperGroup, groupIndex) => {
          const { wallpapers, slug, wallpaperSlug, tags } = wallpaperGroup;
          return (
            <Container flex={1} minWidth="280px" maxWidth="45%" marginX={0} key={groupIndex}>
              <Heading use="h4" fontWeight="400" marginY="0.75rem">
                {wallpaperGroup.title}
              </Heading>
              {tags && (
                <Container marginY="0.5rem">
                  {tags.map((tag, i) => {
                    return (
                      <Tag palette="success" variant="tint" marginX="0.15rem" key={i}>
                        {tag}
                      </Tag>
                    );
                  })}
                </Container>
              )}
              <Image
                src={`/downloads/wallpapers/${slug}/preview.webp`}
                alt={`${wallpaperGroup.title} preview`}
                width="100%"
                marginY="0.5rem"
              />
              <Container width="100%" display="flex" flexWrap="wrap">
                {wallpapers.map((group, wallpaperIndex) => {
                  const { groupName, colorSpace } = group;
                  return (
                    <div
                      key={wallpaperIndex}
                      style={{ marginRight: '1.5rem', marginBottom: '0.75rem', minWidth: 140, flex: 1 }}
                    >
                      <Heading use="h6" fontWeight="normal" fontSize="2001">
                        {groupName}
                      </Heading>
                      <Heading use="h7" fontWeight="normal" fontSize="100">{`${colorSpace} Color Space`}</Heading>
                      <Container marginTop="0.5rem" display="flex" flexWrap="wrap">
                        {group.wallpapers
                          .sort((a, b) => {
                            const aHeight = a.resolution.split('x')[1];
                            const bHeight = b.resolution.split('x')[1];
                            return Number(aHeight) - Number(bHeight);
                          })
                          .map((w, i) => {
                            const { resolution, screenType, title } = w;
                            const downloadUrl = `/downloads/wallpapers/${slug}/${wallpaperSlug}_${screenType}_${colorSpace}_${resolution}.jpg`;

                            if (w.screenType === 'MacBookPro') {
                              return (
                                <Tooltip content={`${w.title} - ${w.resolution}`} marginRight="1rem" placement="bottom">
                                  <Link href={downloadUrl} key={i}>
                                    <Icon aria-label="macbookPro" icon="macbookPro" fontSize="400" />
                                  </Link>
                                </Tooltip>
                              );
                            }
                            if (w.screenType === 'iMacPro') {
                              return (
                                <Tooltip content={`${w.title} - ${w.resolution}`} marginRight="1rem" placement="bottom">
                                  <Link href={downloadUrl} key={i}>
                                    <Icon aria-label="imacPro" icon="imacPro" fontSize="400" />
                                  </Link>
                                </Tooltip>
                              );
                            }
                            if (w.screenType === 'XDR') {
                              return (
                                <Tooltip content={`${w.title} - ${w.resolution}`} marginRight="1rem" placement="bottom">
                                  <Link href={downloadUrl} key={i}>
                                    <Icon aria-label="xdr" icon="xdr" fontSize="400" />
                                  </Link>
                                </Tooltip>
                              );
                            }
                            return (
                              <Tooltip
                                content={`${w.title} - ${w.resolution}`}
                                placement="bottom"
                                marginRight="0.6rem"
                                key={i}
                              >
                                <Link href={downloadUrl}>{title}</Link>
                              </Tooltip>
                            );
                          })}
                      </Container>
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
