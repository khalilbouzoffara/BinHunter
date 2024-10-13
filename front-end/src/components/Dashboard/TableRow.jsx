import React from "react";

const TableRow = ({ data }) => (
  <tr>
    {data.map((item, index) => (
      <td
        key={index}
        className="px-4 py-3 text-white text-sm font-light leading-normal"
      >
        {item}
      </td>
    ))}
  </tr>
);

export default TableRow;
