const express = require('express');
const HierarchyController = require('../controllers/hierarchy.controller');

const router = express.Router();
const hierarchyController = new HierarchyController();

console.log("=== Hierarchy Routes Loading ===");

router.get('/hierarchy', (req, res, next) => {
    console.log('GET /hierarchy called');
    hierarchyController.getAllItems(req, res);
});

router.get('/hierarchy/tree', (req, res, next) => {
    console.log('GET /hierarchy/tree called');
    hierarchyController.getHierarchy(req, res);
});

router.get('/hierarchy/parent/:parent', (req, res, next) => {
    console.log('GET /hierarchy/parent/:parent called');
    hierarchyController.getByParent(req, res);
});

console.log("=== Hierarchy Routes Loaded ===");

module.exports = router;