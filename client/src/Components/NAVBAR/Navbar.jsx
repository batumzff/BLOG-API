import React, { useState } from "react";
import logo from "../../assets/logo-2.png";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import SideBar from "../SIDEBAR/SideBar";
import { useSelector } from "react-redux";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import NavbarStyle from "./Navbar.module.scss"

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { logout, login } = useAuthCalls();
  const [sidebar, setSidebar] = useState(false);

  return (
    <header>
      <nav>
        <section className={NavbarStyle.logo}>
        <Link to="/"><img src={logo} alt="logo" width="150px"  /></Link>  
          <span>Illuminate Your Thoughts</span>
        </section>
        <section>
          <main className={NavbarStyle.links}>
            <Link to="/blogs">
              Blogs
            </Link>
            <Link to="/categories">
              Categories
            </Link>
            <Link to="/about">
              About
            </Link>
            <Link to="/contact">
              Contact
            </Link>
            {/* <Link to=""></Link> */}
          </main>
        </section>
        <section className={NavbarStyle.avatar}>
          <div onClick={() => setSidebar((prev) => !prev)}>
            <Avatar size="50" src="" round=".8rem" />
          </div>

{/*         
          <Link to={user ? "my-profile" : "/"}>
            <li>My Profile</li>
          </Link>
          <Link to={!token ? "/login" : ""}>
            <li onClick={() => (token ? logout() : login())}>
              {token ? "Log out" : " Log in"}
            </li>
          </Link>
          {!token && (
            <Link to="/register">
              <li>Register</li>
            </Link>
          )} */}
        </section>
      </nav>
      {sidebar && (
            <div className={NavbarStyle.sidebar}>
              <SideBar />
            </div>
          )}
    </header>
  );
};

export default Navbar;
