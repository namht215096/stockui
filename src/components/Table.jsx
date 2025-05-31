import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Table = ({ folder }) => {
  const [csvFiles, setCsvFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [data, setData] = useState([]);

  // Tải danh sách file từ index.json trong thư mục tương ứng
  useEffect(() => {
    if (!folder) return;

    fetch(`/${folder}/index.json`)
      .then((res) => res.json())
      .then((files) => {
        setCsvFiles(files);
        if (files.length > 0) setSelectedFile(files[0]);
      });
  }, [folder]);

  // Tải nội dung file CSV khi file được chọn
  useEffect(() => {
    if (!selectedFile || !folder) return;

    fetch(`/${folder}/${selectedFile}`)
      .then((response) => response.text())
      .then((text) => {
        const parsed = Papa.parse(text, { skipEmptyLines: false });
        setData(parsed.data);
      });
  }, [selectedFile, folder]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-medium">Chọn file:</label>
        <select
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
          className="border rounded p-2"
        >
          {csvFiles.map((file) => (
            <option key={file} value={file}>
              {file.replace('.csv', '')}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto max-h-[75vh] border rounded">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            {data.length > 0 && (
              <tr>
                {data[0].map((header, i) => (
                  <th key={i} className="border px-3 py-2 bg-gray-100 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border px-3 py-2 whitespace-pre-line">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
