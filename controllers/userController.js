const User = require('../models/userModel');
const mongoose = require('mongoose');

// Add a new user
exports.addUser = function(req, res) {
  const newUser = new User(req.body);
  newUser.save()
  .then(function(result) {
    console.log(result);
    res.send("User Added")
  })
  .catch(function(err) {
    console.error(err);
  });                                 
};

// Edit a user by id
exports.editUser = async function(req, res) {
  const ObjectId = require('mongoose').Types.ObjectId;
  const query = { _id: new ObjectId(req.params.id) };
  const data = await User.findOne(query);
  console.log('Response:', data);
  res.json(data);
}

// Delete a user by email or phoneNumber
exports.deleteUser = async function(req, res) {
  const data = await User.findOneAndDelete({$or: [{email: req.params.id}, {phoneNumber: req.params.id}]});
  res.json(data)
};

// Get all users
exports.getAllUsers = async function(req, res) {
  const data = await User.find({});
  console.log(data);
  res.json(data)
};

// Get all users by joindate ascending or descending
exports.getAllUsersByJoindate = async function(req, res) {
  const sortOrder = req.params.sortOrder === 'asc' ? 1 : -1;
  const data = await User.find({}, null, {sort: {joindate: sortOrder}});
  console.log(data);
  res.json(data);
};
