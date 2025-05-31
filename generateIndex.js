// generateIndex.js
import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Đảm bảo __dirname hoạt động trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lấy tên thư mục từ command line args
const folderName = process.argv[2];

if (!folderName) {
  console.error("❌ Vui lòng truyền tên thư mục, ví dụ: node generateIndex.js candoiketoan");
  process.exit(1);
}

const dataDir = path.join(__dirname, 'public', folderName);

async function generateIndex() {
  try {
    const files = await readdir(dataDir);
    const csvFiles = files.filter(file => file.endsWith('.csv'));

    await writeFile(
      path.join(dataDir, 'index.json'),
      JSON.stringify(csvFiles, null, 2)
    );

    console.log(`✅ Đã tạo index.json trong ${folderName} với các file CSV:`, csvFiles);
  } catch (err) {
    console.error('❌ Lỗi khi tạo index.json:', err);
  }
}

generateIndex();
