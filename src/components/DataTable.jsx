import React from 'react';

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <div className="overflow-auto max-h-screen mt-4">
      <table className="min-w-full border text-sm text-left">
        <thead>
          <tr>
            {data[0].map((header, i) => (
              <th key={i} className="border px-2 py-1 bg-gray-100">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border px-2 py-1">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
