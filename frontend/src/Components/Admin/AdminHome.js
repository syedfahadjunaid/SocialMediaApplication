import React from "react";
import AdminSideMenu from "./AdminLayout/AdminSideMenu";

import "./AdminHome.css";
import AdminNavbar from "./AdminLayout/AdminNavbar";
import { useState } from "react";

// Pages
import AdminUsers from "./AdminPages/AdminUsers";
import AdminDashboard from "./AdminPages/AdminDashboard";
import AdminSocialMediaLinks from "./AdminPages/AdminSocialMediaLinks";

export default function AdminHome() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [sideMenuSelection, setSideMenuSelection] = useState("Dashboard");
  return (
    <div className='h-screen bg-[#fff] w-full flex flex-row'>
      {showSideBar && (
        <AdminSideMenu
          sideMenuSelection={sideMenuSelection}
          setSideMenuSelection={setSideMenuSelection}
        />
      )}
      <div
        className={
          showSideBar
            ? `w-[80%] overflow-y-scroll`
            : `w-[100%] overflow-y-scroll`
        }>
        <AdminNavbar
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
          sideMenuSelection={sideMenuSelection}
        />
        <div className='pt-[4rem]'>
          {sideMenuSelection === "Dashboard" && <AdminDashboard />}
          {sideMenuSelection === "User List" && <AdminUsers />}
          {sideMenuSelection === "Social Media Links" && (
            <AdminSocialMediaLinks />
          )}
        </div>
      </div>
    </div>
  );
}
