import React, { useEffect, useState } from "react";
import Table from "./Table";

const RecentScans = () => {
  const columns = [
    { id: "firmware_name", label: "Product name" },
    { id: "size", label: "Size (MB)" },
    { id: "hash", label: "Digest" },
    { id: "uploaded_at", label: "Uploaded At" },
  ];

  const [firmwares, setFirmwares] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/firmwares")
      .then((response) => response.json())
      .then((data) => setFirmwares(data))
      .catch((error) => console.error("Error fetching firmwares:", error));
  }, []);

  return (
    <>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Recent Scans
      </h3>

      {firmwares.length > 0 ? (
        <div className="px-4 py-3 @container">
          <Table columns={columns} data={firmwares} />
        </div>
      ) : (
        <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
          No firmware data available.
        </p>
      )}
    </>
  );
};

export default RecentScans;
