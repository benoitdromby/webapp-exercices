const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser: true,
    dbName         : 'apinode'
};

const TaskSchema = new mongoose.Schema({
    title : { type: String },
    status: { type: String, enum: ['todo', 'in_progress', 'done'] },
    order : { type: Number }
});

const Task = mongoose.model('Task', TaskSchema);

const seeds = [
    { order: 1,  title: 'Set up project repository',         status: 'done'        },
    { order: 2,  title: 'Design database schema',            status: 'done'        },
    { order: 3,  title: 'Implement authentication endpoints', status: 'done'       },
    { order: 4,  title: 'Build portfolio API',               status: 'done'        },
    { order: 5,  title: 'Create order book endpoints',       status: 'in_progress' },
    { order: 6,  title: 'Integrate real-time price feed',    status: 'in_progress' },
    { order: 7,  title: 'Write unit tests for services',     status: 'todo'        },
    { order: 8,  title: 'Build React portfolio page',        status: 'todo'        },
    { order: 9,  title: 'Add data visualisation charts',     status: 'todo'        },
    { order: 10, title: 'Deploy to production',              status: 'todo'        },
];

async function seed() {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected to MongoDB');

        await Task.deleteMany({});
        console.log('Cleared existing tasks');

        const inserted = await Task.insertMany(seeds);
        console.log(`Inserted ${inserted.length} tasks:`);
        inserted.forEach(t => console.log(`  [${t.status}] #${t.order} — ${t.title}`));

        await mongoose.disconnect();
        console.log('Done.');
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
}

seed();
