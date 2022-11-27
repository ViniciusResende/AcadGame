const badgeDomain = require('./badgeDomain');
const queryBadge = require('../../gates/badge/badgeExitGate');
const serverError = require('../../utils/serverErrors');

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
        }

        jest.spyOn(queryBadge, 'getOneBadge').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const id = 90;

        const badge = await badgeDomain.queryOneBadge(id);

        expect(queryBadge.getOneBadge).toHaveBeenCalledTimes(1);
        expect(queryBadge.getOneBadge).toHaveBeenCalledWith(id);
        expect(badge).toEqual(mockResponse);
    });

    // it("Shouldn't be able to find non existent badge", async () => {

    //     const mockResponse = {
    //         id: 50,
    //         name: 'Lucas Paquetá',
    //         icon: 'Ícone do bolão',
    //         unlockScore: 45,
    //         type: 'Platina'
    //     }

    //     jest.spyOn(queryBadge, 'getOneBadge').mockImplementationOnce(
    //         (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
    //     );

    //     const id = 90;

    //     let error = new serverError();
    //     error.ServerError(400, 'Não encontramos uma insíngnia com id ${id}.');

    //     await expect(
    //         badgeDomain.queryOneBadge(id)
    //     ).rejects.toEqual(error);
    //     expect(queryBadge.getOneBadge).toHaveBeenCalledTimes(1);
    //     expect(queryBadge.getOneBadge).toHaveBeenCalledWith(id);

    //     jest.clearAllMocks();
    // });
});

describe('Search a badge by name', () => {
    it('Should be able to find existent badge', async () => {

        const mockResponse = {
            id: 50,
            name: 'Lucas Paquetá',
            icon: 'Ícone do bolão',
            unlockScore: 45,
            type: 'Platina'
        }

        jest.spyOn(queryBadge, 'getBadgesByName').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const name = 'Lucas Paquetá';

        const badge = await badgeDomain.queryBadgesByName(name);

        expect(queryBadge.getBadgesByName).toHaveBeenCalledTimes(1);
        expect(queryBadge.getBadgesByName).toHaveBeenCalledWith(name);
        expect(badge).toEqual(mockResponse);
    });

    // it("Shouldn't be able to find non existent badge", async () => {

    //     const mockResponse = {
    //         id: 50,
    //         name: 'Lucas Paquetá',
    //         icon: 'Ícone do bolão',
    //         unlockScore: 45,
    //         type: 'Platina'
    //     }

    //     jest.spyOn(queryBadge, 'getBadgesByName').mockImplementationOnce(
    //         (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
    //     );

    //     const id = 90;

    //     let error = new serverError();
    //     error.ServerError(400, 'Não encontramos uma insíngnia com id ${id}.');

    //     await expect(
    //         badgeDomain.queryBadgesByName(id)
    //     ).rejects.toEqual(error);
    //     expect(queryBadge.getBadgesByName).toHaveBeenCalledTimes(1);
    //     expect(queryBadge.getBadgesByName).toHaveBeenCalledWith(id);

    //     jest.clearAllMocks();
    // });
});

describe('Search all badges', () => {
    it('Should be able to find all badges', async () => {

        const mockResponse = {
            id: 50,
            name: 'Lucas Paquetá',
            icon: 'Ícone do bolão',
            unlockScore: 45,
            type: 'Platina'
        }

        jest.spyOn(queryBadge, 'getAllBadges').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const badge = await badgeDomain.queryAllBadges();

        expect(queryBadge.getAllBadges).toHaveBeenCalledTimes(1);
        expect(queryBadge.getAllBadges).toHaveBeenCalledWith();
        expect(badge).toEqual(mockResponse);
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
        }

        jest.spyOn(queryBadge, 'getBadgesByType').mockImplementationOnce(
            (_badgeInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const type = 'Platina';

        const badge = await badgeDomain.queryBadgesByType(type);

        expect(queryBadge.getBadgesByType).toHaveBeenCalledTimes(1);
        expect(queryBadge.getBadgesByType).toHaveBeenCalledWith(type);
        expect(badge).toEqual(mockResponse);
    });
});