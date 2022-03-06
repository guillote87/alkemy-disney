const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path');
const personajesController = require('../../src/controllers/api/personajesApiController');
const auth = require('../../src/middlewares/auth');

let multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
      let folder = path.join(__dirname, "../public/images/personajes")
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

router.get("/characters", personajesController.list)
router.get("/characters/:id",personajesController.detail)


/* PUT edicion personaje/ */
router.put("/characters/:id", personajesController.edit)

/* DELETE elimina personaje */
router.delete("/characters/:id", personajesController.delete)

module.exports = router;