const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        projectName: {
            type: String,
            required: true,
        },
        taskCategory: {
            type: String,
            required: true,
        },
        subTask: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        taskStatus: {
            type: String,
            required: true,
        },
        completionDate: {
            type: Date,
            required: true,
        },
        assignedTo: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        startDate: {
            type: Date,
            required: true,
        },
        updatedDate: {
            type: Date,
            required: false,
        },
        taskId: {
            type: Number,
            required: false,
        },
    },
 
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
