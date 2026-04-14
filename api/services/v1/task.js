const Task = require('../../models/task');

exports.getAll = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ order: 1 });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.create = async (req, res) => {
    const temp = {};

    ({
        title : temp.title,
        status: temp.status,
        order : temp.order
    } = req.body);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        const task = await Task.create(temp);
        return res.status(201).json(task);
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const temp   = {};

    ({
        title : temp.title,
        status: temp.status,
        order : temp.order
    } = req.body);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        const task = await Task.findByIdAndUpdate(id, temp, { new: true });

        if (task) {
            return res.status(200).json(task);
        }

        return res.status(404).json('task_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};
