import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span>
        Desenvolvido com <i className="fa fa-heart text-danger" /> por
        <strong>
          {" "}
          Yvan <span className="text-danger"> Matos</span>
        </strong>
      </span>
    </footer>
  );
};

export default Footer;
