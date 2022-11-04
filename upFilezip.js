import fetch from 'node-fetch';
import fs from 'fs';

const pathImg = './zips'; //ruta de los archivos
const files = fs.readdirSync(pathImg);

const COMMERCE_CLOUD_WEBDAV = {
  host: '<host>',
  username: '<user>',
  password: '<password>',
};

const uploadFile = async ({ fileName, file }) => {
  const auth =
    'Basic ' +
    new Buffer.from(
      COMMERCE_CLOUD_WEBDAV.username + ':' + COMMERCE_CLOUD_WEBDAV.password
    ).toString('base64');

  const url = `${COMMERCE_CLOUD_WEBDAV.host}/${fileName}`;

  const request = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      Authorization: auth,
    },
  });
  return request.ok;
};

files.map(async (file, index) => {
  if (file.split('.')[1] === 'zip') {
    console.log(file);
    let zip = fs.readFileSync(
      `./zips/${file}`
    );
    try {
      await uploadFile({
        fileName: file,
        file: zip,
      });
    } catch (error) {
      console.log(error);
    }
  }
});
