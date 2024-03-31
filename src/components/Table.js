import React from "react";

function Table({ data, onTableSort }) {
  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>
            Country Name
            <img
              onClick={onTableSort}
              width="14"
              height="14"
              src="https://img.icons8.com/ios-glyphs/30/sort.png"
              alt="sort"
            />
          </th>
          <th>Country Flag</th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row?.name?.common}</td> <td>{row?.flag}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" rowSpan="1" className="no-result">
              {data ? "No result found" : "Start searching..."}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
