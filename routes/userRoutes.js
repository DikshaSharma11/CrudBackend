const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Add a new user
// localhost:5000/users
// example:
// {
//     "name": "gollu",
//     "age": 26,
//     "email": "golluS@example.com",
//     "phoneNumber": "+8100654321",
//     "joindate": "2022-04-11"
// }
router.post('/', userController.addUser);

// Edit a user by id
// localhost:5000/users/644274ff392c7b9d24ae930a(put user id)
router.put('/:id', userController.editUser);

// Delete a user by email or phoneNumber
// localhost:5000/users/+8100654321(put phone no or email at the end of api)
router.delete('/:id', userController.deleteUser);

// Get all users
// localhost:5000/users
router.get('/', userController.getAllUsers);

// Get all users by joindate ascending or descending
// localhost:5000/users/joindate/dsc
// localhost:5000/users/joindate/asc
router.get('/joindate/:sortOrder', userController.getAllUsersByJoindate);

module.exports = router;
