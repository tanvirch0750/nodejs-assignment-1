const express = require('express');
const userControllers = require('../controllers/user.controller.js');
const router = express.Router();

router.get('/all', userControllers.getAllUser);
router.get('/singleUser/:id', userControllers.getSingleUser);
router.get('/random', userControllers.getRandomData);
router.post('/save', userControllers.createUser);
router.delete('/delete/:id', userControllers.deleteUserData);
router.patch('/update/:id', userControllers.updateUserData);
router.patch('/bulk-update', userControllers.bulkUpdate);

module.exports = router;
