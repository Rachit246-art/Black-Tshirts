const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'public');

function compressImage(filePath) {
  if (filePath.endsWith('.tmp')) return;
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    const tempFilePath = filePath + '.tmp2';
    
    fs.copyFileSync(filePath, tempFilePath);
    
    let pipeline = sharp(tempFilePath).resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
    });

    if (ext === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
    } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: 80 });
    } else {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    }

    pipeline.toFile(filePath, (err, info) => {
      try { fs.unlinkSync(tempFilePath); } catch(e) {}
    });
  }
}

function processDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) return;
    
    files.forEach(file => {
      const fullPath = path.join(directory, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) return;
        if (stats.isDirectory()) {
          processDirectory(fullPath);
        } else {
          compressImage(fullPath);
        }
      });
    });
  });
}

processDirectory(directoryPath);
