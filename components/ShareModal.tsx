import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

import Icons from '../components/icons';
import { Modal, Button, Card, Heading, Container } from 'bumbag';

interface SharePostModal {
  slug: string;
  title: string;
}

const ShareModal: React.FC<SharePostModal> = ({ slug, title }) => {
  const modal = Modal.useState();

  const postUrl = `https://ericjiang.dev/blog/${slug}`;

  return (
    <>
      <Modal.Disclosure use={Button} {...modal} palette="primary">
        Share Post
      </Modal.Disclosure>
      <Modal {...modal}>
        <Card>
          <Container>
            <Heading use="h4" textAlign="center">
              Share Article
            </Heading>
            <Heading use="h5" textAlign="center">
              {title}
            </Heading>
            <Container display="flex" alignItems="center" justifyContent="space-evenly">
              <EmailShareButton url={postUrl}>
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
              <TwitterShareButton url={postUrl} title={`${title} by Eric Jiang!`}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <LinkedinShareButton url={postUrl} title={`${title} by Eric Jiang!`} source={'https://ericjiang.dev'}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
              <FacebookShareButton url={postUrl}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <CopyToClipboard text={postUrl}>
                <Button palette="primary">
                  <Icons.Copy className="fill-current h-5 w-5 mx-2" />
                </Button>
              </CopyToClipboard>
            </Container>
          </Container>
        </Card>
      </Modal>
    </>
  );
};

export default ShareModal;
