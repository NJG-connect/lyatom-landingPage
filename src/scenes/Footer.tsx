import React from "react";
import "./Footer.css";
import footerJson from "../data/footer.json";

function Footer() {
  return (
    <footer>
      <img
        className="iconFooter"
        alt="LyatomCMS"
        src={
          footerJson.logo
            ? require("../assets/images/logo/" + footerJson.logo).default
            : undefined
        }
      />
      <p className="textFooter">{footerJson.info}</p>
    </footer>
  );
}

export default Footer;
