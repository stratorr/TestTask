import React from "react";
import BlackTooltip from "../Tooltip/Tooltip";
import "./UserCard.scss";

const UserCard = ({
  slicedName,
  slicedEmail,
  fullName,
  fullEmail,
  name,
  phone,
  photo,
  position,
}) => {
  return (
    <div className="userCard">
      <div className="userCard__content">
        <img src={photo} alt="UserImage" className="content__img" />
        <BlackTooltip title={fullName}>
          <p className="headline content__name">{slicedName}</p>
        </BlackTooltip>
        <p className="headline content__position">{position}</p>
        <BlackTooltip title={fullEmail}>
          <p className="headline content__mail">{slicedEmail}</p>
        </BlackTooltip>
        <a href={`tel:${phone}`} className="content__tel">
          {phone}
        </a>
      </div>
    </div>
  );
};

export default UserCard;
