import React, { useState } from "react";

import ReactModal from "react-modal";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

import { Post } from "../types/wordpress_api";

const ShareModal: React.FC<{ post: Post }> = ({ post }) => {
  const [open, setOpen] = useState(false);

  const postUrl = `https://ericjiang.dev/blog/${post.slug}`;

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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            padding: "0.25rem 1.25rem",
          },
          content: {
            position: "initial",
            border: "none",
            background: "#fff",
            // overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: 0,
            height: "30%",
            display: "flex",
          },
        }}
      >
        <div className="container p-4 flex justify-center flex-col bg-background text-on-surface flex-1">
          <h2 className="text-center text-lg font-semibold">Share</h2>
          <h3 className="text-center text-sm mb-2">{post.title.rendered}</h3>
          <hr className="mb-2" />
          <div className="container my-2 flex justify-around">
            <EmailShareButton url={postUrl}>
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
            <TwitterShareButton
              url={postUrl}
              title={`${post.title.rendered} by Eric Jiang!`}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton
              url={postUrl}
              title={`${post.title.rendered} by Eric Jiang!`}
              summary={`${post.uagb_excerpt}`}
              source={`https://ericjiang.dev`}
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <FacebookShareButton url={postUrl}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default ShareModal;
