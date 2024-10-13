import React from "react";
import Table from "./Table";

const columns = [
  { id: "scanId", label: "Product name" },
  { id: "created", label: "Findings" },
  { id: "severity", label: "Severity" },
  { id: "scanned", label: "Scanned" },
  { id: "duration", label: "Product created" },
  { id: "status", label: "Status" },
];



const rows = [
  ["firwmare1.bin","1899" ,"10/15/20", "2024-10-11","2024-10-11", "Completed"],
  ["firwmare2.zip", "2000","10/15/20", "2024-10-11","2024-10-10", "Failed"],
  // Add more rows as needed
];

const RecentScans = () => (
  <>
    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
      Recent Scans
    </h3>
    <div className="px-4 py-3 @container">
      <Table columns={columns} rows={rows} />
    </div>
  </>
);

export default RecentScans;
