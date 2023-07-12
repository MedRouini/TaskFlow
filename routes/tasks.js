const express = require('express');
const router = express.Router();

const {getAllTasks,createTask,getSingleTask,updateTask,deletTask,editTask} = require('../controllers/tasks')
router.route('/').get(getAllTasks).post(createTask)
//
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deletTask)//.put(editTask);
module.exports = router