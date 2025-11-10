const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hierarchyRoutes = require('./routes/hierarchy.routes');
const cors = require("cors");

const app = express();
const PORT = config.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api', hierarchyRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'Hierarchy API is running!',
        environment: config.NODE_ENV,
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        dbName: mongoose.connection.db?.databaseName
    });
});

const startServer = async () => {
    try {
        console.log(' Connecting to MongoDB...');
        
        if (!config.MONGODB_URI) {
            throw new Error('MONGODB_URI is undefined. Check your .env file.');
        }

        // Single connection point - remove deprecated options
        await mongoose.connect(config.MONGODB_URI);
        
        console.log(' Connected to MongoDB successfully');
        console.log(' Database:', mongoose.connection.db.databaseName);
        console.log(' Connection state:', mongoose.connection.readyState);
        
        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${config.NODE_ENV}`);
            console.log(`API available at http://localhost:${PORT}/api/hierarchy`);
            console.log(`Home: http://localhost:${PORT}/`);
        });

    } catch (error) {
        console.error('Failed to start server:', error.message);
        
        process.exit(1);
    }
};

// Connection event handlers
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});

// Start the server
startServer();
