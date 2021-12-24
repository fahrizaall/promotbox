import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="credit">&copy; {new Date().getFullYear()} PromotBox</p>
    </footer>
  );
};

export default Footer;
