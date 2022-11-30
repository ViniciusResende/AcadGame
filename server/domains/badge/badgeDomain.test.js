const badgeDomain = require('./badgeDomain');
const queryBadge = require('../../gates/badge/badgeExitGate');
const serverError = require('../../utils/serverErrors');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../gates/badge/badgeExitGate', () => {
    return {
        getOneBadge: jest.fn(),
        getBadgesByType: jest.fn(),
        getBadgesByName: jest.fn(),
        getAllBadges: jest.fn()
    };
});

describe('Search a badge by id', () => {
    it('Should be able to find existent badge', async () => {
        const mockResponse = {
            id: 50,
            name: 'Lucas Paquetá',
            icon: 'Ícone do bolão',
            unlockScore: 45,
            type: 'Platina'
        };

        jest.spyOn(queryBadge, 'getOneBadge').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const id = 90;

        const badge = await badgeDomain.queryOneBadge(id);

        expect(queryBadge.getOneBadge).toHaveBeenCalledTimes(1);
        expect(queryBadge.getOneBadge).toHaveBeenCalledWith(id);
        expect(badge).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should be able to throw an error', async () => {
        const mockError = new serverError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(queryBadge, 'getOneBadge').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await badgeDomain.queryOneBadge(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Search a badge by name', () => {
    it('Should be able to find existent badge', async () => {
        const mockResponse = {
            id: 50,
            name: 'Lucas Paquetá',
            icon: 'Ícone do bolão',
            unlockScore: 45,
            type: 'Platina'
        };

        jest.spyOn(queryBadge, 'getBadgesByName').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const name = 'Lucas Paquetá';

        const badge = await badgeDomain.queryBadgesByName(name);

        expect(queryBadge.getBadgesByName).toHaveBeenCalledTimes(1);
        expect(queryBadge.getBadgesByName).toHaveBeenCalledWith(name);
        expect(badge).toEqual(mockResponse);
    });

    it('Should be able to throw an error', async () => {
        const mockError = new serverError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(queryBadge, 'getBadgesByName').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await badgeDomain.queryBadgesByName(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Search all badges', () => {
    it('Should be able to find all badges', async () => {
        const mockResponse = {
            id: 50,
            name: 'Lucas Paquetá',
            icon: 'Ícone do bolão',
            unlockScore: 45,
            type: 'Platina'
        };

        jest.spyOn(queryBadge, 'getAllBadges').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const badge = await badgeDomain.queryAllBadges();

        expect(queryBadge.getAllBadges).toHaveBeenCalledTimes(1);
        expect(queryBadge.getAllBadges).toHaveBeenCalledWith();
        expect(badge).toEqual(mockResponse);
    });

    it('Should be able to throw an error', async () => {
        const mockError = new serverError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(queryBadge, 'getAllBadges').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await badgeDomain.queryAllBadges(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Search badges by type', () => {
    it('Should be able to find badges by type', async () => {
        const mockResponse = {
            id: 50,
            name: 'Lucas Paquetá',
            icon: 'Ícone do bolão',
            unlockScore: 45,
            type: 'Platina'
        };

        jest.spyOn(queryBadge, 'getBadgesByType').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const type = 'Platina';

        const badge = await badgeDomain.queryBadgesByType(type);

        expect(queryBadge.getBadgesByType).toHaveBeenCalledTimes(1);
        expect(queryBadge.getBadgesByType).toHaveBeenCalledWith(type);
        expect(badge).toEqual(mockResponse);
    });

    it('Should be able to throw an error', async () => {
        const mockError = new serverError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(queryBadge, 'getBadgesByType').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await badgeDomain.queryBadgesByType(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});
