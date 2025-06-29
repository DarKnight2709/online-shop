import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Admin/SideBar/SideBar";

export default function AdminRoot() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "250px", backgroundColor: "#f8f9fa" }}>
        <Sidebar />
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
