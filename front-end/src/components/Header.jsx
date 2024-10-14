import React from "react";

const Header = () => (
  <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#253746] px-10 py-3">
    <div className="flex items-center gap-4 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-brackets"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 4h-3v16h3" />
        <path d="M16 4h3v16h-3" />
      </svg>

      <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
        <span className="text-blue-400">Bin</span>
        <span className="text-white">Hunter</span>
      </h2>
    </div>
    <div className="flex flex-1 justify-end gap-8">
      <div className="flex items-center gap-9">
        <a className="text-white text-sm font-medium leading-normal" href="#">
          Help
        </a>
        <a className="text-white text-sm font-medium leading-normal" href="#">
          Notifications
        </a>
        <a className="text-white text-sm font-medium leading-normal" href="#">
          Settings
        </a>
        <a className="text-white text-sm font-medium leading-normal" href="#">
          Logout
        </a>
      </div>
    </div>
  </header>
);

export default Header;
