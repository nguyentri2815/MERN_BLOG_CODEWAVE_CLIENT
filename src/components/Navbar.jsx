import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import { useStore } from "../store";

const Navbar = () => {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const { user, setUser, sighOut } = useStore();
  console.log("user", user);

  return (
    <nav className="text-white">
      <div className="flex items-center justify-between py-3 flex-col md:flex-row space-y-3 md:space-y-0">
        <ul className="flex items-center gap-2">
          <li>
            <FaFacebook />
          </li>
          <li>
            <FaGithub />
          </li>
        </ul>
        <h1 className="text-4xl lg:text-5xl font-bold text-white">
          <Link to={"/"}>
            Blog<span className="text-red-500">MERN</span>
          </Link>
        </h1>
        {!showMenuMobile && (
          <div
            className="cursor-pointer block md:hidden"
            onClick={() => setShowMenuMobile(!showMenuMobile)}
          >
            <FaBars />
          </div>
        )}

        <ul
          className={`items-center gap-3 flex-col md:flex-row ${
            showMenuMobile ? "flex" : "hidden"
          } md:flex`}
        >
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>Contact</Link>
          </li>
          <li>
            <Link to={"/"}>About</Link>
          </li>
          <li
            onClick={() => setShowMenuMobile(!showMenuMobile)}
            className="cursor-pointer md:hidden"
          >
            <IoMdClose />
          </li>
        </ul>
        <div>
          <ThemeSwitch />
        </div>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          {user?.name && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user?.image}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{user?.name}</span>
            </div>
          )}
          {user?.name && (
            <button className="p-1 bg-red-500 rounded-md" onClick={sighOut}>
              Logout
            </button>
          )}
          {!user?.name && (
            <Link to={'/sign-in'}>
              <button className="p-1 bg-red-500 rounded-md" onClick={setUser}>
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
