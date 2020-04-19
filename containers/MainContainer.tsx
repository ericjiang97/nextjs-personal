import React from 'react';

const MainContainer: React.FC = ({ children }) => {
  return <div className="max-w-4xl mx-auto py-auto pb-2 flex flex-row justify-around">{children}</div>;
};

export default MainContainer;
