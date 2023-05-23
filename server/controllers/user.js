const User = require('../models/User');

module.exports.getUsers = async (req, res) => {

    try {

        const users = await User.find();

        return res.json(users);

    } catch (error) {
        res.json({ message: "Internal Error", error })
    }


}

exports.createUser = async (req, res) => {

    try {
        const { name, email, username, password } = req.body

        const user = new User({
            name,
            email,
            username,
            password
        })

        const newUser = await user.save()


        return res.json({ message: "user Added", newUser });

    } catch (error) {
        res.json({ message: "Internal Error", error })
    }


}

exports.getUser = async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.params.id })
        return res.send(user);

    } catch (error) {
        res.json({ message: "Internal Error", error })
    }

}

exports.deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        return res.json({ message: "user Deleted", user })
    }

    catch (error) {
        res.json({ message: "Internal Error", error })
    }
}

exports.updateUser = async (req, res) => {

    try {

        const { name, email, username, password } = req.body

        const user = await User.findOne({ _id: req.params.id })
        user.name = name;
        user.email = email;
        user.username = username;
        user.password = password;

        const newUser = await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true });

        return res.json({ message: "user Updated", newUser })

    } catch (error) {
        res.json({ message: "Internal Error", error })
    }
}