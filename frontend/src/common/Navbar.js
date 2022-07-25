import React from "react";
import "../assets/css.css";
import { CgNotes } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="container">
      <CgNotes className="logo-icon"/>
      <h1 className="logo"> NOTES</h1>
    </div>
  );
};

export default Navbar;
