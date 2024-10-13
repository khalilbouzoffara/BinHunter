import React from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import StartScan from "../components/Dashboard/StartScan.jsx";
import RecentScans from "../components/Dashboard/RecentScans.jsx";
import Alerts from "../components/Dashboard/Alerts.jsx";
import Footer from "../components/Footer";
import Statistics from "../components/Dashboard/Statistics.jsx";

const Dashboard = () => {
  return (
    <div class="relative flex size-full min-h-screen flex-col bg-[#121a21] dark group/design-root overflow-x-hidden">
      <div class="layout-container flex h-full grow flex-col">
        <Header />
        <div class="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <StartScan />
            <RecentScans />
            <Alerts />
            <Statistics />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
