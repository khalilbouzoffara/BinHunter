import React from "react";

const Alerts = () => (
  <>
    <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
      Real-time Vulnerability Alerts
    </h3>
    <div class="flex items-center gap-4 bg-[#121a21] px-4 min-h-[72px] py-2">
      <div
        class="text-white flex items-center justify-center rounded-lg bg-[#253746] shrink-0 size-12"
        data-icon="ShieldCheck"
        data-size="24px"
        data-weight="regular"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-urgent"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
          <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
          <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
        </svg>
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-white text-base font-medium leading-normal line-clamp-1">
          Critical
        </p>
        <p class="text-[#94b0c7] text-sm font-normal leading-normal line-clamp-2">
          CVE-2021-2020
        </p>
      </div>
    </div>

    <div class="flex items-center gap-4 bg-[#121a21] px-4 min-h-[72px] py-2">
      <div
        class="text-white flex items-center justify-center rounded-lg bg-[#253746] shrink-0 size-12"
        data-icon="ShieldCheck"
        data-size="24px"
        data-weight="regular"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-urgent"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 16v-4a4 4 0 0 1 8 0v4" />
          <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
          <path d="M6 16m0 1a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
        </svg>
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-white text-base font-medium leading-normal line-clamp-1">
          High
        </p>
        <p class="text-[#94b0c7] text-sm font-normal leading-normal line-clamp-2">
          CVE-2021-2019
        </p>
      </div>
    </div>
  </>
);

export default Alerts;
