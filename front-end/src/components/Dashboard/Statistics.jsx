import React from "react";

const Statistics = () => (
  <>
    <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
      Quick Statistics
    </h3>
    <div class="flex flex-wrap gap-4 p-4">
      <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#253746]">
        <p class="text-white text-base font-medium leading-normal">
          Total Scans
        </p>
        <p class="text-white tracking-light text-2xl font-bold leading-tight">
          1,235
        </p>
      </div>
      <div class="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#253746]">
        <p class="text-white text-base font-medium leading-normal">
          Total Vulnerabilities
        </p>
        <p class="text-white tracking-light text-2xl font-bold leading-tight">
          2,345
        </p>
      </div>
    </div>
  </>
);

export default Statistics;
