import React from "react";

const Statistics = () => (
  <>
    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
      Quick Statistics
    </h3>
    <div className="flex flex-wrap gap-4 p-4">
      <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#253746]">
        <p className="text-white text-base font-medium leading-normal">
          Total Scans
        </p>
        <p className="text-white tracking-light text-2xl font-bold leading-tight">
          1,235
        </p>
      </div>
      <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#253746]">
        <p className="text-white text-base font-medium leading-normal">
          Total Vulnerabilities
        </p>
        <p className="text-white tracking-light text-2xl font-bold leading-tight">
          2,345
        </p>
      </div>
    </div>
  </>
);

export default Statistics;
