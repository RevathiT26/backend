const express = require('express');
const HierarchyController = require('../controllers/hierarchy.controller');

const router = express.Router();
const hierarchyController = new HierarchyController();

console.log("=== Hierarchy Routes Loading ===");

router.get('/hierarchy', (req, res, next) => {
    console.log('GET /hierarchy called');
    hierarchyController.getAllItems(req, res);
});

router.delete('/hierarchy/delete/:id', (req, res, next) => {
    console.log('GET /hierarchy/delete/:id called');
    hierarchyController.deleteNode(req, res);
});

router.get('/hierarchy/debug', (req, res) => {
    console.log('DEBUG: Checking Atlas database content...');
    hierarchyController.debugAtlas(req, res);
});

router.post('/hierarchy', (req, res) => {
    hierarchyController.insertRecord(req, res);
});

console.log("=== Hierarchy Routes Loaded ===");

module.exports = router;