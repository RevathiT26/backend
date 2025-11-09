const HierarchyDto = require('./hierarchyDto');

class HierarchyRepository {
    constructor() {
        this.data = [
            new HierarchyDto(1, 'A', 'This is a description of A', ''),
            new HierarchyDto(2, 'B', 'This is a description of B', 'A'),
            new HierarchyDto(3, 'C', 'This is a description of C', 'A'),
            new HierarchyDto(4, 'D', 'This is a description of D', 'A'),
            new HierarchyDto(5, 'B-1', 'This is a description of B-1', 'B'),
            new HierarchyDto(6, 'B-2', 'This is a description of B-2', 'B'),
            new HierarchyDto(7, 'B-3', 'This is a description of B-3', 'B')
        ];
    }

    async getAll() {
        return [...this.data];
    }

    async getByParent(parentName) {
        return this.data.filter(item => item.parent === parentName);
    }

    async getHierarchy() {
        const buildHierarchy = (parentName) => {
            const children = this.data
                .filter(item => item.parent === parentName)
                .map(item => ({
                    ...item,
                    children: buildHierarchy(item.name)
                }));
            return children;
        };

        return buildHierarchy('');
    }
}

module.exports = HierarchyRepository;