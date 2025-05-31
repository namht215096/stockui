// runAllIndexes.js
import { exec } from 'child_process';

const folders = [
  'candoiketoan', 
  'kqkinhdoanh', 
  'luanchuyentien',
  'Kldd',
  'volumeadd'
];

folders.forEach(folder => {
  exec(`node generateIndex.js ${folder}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Lỗi với ${folder}:`, error.message);
      return;
    }
    if (stderr) {
      console.error(`⚠️  stderr từ ${folder}:`, stderr);
      return;
    }
    console.log(stdout);
  });
});
