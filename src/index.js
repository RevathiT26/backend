const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hierarchyRoutes = require('./routes/hierarchy.routes');
const cors = require("cors");
const app = express();
const PORT = config.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', hierarchyRoutes);

// Connect to MongoDB
// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to MongoDB');
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//             console.log(`Environment: ${config.NODE_ENV}`);
//             console.log(`API available at http://localhost:${PORT}/api`);
//             console.log(`Test endpoint: http://localhost:${PORT}/api/hierarchy`);
//         });
//     })
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//     });
 app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${config.NODE_ENV}`);
            console.log(`API available at http://localhost:${PORT}/api`);
            console.log(`Test endpoint: http://localhost:${PORT}/api/hierarchy`);
        });