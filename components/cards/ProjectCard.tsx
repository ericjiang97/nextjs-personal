import { Box, Card, Heading, Image, Link, Text } from 'bumbag';
import React from 'react';
import { Project } from '../../types';
import LinkButton from '../buttons/LinkButton';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { url, imageUrl, name, description, screenshotUrl, repoUrl } = project;
  return (
    <Card standalone maxWidth="300px" display="flex" flexDirection="column">
      {screenshotUrl && (
        <Box display="flex" width="100%" justifyContent="center" paddingX="0.5rem">
          <Image src={screenshotUrl} alt={name} maxHeight="300px" alignSelf="center" />
        </Box>
      )}
      <Card.Header justifyContent="unset">
        {imageUrl && <Image src={imageUrl} height="2rem" marginRight="0.5rem" />}
        <Heading use="h4">{name}</Heading>
      </Card.Header>
      <Card.Content flex="1">
        <Text>{description}</Text>
      </Card.Content>
      <Card.Footer>
        <Box display="flex" flexDirection="column">
          <LinkButton href={url}>Product Url</LinkButton>
          {repoUrl && (
            <Link href={repoUrl} color="primary300">
              Check out the code
            </Link>
          )}
        </Box>
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
