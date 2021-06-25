const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null,  'public/uploads/')
    },
    limits: {
        files: 5,
        fileSize: 1024*1024
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    },
    onFileUploadStart: function (file) {
        console.log("Inside uploads");
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'|| file.mimetype == 'video/*'|| file.mimetype == 'message/rfc822'|| file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||file.mimetype == 'text/csv') {
            return true;
        }
        else {
            return false;
        }
    }
});

var upload = multer({ //multer settings
    storage: storage,
    limits: { fileSize: 5*1024 * 1024 },
    fileFilter: function ( req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext != '.png' && ext != '.jpg'  && ext != '.jpeg') {
            return callback(new Error('Only png, jpeg, jpg, files are allowed'))
          
        }
        callback(null, true)
    },
});

var imageUpload = upload.fields([{ name: 'media', maxCount: 5 }]);
module.exports = {imageUpload};