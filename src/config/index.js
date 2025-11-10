require('dotenv').config();
console.log(process.env.MONGODB_URI)
module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/node-mongo-app',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    API_VERSION: process.env.API_VERSION || 'v1'
};