const User = require("../models/User");

exports.stats = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    res.json({ totalUsers, activeUsers });
};

exports.getUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
};
