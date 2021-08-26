const fs = require('fs');
const { start } = require('repl');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');

const { zookeepers } = require('../data/zookeepers.json');
const { createNewAnimal } = require('../lib/animals');

jest.mock('fs');

test('creates a new zookeeper', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Charlene', id: 'ffjffks' },
        zookeepers
    );

    expect(zookeeper.name).toBe('Charlene');
    expect(zookeeper.id).toBe('ffjffks');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '2',
            name: 'Charlene',
            age: 32,
            favoriteAnimal: 'squirrel'
        },
        {
            id: '3',
            name: 'Patrick',
            age: 54,
            favoriteAnimal: 'skunk'
        }
    ];

    const updatedZookeepers = filterByQuery({favoriteAnimal: 'skunk'}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '2',
            name: 'Charlene',
            age: 32,
            favoriteAnimal: 'squirrel'
        },
        {
            id: '3',
            name: 'Patrick',
            age: 54,
            favoriteAnimal: 'skunk'
        }
    ];

    const result = findById('2', startingZookeepers);

    expect(result.name).toBe('Charlene');
});

test('validates age', () => {
    const zookeeper = {
        id: '2',
        name: 'Charlene',
        age: 32,
        favoriteAnimal: 'squirrel'
    };

    const invalidZookeeper = {
        id: '2',
        name: 'Charlene',
        favoriteAnimal: 'squirrel'
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})