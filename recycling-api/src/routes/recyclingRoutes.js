const express = require('express');
const { addRecycling, getUserRecyclingResults, getDetailUserRecyclingResults, deleteUserRecycling } = require('../controllers/recyclingController');
const authMiddleware = require('../middleware/authMiddleware');
const { multer } = require('../utils/multerConfig');

const router = express.Router();

router.post('/add', authMiddleware, multer.single('photo'), addRecycling);
router.get('/results', authMiddleware, getUserRecyclingResults);
router.get('/results/:id', authMiddleware, getDetailUserRecyclingResults);
router.delete('/delete/:id', authMiddleware, deleteUserRecycling);

module.exports = router;
