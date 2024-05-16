import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SideStyle from "./SideBar.module.scss"

const navigation = [
  { name: "Login", to: "/login" },
  { name: "My Profile", to: "/my-profile" },
  { name: "Blogs", to: "/blogs" },
  { name: "NewBlog", to: "/new-blog" },
  { name: "About", to: "/about" },
  { name: "Register", to: "/register" },
];

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className={SideStyle.container}>
      <main>
        {/* <section className={SideStyle.icon}>
          <XMarkIcon width="20px" />
        </section> */}
        <section className={SideStyle.navigation}>
          {navigation.map((item) => (
            <div key={item.name}>
              <Link to={ item.to }>{ item.name }</Link> 
            </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default SideBar;
