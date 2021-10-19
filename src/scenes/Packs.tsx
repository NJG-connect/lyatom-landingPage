import React from "react";
import packsJson from "../data/packs.json";
import "./Packs.css";

function Packs() {
  return (
    <div className="pack">
      <div className="titleInfoPacks">
        <h3>{packsJson.title}</h3>
        <h4>{packsJson.subtile}</h4>
      </div>
      <div className="contentPacks">
        {packsJson.offer.map((el, index) => {
          return (
            <div className="contentCardPack" key={index}>
              <img
                className="imgCardPack"
                src={
                  el.image
                    ? require("../assets/images/packs/" + el.image).default
                    : undefined
                }
                alt="iconPack"
              />
              <div className="cardInfoPack">
                <p className="infoCardPack">{el.description}</p>
                <p className="priceCardPack">{el.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Packs;
