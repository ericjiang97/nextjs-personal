import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto p-5 text-white">
        <p className="text-white">
          Copyright &copy; Eric Jiang {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
