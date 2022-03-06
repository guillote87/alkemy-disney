const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path');

const characterController = require('../controllers/characterController');
const auth = require('../middlewares/auth');

let multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
      let folder = path.join(__dirname, "../public/image/characters")
      console.log(__dirname)
      console.log(folder)
      callback(null, folder)
  },
  filename: (req, file, callback) => {
      console.log(file)
      let image = Date.now() + path.extname(file.originalname)
      console.log(image)
      callback(null, image)
  }
})

const fileUpload = multer({ storage: multerDiskStorage })

/* GET users listing. */

router.get("/characters", characterController.listCharacters)
router.get("/characters/:id",characterController.detail)


/* PUT edicion personaje/ */
router.put("/characters/:id", characterController.edit)

/* DELETE elimina personaje */
router.delete("/characters/:id", characterController.delete)

module.exports = router;