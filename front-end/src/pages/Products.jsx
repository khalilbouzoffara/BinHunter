import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Dashboard/Sidebar";
import RecentScans from "../components/Dashboard/RecentScans";


const Products = () => {
  return (
    <div class="relative flex size-full min-h-screen flex-col bg-[#121a21] dark group/design-root overflow-x-hidden">
      <div class="layout-container flex h-full grow flex-col">
        <Header />
        <div class="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <RecentScans />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
