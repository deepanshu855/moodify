const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

const uploadFile = async ({ buffer, fileName, folder = "" }) => {
  const file = await client.files.upload({
    file: await ImageKit.toFile(Buffer.from(buffer)),
    fileName,
    folder,
  });

  return file;
};

module.exports = {
  uploadFile,
};
