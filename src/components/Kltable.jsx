import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Kltable = ({ folder }) => {
  const [csvFiles, setCsvFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [data, setData] = useState([]);

  // Lấy danh sách file từ index.json
  useEffect(() => {
    if (!folder) return;

    fetch(`/${folder}/index.json`)
      .then((res) => res.json())
      .then((files) => {
        setCsvFiles(files);
        if (files.length > 0) setSelectedFile(files[0]);
      });
  }, [folder]);

  // Tải và parse nội dung file CSV
  useEffect(() => {
    if (!selectedFile || !folder) return;

    fetch(`/${folder}/${selectedFile}`)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { skipEmptyLines: true });
        setData(parsed.data.slice(1)); // Bỏ qua dòng đầu tiên

      });
  }, [selectedFile, folder]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-semibold">Chọn mã chứng khoán</label>
        <select
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {csvFiles.map((file) => (
            <option key={file} value={file}>
              {file.replace('.csv', '')}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-bold mb-2">Thông tin khối lượng giao dịch</h2>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 font-semibold">Tiêu đề</th>
              <th className="border px-4 py-2 font-semibold">Giá trị</th>
            </tr>
          </thead>
          <tbody>
            {data.map(([label, value], index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2 whitespace-pre-line">{label}</td>
                <td className="border px-4 py-2 whitespace-pre-line">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kltable;
