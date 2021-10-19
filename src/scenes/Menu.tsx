import React from "react";
import "./Menu.css";

function Menu() {
  return (
    <div className="menuContent">
      <img
        className="menuLyatomIMG"
        alt="LyatomCMS"
        src={require("../assets/images/logo/lyatomCms.png").default}
      />
      <img
        className="menuNJGConnectIMG"
        alt="NJG Connect"
        src={require("../assets/images/logo/njgconnect.png").default}
      />
    </div>
  );
}

export default Menu;
