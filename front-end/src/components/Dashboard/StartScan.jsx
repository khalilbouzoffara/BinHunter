import React from "react";
import { useNavigate } from "react-router-dom";

const StartScan = () => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/newscan");
  };

  return (
    <>
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          Welcome to the BinHunter Dashboard
        </p>
      </div>
      <div class="p-4 @container">
        <div class="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-[#354f64] bg-[#121a21] p-5 @[480px]:flex-row @[480px]:items-center"
          onClick={handleNavigation} 
          style={{ cursor: "pointer" }}
        >
          <div class="flex items-center gap-3 px-3 py-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-upload"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <path d="M7 9l5 -5l5 5" />
              <path d="M12 4l0 12" />
            </svg>
            <p class="text-white text-base font-bold leading-tight">
              Upload your firmware
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartScan;
