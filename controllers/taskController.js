const Task = require('../models/taskModel.js');

const createTask = async (req, res) => {
  const { name, description, status } = req.body;

  try {
    const task = await Task.create({
      user: req.user._id,
      name,
      description,
      status: status || 'PENDING'
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTasks = async (req, res) => {
  const { page = 1, keyword = '', status, date } = req.query;
  const query = { user: req.user._id };

  if (keyword) {
    query.name = { $regex: keyword, $options: 'i' };
  }

  if (status) {
    query.status = status;
  }

  if (date) {
    const today = new Date(date);
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    query.createdAt = { $gte: today, $lt: nextDay };
  }

  try {
    const options = {
      page: parseInt(page),
      limit: 10,
      sort: { createdAt: -1 }
    };
    const tasks = await Task.paginate(query, options);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  try {
    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.name = name || task.name;
    task.description = description || task.description;
    task.status = status || task.status;

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
