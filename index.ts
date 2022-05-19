import fs from 'fs';
const src = process.argv[2];

const getFiles = (path: string, collectedFiles?: string[]) => {
  const files = fs.readdirSync(path);
  
  let filesArray = collectedFiles || [];

  files.forEach(fileName => {
    const filePath = path + '/' + fileName;
    if(fs.statSync(filePath).isDirectory()) {
      filesArray = getFiles(filePath, filesArray);
    } else {
      filesArray.push(filePath);
    }
  })

  return filesArray;
}

const files = getFiles('src')
const source = files.find(fileName => fileName.includes(src));

if (source) {
  console.log('###', source);
  require('./' + source);
} else {
  console.error('File not found... ', src);
}