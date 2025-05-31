import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const VolumeAdditional = ({ folder }) => {
  const [csvFiles, setCsvFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!folder) return;

    fetch(`/${folder}/index.json`)
      .then((res) => res.json())
      .then((files) => {
        setCsvFiles(files);
        if (files.length > 0) setSelectedFile(files[0]);
      });
  }, [folder]);

  useEffect(() => {
    if (!selectedFile || !folder) return;

    fetch(`/${folder}/${selectedFile}`)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        setRows(parsed.data);
      });
  }, [selectedFile, folder]);

  const formatLink = (link) => {
    if (!link) return '#';
    return `https://cafef.vn${link}`;
  };

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

      <h2 className="text-xl font-bold mb-2">Danh sách sự kiện VolumeAdditionalEvents</h2>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 font-semibold">Thời gian</th>
              <th className="border px-4 py-2 font-semibold">Sự kiện</th>
              <th className="border px-4 py-2 font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{row['Time']}</td>
                <td className="border px-4 py-2">{row['Event']}</td>
                <td className="border px-4 py-2">
                  <a
                    href={formatLink(row['Link'])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Xem
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolumeAdditional;
