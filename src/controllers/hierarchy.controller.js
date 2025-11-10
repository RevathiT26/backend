const HierarchyService = require('../services/hierarchy.service');

class HierarchyController {
    constructor() {
        this.hierarchyService = new HierarchyService();
    }

    async getAllItems(req, res) {
        try {
            const items = await this.hierarchyService.getAllItems();
            res.json({
                success: true,
                data: items,
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    async debugAtlas(req, res) {
        try {
            const stats = await this.hierarchyService.getDatabaseStats();
            const rawData = await this.hierarchyService.getRawAtlasData();
            const debugInfo = await this.hierarchyService.debugAtlasData();
            
            res.json({
                success: true,
                data: {
                    stats,
                    rawDataCount: rawData.length,
                    sampleRawData: rawData.slice(0, 2),
                    debugInfo
                },
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
                stack: error.stack
            });
        }
    }
    
    async deleteNode(req, res) {
        try {
            const { id } = req.params;
            const result = await this.hierarchyService.deleteNode(id);
            res.json({
                success: true,
                data: result,
                message: result.message
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }

    async insertRecord(req, res) {
        try {
            const recordData = req.body;
            
            if (!recordData || Object.keys(recordData).length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Request body is required'
                });
            }
            
            const result = await this.hierarchyService.insertRecord(recordData);
            
            res.status(201).json({
                success: true,
                data: result.data,
                message: result.message,
                insertedId: result.insertedId,
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }
}

module.exports = HierarchyController;