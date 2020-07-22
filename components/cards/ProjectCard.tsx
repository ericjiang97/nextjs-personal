import React from 'react';
import { Project } from '../../types';
import { Card, Heading, Image, Text, Container, Button, Set } from 'bumbag';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { url, imageUrl, name, description, screenshotUrl, repoUrl, technologies } = project;
  return (
    <Card standalone>
      {screenshotUrl && (
        <div className="flex-1 flex items-center">
          <Image width="100%" src={screenshotUrl} alt={name} />
        </div>
      )}
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
                  >
                    <div className="text-sm text-gray-900 flex-1 mx-2" key={index}>
                      {tech.icon ? <Icon className="h-12" alt={tech.name} /> : tech.name}
                    </div>
                  </a>
                );
              })}
            </Container>
          )}
        </Container>
        <Card.Footer>
          <Set>
            <Button use="a" href={url}>
              Product Url
            </Button>
            <Button use="a" href={repoUrl}>
              Source Code
            </Button>
          </Set>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
};

export default ProjectCard;
