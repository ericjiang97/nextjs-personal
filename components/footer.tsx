import React from "react";
import Icons from "../components/icons";
import SITE_CONFIG from "../config";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-4xl mx-auto pt-20 py-auto p-8 flex flex-row flex-wrap justify-around">
        <div
          className="flex-1 mx-auto py-auto flex flex-col justify-start mr-4"
          style={{ minWidth: 280 }}
        >
          <p>Copyright &copy; Eric Jiang {new Date().getFullYear()}</p>
          <p className="text-xs">
            Powered by <a href="https://zeit.co/">Zeit</a> and{" "}
            <a href="https://wordpress.org">WordPress</a>. Built in{" "}
            <a href="https://nextjs.org/">NextJS</a> with{" "}
            <a href="https://tailwindcss.com/">Tailwind CSS</a>
          </p>
        </div>
        <div className="max-w-2xl mx-auto py-auto flex flex-row items-center justify-end my-4">
          <a href={SITE_CONFIG.social.LINKEDIN}>
            <Icons.LinkedIn className="fill-current h-5 w-5 mx-2" />
          </a>
          <a href={SITE_CONFIG.social.GITHUB}>
            <Icons.GitHub className="fill-current h-5 w-5 mx-2" />
          </a>
          <a href={SITE_CONFIG.social.TWITTER}>
            <Icons.Twitter className="fill-current h-5 w-5 mx-2" />
          </a>
          <a href="mailto:hello@ericjiang.dev">
            <Icons.Gmail className="fill-current h-5 w-5 mx-2" />
          </a>
          <a href={SITE_CONFIG.social.FACEBOOK}>
            <Icons.Facebook className="fill-current h-5 w-5 mx-2" />
          </a>
          <a href={SITE_CONFIG.social.FLICKR}>
            <Icons.Flickr className="fill-current h-5 w-5 mx-2" />
          </a>
          <a href="/blog/feed.xml">
            <Icons.Rss className="fill-current h-5 w-5 mx-2" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
