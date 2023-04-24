const User = require("../models/userModel");

exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { _id: req.params.id },
      ],
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    Object.assign(user, req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({$or: [{email: req.params.emailOrPhoneNumber}, {phoneNumber: req.params.emailOrPhoneNumber}]});
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUsersByJoinDate = async (req, res) => {
  try {
    const order = req.query.order === "desc" ? -1 : 1;
    const users = await User.find().sort({ joindate: order });
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};
