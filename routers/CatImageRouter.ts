import express, { Router } from 'express';
import CatImageController from '../controllers/CatImageController';
import multer from 'multer';
// import { authorize, authorizeAccount } from '../utils/auth';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const router = Router();
const catImageController = new CatImageController();

router.post('/cats', upload.single('image'), catImageController.uploadImage);
router.get('/cats/:id', catImageController.getById);
router.get('/cats', catImageController.getAll);
router.put('/cats/:id', upload.single('image'), catImageController.updateImage);
router.delete('/cats/:id', catImageController.deleteImage);

export default router;
