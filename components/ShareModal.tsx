import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import ReactModal from 'react-modal';
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

interface SharePostModal {
  slug: string;
  title: string;
}

const ShareModal: React.FC<SharePostModal> = ({ slug, title }) => {
  const [open, setOpen] = useState(false);

  const postUrl = `https://ericjiang.dev/blog/${slug}`;

  return (
    <>
      <button
        className="bg-transparent border border-brand hover:bg-brand text-gray-500 hover:text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          setOpen(true);
        }}
      >
        Share Post
      </button>
      <ReactModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={{
          overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '0.25rem 1.25rem',
          },
          content: {
            position: 'initial',
            border: 'none',
            background: '#fff',
            // overflow: "auto",
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: 0,
            height: '30%',
            display: 'flex',
          },
        }}
      >
        <div className="container p-4 flex justify-center flex-col bg-background text-on-surface flex-1">
          <h2 className="text-center text-lg font-semibold">Share</h2>
          <h3 className="text-center text-sm mb-2">{title}</h3>
          <hr className="mb-2" />
          <div className="container my-2 flex justify-around">
            <EmailShareButton url={postUrl}>
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
            <TwitterShareButton
              url={postUrl}
              title={`${title} by Eric Jiang!`}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={postUrl}
              title={`${title} by Eric Jiang!`}
              source={'https://ericjiang.dev'}
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <FacebookShareButton url={postUrl}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
          <div className="container my-2 flex justify-around align-center">
            <input
              className="appearance-none block w-full bg-background text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white flex-1"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              value={postUrl}
            ></input>
            <CopyToClipboard text={postUrl}>
              <button className="bg-brand hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Icons.Copy className="fill-current h-5 w-5 mx-2" />
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default ShareModal;
