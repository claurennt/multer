const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  return file.mimetype.split("/")[1].match(/^(png|jpeg|jpg)$/gi)
    ? cb(null, true)
    : //throw an error if the mimetype is not an image, i.e. does not have extension jpg, jpeg or png
      cb(new Error("please upload only jpeg/jpg/png files"), false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
