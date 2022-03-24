const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join("image"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 3000);
    const splittedFormat = file.mimetype.split("/");
    const extension = splittedFormat[splittedFormat.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage });

module.exports = upload;
