import React from "react";
import logo from "../../resources/images/Logo.svg";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="header__btns">
          <div className="btn">Users</div>
          <div className="btn">Sign up</div>
        </div>
      </header>
    </>
  );
};

export default Header;
