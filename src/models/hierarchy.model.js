const mongoose = require('mongoose');

const hierarchySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        default: '',
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active'
    }
}, {
    timestamps: true,
    collection: 'hierarchy' 
});

const Hierarchy = mongoose.model('Hierarchy', hierarchySchema);
module.exports = Hierarchy;