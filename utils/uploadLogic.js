const multer = require("multer");

//defines where the images should be stored and how they should be called
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

//applys a filter to accept only image files
const fileFilter = (req, file, cb) =>
  //retrieve extension from the mymetype property and test it against the regexp to allow only certain extensions
  file.mimetype.split("/")[1].match(/^(png|jpeg|jpg)$/gi)
    ? cb(null, true)
    : //throw an error if the file does not have extension jpg, jpeg or png
      cb(new Error("please upload only jpeg/jpg/png files"), false);

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
