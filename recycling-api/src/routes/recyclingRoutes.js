const express = require('express');
const addUserRecycling = require('../controllers/addUserRecycling');
const getUserRecyclingResults = require('../controllers/getUserRecyclingResults');
const getDetailUserRecyclingResults = require('../controllers/getDetailUserRecyclingResults');
const deleteUserRecycling = require('../controllers/deleteUserRecycling');
const authMiddleware = require('../middleware/authMiddleware');
const { multer } = require('../utils/multerConfig');

const router = express.Router();

router.post('/add', authMiddleware, multer.single('photo'), addUserRecycling);
router.get('/results', authMiddleware, getUserRecyclingResults);
router.get('/results/:id', authMiddleware, getDetailUserRecyclingResults);
router.delete('/delete/:id', authMiddleware, deleteUserRecycling);

module.exports = router;
