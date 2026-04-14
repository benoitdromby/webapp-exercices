const Position = require('../../models/position');

const BASE_PRICES = {
    AAPL: 187.21,
    TSLA: 241.33,
    NVDA: 901.10
};

function randomize(base, spreadPct = 0.03) {
    const factor = 1 + (Math.random() * 2 - 1) * spreadPct;
    return Math.round(base * factor * 100) / 100;
}

exports.getAll = async (req, res, next) => {
    try {
        const positions = await Position.find();
        return res.status(200).json(positions);
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.create = async (req, res, next) => {
    const temp = {};

    ({
        symbol  : temp.symbol,
        quantity: temp.quantity,
        price   : temp.price
    } = req.body);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        const position = await Position.create(temp);
        return res.status(201).json(position);
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    const temp   = {};

    ({
        symbol  : temp.symbol,
        quantity: temp.quantity,
        price   : temp.price
    } = req.body);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        const position = await Position.findByIdAndUpdate(id, temp, { new: true });

        if (position) {
            return res.status(200).json(position);
        }

        return res.status(404).json('position_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.delete = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Position.deleteOne({ _id: id });
        return res.status(200).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.getPrices = (req, res) => {
    const prices = Object.fromEntries(
        Object.entries(BASE_PRICES).map(([symbol, base]) => [symbol, randomize(base)])
    );
    return res.status(200).json(prices);
};
