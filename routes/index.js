const express = require("express");
const router = express.Router();
const upload = require("../utils/uploadLogic");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

router.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send("No file received");
  }
  const { filename } = file;
  return res
    .status(200)
    .send(
      `<h2>Here is the picture:</h2><br/><img src="/images/${filename}" alt="profile pic"/>`
    );
});

router.post("/upload-cat-pics", upload.array("cat_pics"), (req, res) => {
  const { files } = req;

  if (!files.length) {
    return res.status(400).send("No files received");
  }

  let htmlResult = ``;
  let index = 1;

  files.forEach((file) => {
    const { filename } = file;
    htmlResult += `<p>#${index} of your cat picture uploads:</p><img src="/images/${filename}" />`;
    index++;
  });
  return res.status(200).send(htmlResult);
});

module.exports = router;
