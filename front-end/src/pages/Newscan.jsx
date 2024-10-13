import React from "react";
import Header from "../components/Header" ;
import Footer from "../components/Footer" ;
import Fileupload from "../components/Upload/Fileupload";


const Newscan = () => {
    return (
        <div class="relative flex size-full min-h-screen flex-col bg-[#121a21] dark group/design-root overflow-x-hidden">
          <div class="layout-container flex h-full grow flex-col">
            <Header />
            <div class="px-40 flex flex-1 justify-center py-5">
                <Fileupload />
            </div>
            <Footer />
          </div>
        </div>
      );
};

export default Newscan;