import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto p-4 m-6 text-white">
        <p className="text-white">
          Copyright &copy; Eric Jiang {new Date().getFullYear()}
        </p>
        <div>Social:</div>
      </div>
    </footer>
  );
};

export default Footer;
