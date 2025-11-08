const express = require('express');
const hierarchyRoutes = require('./routes/hierarchy.routes');

const app = express();

app.use(express.json());

// Add a test route to verify server is working
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use('/api', hierarchyRoutes);

console.log('Routes registered:');
console.log('- GET /api/hierarchy');
console.log('- GET /api/hierarchy/tree');
console.log('- GET /api/hierarchy/parent/:parent');

// Since we're using dummy data, no MongoDB connection needed
console.log('Using in-memory data store');

module.exports = app;