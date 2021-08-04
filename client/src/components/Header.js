import React from "react";
import { Navbar,NavbarBrand } from "reactstrap";

const Header = ()=>{
  return (
    <Navbar color="primary" className="mb-4" dark>
      <NavbarBrand href="/">Movie list</NavbarBrand>
    </Navbar>
  )
}

export default Header;