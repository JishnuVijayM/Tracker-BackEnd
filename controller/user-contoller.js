const User = require('../modals/user-model')

exports.getUser = async function(req, res) {
    try {
        const users = await User.find();

        // Map the results to only include _id and username
        const filteredUsers = users.map(user => ({
            label: user.username,
            value: user._id,
        }));

        return res.status(200).json(filteredUsers);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
