import { join } from 'node:path';
import { readdir } from 'node:fs/promises';

const testFiles = [];
const testDir = join(__dirname);

(async () => {
  try {
    const files = await readdir(testDir);
    
    files.forEach(function (file) {
      if (file.match(/\.test\.ts$/)) {
        testFiles.push(import(join(testDir, file)));
      }
    });

    await Promise.all(testFiles);
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
  }
})();
