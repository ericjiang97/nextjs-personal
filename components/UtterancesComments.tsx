import React from 'react';

interface UtterancesCommentsProps {
  isDarkTheme?: boolean;
}

const UtterancesComments: React.FC<UtterancesCommentsProps> = ({ isDarkTheme = false }) => (
  <div
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement('script');
      scriptElem.src = 'https://utteranc.es/client.js';
      scriptElem.async = true;
      scriptElem.crossOrigin = 'anonymous';
      scriptElem.setAttribute('repo', 'ericjiang97/nextjs-personal');
      scriptElem.setAttribute('issue-term', 'pathname');
      scriptElem.setAttribute('label', 'blog-comment');
      scriptElem.setAttribute('theme', isDarkTheme ? 'dark-blue' : 'github-light');
      elem.appendChild(scriptElem);
    }}
  />
);

export default UtterancesComments;
