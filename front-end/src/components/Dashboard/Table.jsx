import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ columns, rows }) => (
  <div className="flex overflow-hidden rounded-xl border border-[#354f64] bg-[#121a21]">
    <table className="flex-1">
      <TableHeader columns={columns} />
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index} data={row} />
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
