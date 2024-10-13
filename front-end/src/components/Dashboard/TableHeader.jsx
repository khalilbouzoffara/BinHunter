import React from "react";

const TableHeader = ({ columns }) => (
  <thead>
    <tr className="bg-[#1a2732]">
      {columns.map((col) => (
        <th
          key={col.id}
          className="px-4 py-3 text-left text-white text-sm font-medium w-[400px] leading-normal"
        >
          {col.label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
