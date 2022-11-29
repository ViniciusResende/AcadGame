const badgeExitGate = require('./badgeExitGate');
const badgeDBAdapter = require('../../adapters/badge/badgeDBAdapter');

jest.mock('../../adapters/badge/badgeDBAdapter', () => {
    return {
        findAllBadges: jest.fn(),
        findOneBadge: jest.fn(),
        findByType: jest.fn(),
        findByName: jest.fn()
    };
});

describe('Get all badges', () => {
    it('Should be able to find all badges', async () => {
        const mockResponse = [
            {
                dataValues: {
                    id: 1,
                    name: 'Test',
                    icon: 'test',
                    unlockScore: 1000,
                    type: 'test'
                }
            },
            {
                dataValues: {
                    id: 2,
                    name: 'Test 1',
                    icon: 'test',
                    unlockScore: 2000,
                    type: 'test'
                }
            }
        ];

        jest.spyOn(badgeDBAdapter, 'findAllBadges').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                id: 1,
                name: 'Test',
                icon: 'test',
                unlockScore: 1000,
                type: 'test'
            },
            {
                id: 2,
                name: 'Test 1',
                icon: 'test',
                unlockScore: 2000,
                type: 'test'
            }
        ];

        const returnBadges = await badgeExitGate.getAllBadges();

        expect(badgeDBAdapter.findAllBadges).toHaveBeenCalledTimes(1);
        expect(returnBadges).toEqual(expectedResponse);
    });
});
