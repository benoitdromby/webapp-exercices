const Order = require('../../models/order');

function pickRandom(arr, n) {
    return arr
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, n);
}

exports.getOrderbook = async (req, res) => {
    try {
        const orders = await Order.find();

        const bids = pickRandom(orders.filter(o => o.side === 'bid'), 5)
            .sort((a, b) => b.price - a.price)
            .map(o => ({ id: o._id, price: o.price, size: o.size }));

        const asks = pickRandom(orders.filter(o => o.side === 'ask'), 5)
            .sort((a, b) => a.price - b.price)
            .map(o => ({ id: o._id, price: o.price, size: o.size }));

        return res.status(200).json({ bids, asks });
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.getUpdates = async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders.length) {
            return res.status(200).json([]);
        }

        const count   = Math.floor(Math.random() * 20) + 1;
        const updates = [];

        for (let i = 0; i < count; i++) {
            const base  = orders[Math.floor(Math.random() * orders.length)];
            const delta = (Math.random() * 2 - 1) * 0.5;

            updates.push({
                id   : base._id,
                price: Math.round((base.price + delta) * 100) / 100,
                size : Math.round((Math.random() * 4 + 0.1) * 10) / 10,
                side : base.side
            });
        }

        return res.status(200).json(updates);
    } catch (error) {
        return res.status(501).json(error);
    }
};
