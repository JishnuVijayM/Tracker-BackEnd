const Project = require("../modals/project-modal");

exports.getProject = async (req, res) => {
    try {
        const projects = await Project.find();

        const filteredUsers = projects.map((user) => ({
            label: user.projectName,
            value: user._id,
        }));

        res.status(200).json(filteredUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
