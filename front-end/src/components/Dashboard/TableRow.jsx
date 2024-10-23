import React from "react";

const TableRow = ({ data, columns }) => (
  <tr>
    {columns.map((item, index) => (
      <td
        key={index}
        className="px-4 py-3 text-white text-sm font-light leading-normal"
      >
        {item.id === 'hash' ? data[item.id]?.slice(0, 10) : data[item.id] ?? 'N/A'}
      </td>
    ))}
  </tr>
);

export default TableRow;
