const express = require("express");
const router = express.Router();

const taskController = require("../controller/task-controller");

router.route("/createTask").post(taskController.createTask);

//all task list for table
router.route("/fetchTaskList/:id").get(taskController.getAllTasksList);

//get task for edit
router.route("/getTask/:id").get(taskController.getTask)

router.route("/editTask/:id").post(taskController.editTask)

//for overview
router.route("/getAllTasksForOverview").get(taskController.getAllTaskListForOverview)

module.exports = router;
