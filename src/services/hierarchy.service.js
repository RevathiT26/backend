const mongoose = require('mongoose');
const Hierarchy = require('../models/hierarchy.model');

class HierarchyService {
    
    async getAllItems() {
        try {
            let targetDb = mongoose.connection.db;
            const collection = targetDb.collection('hierarchy');
            const rawData = await collection.find({}).toArray();
            
            if (rawData.length === 0) {
                const collections = await targetDb.listCollections().toArray();
            }
            
            return rawData.map(item => ({
                id: item._id,
                ...item
            }));
            
        } catch (error) {
            throw error;
        }
    }

    async insertRecord(recordData) {
        try {
            const targetDb = mongoose.connection.db;
            const collection = targetDb.collection('hierarchy');
            
            if (!recordData.name || recordData.name.trim() === '') {
                throw new Error('Name is required and cannot be empty');
            }
            
            if (!recordData.description || recordData.description.trim() === '') {
                throw new Error('Description is required and cannot be empty');
            }
            
            const existingRecord = await collection.findOne({ name: recordData.name.trim() });
            if (existingRecord) {
                throw new Error(`Record with name "${recordData.name}" already exists`);
            }
            
            if (recordData.parent && recordData.parent.trim() !== '') {
                const parentRecord = await collection.findOne({ name: recordData.parent.trim() });
                if (!parentRecord) {
                    throw new Error(`Parent record "${recordData.parent}" does not exist`);
                }
            }
            
            const newRecord = {
                name: recordData.name.trim(),
                description: recordData.description.trim(),
                parent: recordData.parent ? recordData.parent.trim() : '',
                status: recordData.status || 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const insertResult = await collection.insertOne(newRecord);
            
            if (insertResult.acknowledged && insertResult.insertedId) {
                const insertedRecord = await collection.findOne({ _id: insertResult.insertedId });
                
                return {
                    success: true,
                    data: {
                        id: insertedRecord._id,
                        name: insertedRecord.name,
                        description: insertedRecord.description,
                        parent: insertedRecord.parent,
                        status: insertedRecord.status,
                        createdAt: insertedRecord.createdAt,
                        updatedAt: insertedRecord.updatedAt
                    },
                    message: `Record "${insertedRecord.name}" inserted successfully`,
                    insertedId: insertResult.insertedId
                };
            } else {
                throw new Error('Failed to insert record into database');
            }
            
        } catch (error) {
            throw error;
        }
    }

    async debugAtlasData() {
        try {
            const currentDb = mongoose.connection.db?.databaseName;
            const targetDb = mongoose.connection.db;
            const collections = await targetDb.listCollections().toArray();
            const hierarchyExists = collections.some(c => c.name === 'hierarchy');
            
            let hierarchyData = [];
            if (hierarchyExists) {
                const hierarchyCollection = targetDb.collection('hierarchy');
                const count = await hierarchyCollection.countDocuments();
                
                if (count > 0) {
                    const sample = await hierarchyCollection.findOne();
                    hierarchyData = await hierarchyCollection.find({}).limit(5).toArray();
                }
            }
            
            return {
                database: currentDb,
                collections: collections.map(c => c.name),
                hierarchyExists,
                hierarchyDocuments: hierarchyData.length,
                sampleData: hierarchyData.slice(0, 2),
                connectionState: mongoose.connection.readyState
            };
            
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteNode(id) {
        try {
            const targetDb = mongoose.connection.db;
            const collection = targetDb.collection('hierarchy');
            
            let deleteResult;
            
            try {
                const objectId = new mongoose.Types.ObjectId(id);
                deleteResult = await collection.deleteOne({ _id: objectId });
            } catch (objectIdError) {
                deleteResult = await collection.deleteOne({ _id: id });
            }
            
            if (deleteResult.deletedCount > 0) {
                return {
                    success: true,
                    message: `Node deleted successfully`,
                    deletedCount: deleteResult.deletedCount
                };
            } else {
                throw new Error(`No node found with ID: ${id}`);
            }
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = HierarchyService;