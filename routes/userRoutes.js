// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controls/userController'); 
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize(['Admin']),userController.createUser) // POST /api/users
    .get(protect, userController.getAllUsers); // GET /api/users

router.route('/:id')
    .get(protect, userController.getUserById)      // GET /api/users/:id
    .put(protect, authorize(['Admin']),userController.updateUser)       // PUT /api/users/:id
    .delete(protect, authorize(['Admin']),userController.deleteUser);   // DELETE /api/users/:id

module.exports = router;