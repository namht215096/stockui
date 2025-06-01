import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Closetable = ({ folder }) => {
  const [csvFiles, setCsvFiles] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [rowsByFile, setRowsByFile] = useState({});
  const [sortConfig, setSortConfig] = useState({ headerIndex: null, direction: null });

  useEffect(() => {
    if (!folder) return;
    fetch(`/${folder}/index.json`)
      .then((res) => res.json())
      .then((files) => setCsvFiles(files));
  }, [folder]);

  useEffect(() => {
    if (!csvFiles.length || !folder) return;

    const fetchAll = async () => {
      const dataMap = {};
      let firstHeader = [];

      for (const file of csvFiles) {
        const response = await fetch(`/${folder}/${file}`);
        const text = await response.text();
        const parsed = Papa.parse(text, { skipEmptyLines: true });

        const [headerRow, firstDataRow] = parsed.data;
        if (firstHeader.length === 0) {
          firstHeader = headerRow;
          setHeaders(firstHeader);
        }

        dataMap[file.replace('.csv', '')] = firstDataRow;
      }

      setRowsByFile(dataMap);
    };

    fetchAll();
  }, [csvFiles, folder]);

  // Hàm sắp xếp theo cột (theo headerIndex)
  const handleSortByColumn = (headerIndex) => {
    setSortConfig((prev) => {
      if (prev.headerIndex === headerIndex) {
        if (prev.direction === 'desc') return { headerIndex, direction: 'asc' };
        if (prev.direction === 'asc') return { headerIndex: null, direction: null };
        return { headerIndex, direction: 'desc' };
      }
      return { headerIndex, direction: 'desc' };
    });
  };

  // Sắp xếp danh sách file theo giá trị tại headerIndex
  const fileKeys = Object.keys(rowsByFile);
  let sortedFileKeys = [...fileKeys];

  if (sortConfig.headerIndex !== null && sortConfig.direction) {
    sortedFileKeys.sort((a, b) => {
      const valA = parseFloat(rowsByFile[a]?.[sortConfig.headerIndex] ?? '0');
      const valB = parseFloat(rowsByFile[b]?.[sortConfig.headerIndex] ?? '0');

      if (isNaN(valA) || isNaN(valB)) return 0;
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
    });
  }

  return (
    <div className="p-4 overflow-auto text-xs">
       <table className="table-auto border-collapse border text-sm w-full">
        <thead>
            <tr>
            <th className="border px-2 py-1 bg-gray-100">Tên File</th>
            {headers.map((header, i) => (
                <th
                key={i}
                onClick={() => handleSortByColumn(i)}
                className="border px-2 py-1 bg-gray-100 cursor-pointer whitespace-nowrap"
                >
                {header}
                {sortConfig.headerIndex === i && (
                    <span className="ml-1 text-xs">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                )}
                </th>
            ))}
            </tr>
        </thead>
        <tbody>
            {sortedFileKeys.map((fileKey) => (
            <tr key={fileKey} className="odd:bg-white even:bg-gray-50">
                <td className="border px-2 py-1 font-medium sticky left-0 bg-white whitespace-nowrap">
                {fileKey}
                </td>
                {headers.map((_, i) => (
                <td key={i} className="border px-2 py-1 text-right whitespace-pre-line">
                    {rowsByFile[fileKey]?.[i] ?? ''}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>

    </div>
  );
};

export default Closetable;
