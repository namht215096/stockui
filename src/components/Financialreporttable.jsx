import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const FinancialReportTable = ({ csvPath }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!csvPath) return;

    fetch(csvPath)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        const filtered = parsed.data.map(row => ({
          Symbol: row.Symbol,
          CompanyName: row.CompanyName,
          Year: row.Year,
          Quarter: row.Quarter,
          Content: row.Content,
          LinkFile: row.LinkFile,
        }));
        setData(filtered);
      });
  }, [csvPath]);

  return (
    <div className="p-4 overflow-auto">
      <table className="table-auto border-collapse border min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Mã</th>
            <th className="border px-4 py-2">Tên công ty</th>
            <th className="border px-4 py-2">Năm</th>
            <th className="border px-4 py-2">Quý</th>
            <th className="border px-4 py-2">Nội dung</th>
            <th className="border px-4 py-2">Tệp đính kèm</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              <td className="border px-4 py-2">{row.Symbol}</td>
              <td className="border px-4 py-2">{row.CompanyName}</td>
              <td className="border px-4 py-2 text-center">{row.Year}</td>
              <td className="border px-4 py-2 text-center">{row.Quarter}</td>
              <td className="border px-4 py-2">{row.Content}</td>
              <td className="border px-4 py-2 text-blue-600 underline text-center">
                <a href={`https://cafef1.mediacdn.vn/${row.LinkFile}`} target="_blank" rel="noopener noreferrer">
                  Tải xuống
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReportTable;
