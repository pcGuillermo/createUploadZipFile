import fs from 'fs';
import archiver from 'archiver';

const pathImg = './imgs'; //ruta de los archivos
const files = fs.readdirSync(pathImg); // crea array con los nombres de los archivos

let fileToUnzip = []; // array con array a comprimir
const contFiles = Math.ceil(files.length / 20) + 1; // archivos maximos a comprimir
for (let i = 0; i < files.length; i += contFiles) {
  let pedazo = files.slice(i, i + contFiles);
  fileToUnzip.push(pedazo);
}

fileToUnzip.map((file, index) => {
  const keyIndex = index + 1;
  let output = fs.createWriteStream(`./zips/${Date.now()}.zip`); // nombre y ruta del achivo comprimido (la ruta debe existir)
  let archive = archiver('zip');
  archive.pipe(output);

  file.map((nameFile, index) => {
    archive.append(fs.createReadStream(`${pathImg}/${nameFile}`), {
      name: nameFile,
    });
  });

  archive.finalize();
  console.log(
    `zip #${keyIndex} con ${file.length} imagenes de ${fileToUnzip.length} archimos zip en total `
  );
});
