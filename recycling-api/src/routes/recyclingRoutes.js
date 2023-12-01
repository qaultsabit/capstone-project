const express = require('express');
const { addRecycling, getUserRecyclingResults, getDetailUserRecyclingResults } = require('../controllers/recyclingController');
const authMiddleware = require('../middleware/authMiddleware');
const { multer } = require('../utils/multerConfig');

const router = express.Router();

router.post('/recycling', authMiddleware, multer.single('photo'), addRecycling);
router.get('/results', authMiddleware, getUserRecyclingResults);
router.get('/results/:id', authMiddleware, getDetailUserRecyclingResults);

module.exports = router;
