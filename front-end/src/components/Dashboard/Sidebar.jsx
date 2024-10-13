import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <div className="layout-content-container flex flex-col w-80">
    <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#121a21] p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <NavItem to="/" label="Dashboard" />
          <NavItem to="/products" label="Products" />
          <NavItem to="/findings" label="Findings" />
          <NavItem to="/help" label="Help" />
        </div>
      </div>
    </div>
  </div>
);

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-xl ${
        isActive ? "bg-[#253746]" : ""
      }`
    }
  >
    <p className="text-white text-sm font-medium leading-normal">{label}</p>
  </NavLink>
);

export default Sidebar;
