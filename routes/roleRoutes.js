// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../controls/roleController'); 

router.route('/')
    .post(roleController.createRole) // POST /api/roles
    .get(roleController.getAllRoles); // GET /api/roles

router.route('/:id')
    .get(roleController.getRoleById)      // GET /api/roles/:id
    .put(roleController.updateRole)       // PUT /api/roles/:id
    .delete(roleController.deleteRole);   // DELETE /api/roles/:id

module.exports = router;