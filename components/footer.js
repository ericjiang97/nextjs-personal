import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto p-5 ">
        Copyright &copy; Eric Jiang {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
