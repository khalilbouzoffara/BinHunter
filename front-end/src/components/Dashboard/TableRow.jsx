import React from "react";
import { useNavigate } from "react-router-dom";

const TableRow = ({ data, columns }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Assuming each row has a unique ID for routing
    navigate(`/item/${data.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="cursor-pointer hover:bg-gray-800"
    >
      {columns.map((item, index) => (
        <td
          key={index}
          className="px-4 py-3 text-white text-sm font-light leading-normal"
        >
          {item.id === "hash"
            ? data[item.id]?.slice(0, 10)
            : data[item.id] ?? "N/A"}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
