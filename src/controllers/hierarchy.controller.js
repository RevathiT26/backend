const HierarchyRepository = require('../data/hierarchyRepository');

class HierarchyController {
    constructor() {
        this.hierarchyRepository = new HierarchyRepository();
    }

    async getAllItems(req, res) {
        try {
            const items = await this.hierarchyRepository.getAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByParent(req, res) {
        try {
            const items = await this.hierarchyRepository.getByParent(req.params.parent);
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getHierarchy(req, res) {
        try {
            const hierarchy = await this.hierarchyRepository.getHierarchy();
            res.json(hierarchy);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = HierarchyController;