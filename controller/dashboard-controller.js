const Project = require('../modals/project-modal');
const User = require('../modals/user-model');
const Task = require('../modals/task-model');

exports.getDashboard = async (req, res) => {
    try {
        const projects = await Project.find();
        const users = await User.find();
        const tasks = await Task.find();

        const inProgressTasks = tasks.filter(task => task.taskStatus === 'In Progress').length;
        const completedTasks = tasks.filter(task => task.taskStatus === 'Completed').length;
        const onHoldTasks = tasks.filter(task => task.taskStatus === 'On Hold').length;

        const cardData = [
            { name: 'Total Projects', value: projects.length, from: 'red-100', to: 'red-200', border: 'red-400' },
            { name: 'Total Employees', value: users.length, from: 'green-100', to: 'green-200', border: 'green-400' },
            { name: 'In Progress Tasks', value: inProgressTasks, from: 'yellow-100', to: 'yellow-200', border: 'yellow-400' },
            { name: 'Completed Tasks', value: completedTasks, from: 'purple-100', to: 'purple-200', border: 'purple-400' },
            { name: 'Hold Tasks', value: onHoldTasks, from: 'blue-100', to: 'blue-200', border: 'blue-300' },
        ];
        

        const taskByStatus = [
            { name: 'On Hold', value: onHoldTasks , fill : '#FF6F00' },
            { name: 'In Progress', value: inProgressTasks, fill : '#1565C0' },
            { name: 'Completed', value: completedTasks, fill : '#2E7D32' },
            { name: 'Assigned', value: tasks.filter(task => task.taskStatus === 'Assigned').length, fill : '#6A1B9A' },
            { name: 'Yet to Start', value: tasks.filter(task => task.taskStatus === 'Yet to Start').length, fill : '#FBC02D' },
        ];


        // Prepare project lookup map once outside the loop
        const projectMap = projects.reduce((map, project) => {
            map[project._id] = project.projectName;
            return map;
        }, {});

        // Calculate total days taken per project
        const totalDaysTaken = tasks.reduce((acc, task) => {
            const startDate = new Date(task.startDate);

            // Determine the end date for calculating the difference
            const endDate = task.updatedDate
                ? new Date(task.updatedDate)
                : task.completionDate
                    ? new Date(task.completionDate)
                    : new Date(); // Default to current date if both are missing

            const daysTaken = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

            // Use the project map to get the project name
            const projectName = projectMap[task.projectName];

            // Aggregate days by project name
            if (projectName) {
                acc[projectName] = (acc[projectName] || 0) + daysTaken;
            }

            return acc;
        }, {});

        // Compute the total days sum
        const totalDaysSum = Object.values(totalDaysTaken).reduce((sum, days) => sum + days, 0);

        // Convert totalDaysTaken to array of objects
        const totalDaysTakenArray = Object.entries(totalDaysTaken).map(([name, value]) => ({
            name,
            value
        }));


        const dashboardData = {
            // totalTasks: tasks.length,
            // totalProjects: totalProjects,
            // totalEmployees: totalEmployees,
            // inProgress: inProgressTasks,
            // completedTasks: completedTasks,
            cardData: cardData,
            taskByStatus: taskByStatus,
            totalDaysTaken: totalDaysTakenArray,
            totelDaysSum: totalDaysSum
        };

        return res.status(200).json(dashboardData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

