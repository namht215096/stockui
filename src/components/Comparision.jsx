import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Comparison = ({ folder = 'data' }) => {
  const [csvFiles, setCsvFiles] = useState([]);
  const [allData, setAllData] = useState({});
  const [quarters, setQuarters] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ label: null, direction: null });

  useEffect(() => {
    fetch(`/${folder}/index.json`)
      .then(res => res.json())
      .then(files => setCsvFiles(files))
      .catch(() => setCsvFiles([]));
  }, [folder]);

  useEffect(() => {
    if (csvFiles.length === 0) return;

    Promise.all(
      csvFiles.map(file =>
        fetch(`/${folder}/${file}`)
          .then(res => res.text())
          .then(text => {
            const parsed = Papa.parse(text, { skipEmptyLines: true });
            const rows = parsed.data;

            const quarterRow = rows[0].slice(3);
            const labels = rows.slice(6).map(row => row[0]);
            const values = rows.slice(6).map(row => row.slice(3));

            return {
              code: file.replace('.csv', ''),
              quarters: quarterRow,
              labels,
              values,
            };
          })
      )
    ).then(results => {
      const qSet = new Set();
      const dataMap = {};

      results.forEach(({ code, quarters, labels, values }) => {
        quarters.forEach(q => qSet.add(q));
        quarters.forEach((q, i) => {
          if (!dataMap[q]) dataMap[q] = {};
          dataMap[q][code] = {};
          labels.forEach((label, j) => {
            dataMap[q][code][label] = values[j]?.[i] ?? '';
          });
        });
      });

      const sortedQuarters = Array.from(qSet).sort((a, b) => ('' + b).localeCompare(a));
      setAllData(dataMap);
      setQuarters(sortedQuarters);
      setSelectedQuarter(sortedQuarters[0]);
      setLoading(false);
    });
  }, [csvFiles]);

  const handleSortByRow = (label) => {
    setSortConfig(prev => {
      if (prev.label === label) {
        if (prev.direction === 'desc') return { label, direction: 'asc' };
        if (prev.direction === 'asc') return { label: null, direction: null }; // clear sort
        return { label, direction: 'desc' };
      }
      return { label, direction: 'desc' };
    });
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (!selectedQuarter) return <div>Không có dữ liệu quý nào để hiển thị</div>;

  const codes = Object.keys(allData[selectedQuarter] || {});
  const labels = Object.keys(allData[selectedQuarter]?.[codes[0]] || {});

  let sortedCodes = [...codes];
  if (sortConfig.label && sortConfig.direction) {
    sortedCodes.sort((a, b) => {
      const valA = parseFloat(allData[selectedQuarter][a][sortConfig.label] || '0');
      const valB = parseFloat(allData[selectedQuarter][b][sortConfig.label] || '0');

      if (isNaN(valA) || isNaN(valB)) return 0;
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
    });
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-medium">Chọn quý:</label>
        <select
          value={selectedQuarter}
          onChange={(e) => setSelectedQuarter(e.target.value)}
          className="border rounded p-2"
        >
          {quarters.map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>

      <div className="overflow-auto max-h-[75vh] border rounded">
        <table className="min-w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 sticky left-0 bg-gray-100 z-10">Chỉ tiêu</th>
              {sortedCodes.map(code => (
                <th key={code} className="border px-3 py-2 text-center">{code}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, rowIndex) => (
              <tr
                key={rowIndex}
                className="odd:bg-white even:bg-gray-50 cursor-pointer"
                onClick={() => handleSortByRow(label)}
              >
                <td className="border px-3 py-2 sticky left-0 bg-white font-medium whitespace-pre-line max-w-xs">
                  {label}
                  {sortConfig.label === label && (
                    <span className="ml-2 text-xs">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </td>
                {sortedCodes.map(code => (
                  <td key={code} className="border px-3 py-2 text-right">
                    {allData[selectedQuarter]?.[code]?.[label] ?? '-'}
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

export default Comparison;
