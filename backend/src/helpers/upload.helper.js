const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploaded files
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  }
});

// Multer instance
const upload = multer({ storage: storage });

// Express route handler to handle file upload
function uploadFile(req, res) {
  // 'file' should match the name attribute of the file input field in your HTML form
  upload.single('file')(req, res, function (err) {
    if (err) {
      // Handle any error that occurred during file upload
      console.error(err);
      return res.status(500).send('An error occurred during file upload.');
    }
    
    // File uploaded successfully
    const fileName = req.file.filename;
    res.send({fileName:fileName});
  });
}

module.exports = uploadFile;
