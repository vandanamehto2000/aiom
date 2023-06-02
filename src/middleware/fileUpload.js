const multer = require("multer");
//multer for file upload
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  let upload = multer({ storage: storage });
  const uploadVideo = upload.fields([{ name: 'source', maxCount: 1 }, { name: 'thumb', maxCount: 1 }]);
  const uploadImage = upload.single("hasImage");
  module.exports = { uploadVideo, uploadImage }