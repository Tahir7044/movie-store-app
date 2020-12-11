import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
export default function Table({ columns, onSort, data, sortColumn }) {
  return (
    <table className='table'>
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <tbody>
        <TableBody data={data} columns={columns} />
      </tbody>
    </table>
  );
}
