import React from "react";
import EmojiObjectsTwoToneIcon from "@material-ui/icons/EmojiObjectsTwoTone";

import "./FeatureCard.scss";

const FeatureCard = ({ color, content, title, imageUrl, alt }) => {
  return (
    <div className="FeatureCard" style={{ borderColor: color }}>
      <EmojiObjectsTwoToneIcon
        className="FeatureCard-image"
        style={{ fontSize: "63px", color }}
      />
      <h2 className="FeatureCard-title" style={{ color }}>
        {title}
      </h2>
      <p className="FeatureCard-content">{content}</p>
    </div>
  );
};

export default FeatureCard;
