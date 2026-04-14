const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser: true,
    dbName         : 'apinode'
};

const PositionSchema = new mongoose.Schema({
    symbol  : { type: String, uppercase: true },
    quantity: { type: Number },
    price   : { type: Number }
}, { timestamps: true });

const Position = mongoose.model('Position', PositionSchema);

const seeds = [
    { symbol: 'AAPL',  quantity: 15,  price: 172.45 },
    { symbol: 'TSLA',  quantity: 8,   price: 218.60 },
    { symbol: 'NVDA',  quantity: 5,   price: 845.20 },
    { symbol: 'MSFT',  quantity: 20,  price: 389.75 },
    { symbol: 'AMZN',  quantity: 10,  price: 178.90 },
    { symbol: 'GOOGL', quantity: 6,   price: 165.30 },
    { symbol: 'META',  quantity: 12,  price: 491.15 },
    { symbol: 'AMD',   quantity: 25,  price: 162.80 },
    { symbol: 'INTC',  quantity: 40,  price: 31.55  },
    { symbol: 'NFLX',  quantity: 7,   price: 607.40 }
];

async function seed() {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected to MongoDB');

        await Position.deleteMany({});
        console.log('Cleared existing positions');

        const inserted = await Position.insertMany(seeds);
        console.log(`Inserted ${inserted.length} positions:`);
        inserted.forEach(p => console.log(`  ${p.symbol} — qty: ${p.quantity}, price: $${p.price}`));

        await mongoose.disconnect();
        console.log('Done.');
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
}

seed();
