
const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser: true,
    dbName         : 'apinode'
};

const OrderSchema = new mongoose.Schema({
    price: { type: Number },
    size : { type: Number },
    side : { type: String, enum: ['bid', 'ask'] }
});

const Order = mongoose.model('Order', OrderSchema);

// Simulate a realistic order book around a mid price of 100.00
const MID = 100.00;

function round(n, decimals = 2) {
    return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

const seeds = [
    // --- bids (below mid, descending) ---
    { side: 'bid', price: round(MID - 0.1),  size: round(1.5  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 0.2),  size: round(2.0  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 0.3),  size: round(0.8  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 0.5),  size: round(3.2  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 0.7),  size: round(1.1  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 1.0),  size: round(4.5  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 1.5),  size: round(2.3  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 2.0),  size: round(5.0  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 2.5),  size: round(1.8  + Math.random(), 1) },
    { side: 'bid', price: round(MID - 3.0),  size: round(6.0  + Math.random(), 1) },
    // --- asks (above mid, ascending) ---
    { side: 'ask', price: round(MID + 0.1),  size: round(1.2  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 0.2),  size: round(2.5  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 0.4),  size: round(0.9  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 0.6),  size: round(3.1  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 0.8),  size: round(1.4  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 1.2),  size: round(4.0  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 1.7),  size: round(2.2  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 2.2),  size: round(5.5  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 2.8),  size: round(1.7  + Math.random(), 1) },
    { side: 'ask', price: round(MID + 3.5),  size: round(3.8  + Math.random(), 1) },
];

async function seed() {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected to MongoDB');

        await Order.deleteMany({});
        console.log('Cleared existing orders');

        const inserted = await Order.insertMany(seeds);
        console.log(`Inserted ${inserted.length} orders:`);
        inserted.forEach(o =>
            console.log(`  [${o.side.toUpperCase()}] price: ${o.price}, size: ${o.size}`)
        );

        await mongoose.disconnect();
        console.log('Done.');
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
}

seed();
