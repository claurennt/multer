const express = require("express");
const router = express.Router();
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

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

router.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  if (!req.file) {
    return res.status(404).send("No file received");
  }

  res
    .status(200)
    .send(
      `<h2>Here is the picture:</h2><br/><img src="/images/${req.file.filename}" alt="profile pic"/>`
    );
});
module.exports = router;
