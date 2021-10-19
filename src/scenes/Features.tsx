import React from "react";
import "./Features.css";
import featuresJson from "../data/features.json";

function Features() {
  return (
    <div className="features">
      <div className="titleInfoFeatures">
        <h3>{featuresJson.title}</h3>
        <h4>{featuresJson.subtile}</h4>
      </div>
      <div className="contentFeatures">
        {featuresJson.features.map((el, index) => {
          return (
            <div className="contentCardFeatures" key={index}>
              <img
                className="imgCardFeatures"
                src={
                  el.icon
                    ? require("../assets/images/features/" + el.icon).default
                    : undefined
                }
                style={{
                  backgroundColor: el.iconColor ? el.iconColor : "grey",
                }}
                alt="iconFeature"
              />
              <p className="titleCardFeatures">{el.title}</p>
              <p>{el.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
