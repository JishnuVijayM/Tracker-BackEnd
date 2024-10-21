const Task = require('../modals/task-model')
const Project = require('../modals/project-modal')
const User =require('../modals/user-model')

//get all tasks for list view
exports.getAllTasksList = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Fetch all tasks
        const taskList = await Task.find();

        // Fetch all projects
        const projects = await Project.find();

        // Filter tasks where taskId exists in the assignedTo array
        const filteredTasks = taskList.filter(task =>
            task.assignedTo.includes(taskId)
        );

        // Map project names to tasks
        const tasksWithProjectName = filteredTasks.map(task => {
            const project = projects.find(proj => proj._id.toString() === task.projectName);
            return {
                ...task.toObject(),
                projectName: project ? project.projectName : null,
            };
        });

        return res.status(200).json(tasksWithProjectName);

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

exports.createTask = async (req, res) => {
    try {
        const data = req.body;

        // Find the last saved task and get its taskId
        const lastTask = await Task.findOne().sort({ taskId: -1 }).exec();
        const lastTaskId = lastTask ? lastTask.taskId : 0;

        const taskData = {
            ...data,
            taskId: lastTaskId + 1, 
        };

        const newTask = new Task(taskData);
        await newTask.save();

        return res.status(200).json({ message: "Succesfuly to create task" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Fetch all projects
        const projects = await Project.find();

        // Find the corresponding project
        const project = projects.find(proj => proj._id.toString() === task.projectName);

        // Update the task's project name
        const updatedTask = {
            ...task.toObject(),
            projectName: project ? project.projectName : null,
        };

        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};


exports.editTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const Data = req.body;
        
        const updatedTask = await Task.findByIdAndUpdate(taskId, Data, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({message: 'Task updated successfully'})

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
}

exports.getAllTaskListForOverview = async (req, res) => {
    try {
        const taskList = await Task.find();
        const projects = await Project.find();
        const users = await User.find();

        // Map over the taskList array and extract the required properties
        const tasks = taskList.map(task => ({
            task: task.taskName,
            project: projects.find(proj => proj._id.toString() === task.projectName)?.projectName || '',
            category: task.taskCategory,
            priority: task.priority,
            status: task.taskStatus,
            date: task.completionDate,
            assignee: task.assignedTo.map(assigneeId => 
                users.find(usr => usr._id.toString() === assigneeId)?.username || ''
            ),
        }));
        
        
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
