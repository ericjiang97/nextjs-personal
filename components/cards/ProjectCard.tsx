import React from 'react';
import { Project } from '../../types';
import { Card, Heading, Image, Text, Container, Set } from 'bumbag';
import LinkButton from '../LinkButton';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { url, imageUrl, name, description, screenshotUrl, repoUrl, technologies } = project;
  return (
    <Card standalone>
      {screenshotUrl && <Image width="100%" src={screenshotUrl} alt={name} />}
      <Card.Header justifyContent="unset">
        {imageUrl && <Image src={imageUrl} height="2rem" marginRight="0.5rem" />}
        <Heading use="h4">{name}</Heading>
      </Card.Header>
      <Card.Content>
        <Text>{description}</Text>
        <Heading use="h5">Technologies Used</Heading>
        <Container>
          {technologies && (
            <Container display="flex">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <a
                    href={tech.url || undefined}
                    key={index}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={tech.name}
                    style={{ marginLeft: '0.4rem', marginRight: '0.4rem' }}
                  >
                    {tech.icon ? <Icon style={{ height: '1rem' }} alt={tech.name} /> : tech.name}
                  </a>
                );
              })}
            </Container>
          )}
        </Container>
        <Card.Footer>
          <Set>
            <LinkButton href={url}>Product Url</LinkButton>
            {repoUrl && <LinkButton href={repoUrl}>Source Code</LinkButton>}
          </Set>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
};

export default ProjectCard;
