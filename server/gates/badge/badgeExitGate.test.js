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

        jest.clearAllMocks();
    });
});

describe('Get one badges', () => {
    it('Should be able to find one badge', async () => {
        const mockResponse = {
            dataValues: {
                id: 1,
                name: 'Test',
                icon: 'test',
                unlockScore: 1000,
                type: 'test'
            }
        };
        jest.spyOn(badgeDBAdapter, 'findOneBadge').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = {
            id: 1,
            name: 'Test',
            icon: 'test',
            unlockScore: 1000,
            type: 'test'
        };
        const badgeId = 1;

        const returnBadge = await badgeExitGate.getOneBadge(badgeId);

        expect(badgeDBAdapter.findOneBadge).toHaveBeenCalledTimes(1);
        expect(badgeDBAdapter.findOneBadge).toHaveBeenCalledWith(badgeId);
        expect(returnBadge).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Get badges by type', () => {
    it('Should be able to find badges by type', async () => {
        const mockResponse = [
            {
                dataValues: {
                    id: 1,
                    name: 'Test',
                    icon: 'test',
                    unlockScore: 1000,
                    type: 'typeTest'
                }
            },
            {
                dataValues: {
                    id: 2,
                    name: 'Test 1',
                    icon: 'test',
                    unlockScore: 2000,
                    type: 'typeTest'
                }
            }
        ];

        jest.spyOn(badgeDBAdapter, 'findByType').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                id: 1,
                name: 'Test',
                icon: 'test',
                unlockScore: 1000,
                type: 'typeTest'
            },
            {
                id: 2,
                name: 'Test 1',
                icon: 'test',
                unlockScore: 2000,
                type: 'typeTest'
            }
        ];

        const badgeType = 'typeTest';

        const returnBadges = await badgeExitGate.getBadgesByType(badgeType);

        expect(badgeDBAdapter.findByType).toHaveBeenCalledTimes(1);
        expect(badgeDBAdapter.findByType).toHaveBeenCalledWith(badgeType);
        expect(returnBadges).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Get badges by name', () => {
    it('Should be able to find badges by name', async () => {
        const mockResponse = [
            {
                dataValues: {
                    id: 1,
                    name: 'Test Name',
                    icon: 'test',
                    unlockScore: 1000,
                    type: 'typeTest'
                }
            },
            {
                dataValues: {
                    id: 2,
                    name: 'Test Name 1',
                    icon: 'test',
                    unlockScore: 2000,
                    type: 'typeTest'
                }
            }
        ];

        jest.spyOn(badgeDBAdapter, 'findByName').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                id: 1,
                name: 'Test Name',
                icon: 'test',
                unlockScore: 1000,
                type: 'typeTest'
            },
            {
                id: 2,
                name: 'Test Name 1',
                icon: 'test',
                unlockScore: 2000,
                type: 'typeTest'
            }
        ];

        const badgeName = 'Test Name';

        const returnBadges = await badgeExitGate.getBadgesByName(badgeName);

        expect(badgeDBAdapter.findByName).toHaveBeenCalledTimes(1);
        expect(badgeDBAdapter.findByName).toHaveBeenCalledWith(badgeName);
        expect(returnBadges).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});
