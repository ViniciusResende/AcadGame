const gymPalsExitGate = require('./gymPalExitGate');
const gymPalsDBAdapter = require('../../adapters/gymPal/gymPalDBAdapter');
const userDomain = require('../../domains/user/userDomain');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../adapters/gymPal/gymPalDBAdapter', () => {
    return {
        addNewPal: jest.fn(),
        getPendingRequests: jest.fn(),
        confirmFriendship: jest.fn(),
        rejectFriendship: jest.fn(),
        getPals: jest.fn(),
        removeGymPal: jest.fn()
    };
});

jest.mock('../../domains/user/userDomain', () => {
    return {
        getSingleUser: jest.fn()
    };
});

describe('Add gym pal', () => {
    it('Should be able to add a registered user as a gym pal', async () => {
        const userMockResponse = {
            dataValues: {
                id: 3,
                nickname: 'Test Name',
                profileIcon: 'default',
                email: 'test@gmail.com',
                score: 1245
            }
        };

        jest.spyOn(userDomain, 'getSingleUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const friendshipMockResponse = {
            friendshipId: 2,
            senderId: 1,
            receiverId: 3,
            accepted: false
        };

        jest.spyOn(gymPalsDBAdapter, 'addNewPal').mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(friendshipMockResponse))
        );

        const senderUserId = 1;
        const receiverUserId = 3;

        const newFriendship = await gymPalsExitGate.addPal(
            senderUserId,
            receiverUserId
        );

        expect(userDomain.getSingleUser).toHaveBeenCalledTimes(1);
        expect(userDomain.getSingleUser).toHaveBeenCalledWith(receiverUserId);

        expect(gymPalsDBAdapter.addNewPal).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.addNewPal).toHaveBeenCalledWith(
            senderUserId,
            receiverUserId
        );

        expect(newFriendship).toEqual(friendshipMockResponse);

        jest.clearAllMocks();
    });

    it('Should not be able to add an unregistered user as a gym pal', async () => {
        const userMockResponse = undefined;

        jest.spyOn(userDomain, 'getSingleUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const error = new ServerError();
        error.ServerError(400, 'Este usuário não existe.');

        const senderUserId = 1;
        const receiverUnregistedUserId = -1;

        await expect(
            gymPalsExitGate.addPal(senderUserId, receiverUnregistedUserId)
        ).rejects.toEqual(error);

        expect(userDomain.getSingleUser).toHaveBeenCalledTimes(1);
        expect(userDomain.getSingleUser).toHaveBeenCalledWith(
            receiverUnregistedUserId
        );

        jest.clearAllMocks();
    });

    it('Should not be able to return a friendship if it is has not been created in the database', async () => {
        const userMockResponse = {
            dataValues: {
                id: 3,
                nickname: 'Test Name',
                profileIcon: 'default',
                email: 'test@gmail.com',
                score: 1245
            }
        };

        jest.spyOn(userDomain, 'getSingleUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const friendshipMockResponse = undefined;

        jest.spyOn(gymPalsDBAdapter, 'addNewPal').mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(friendshipMockResponse))
        );

        const error = new ServerError();
        error.ServerError(500, 'Não foi possível efetuar o pedido de amizade.');

        const senderUserId = 1;
        const receiverUserId = 3;

        await expect(
            gymPalsExitGate.addPal(senderUserId, receiverUserId)
        ).rejects.toEqual(error);

        expect(userDomain.getSingleUser).toHaveBeenCalledTimes(1);
        expect(userDomain.getSingleUser).toHaveBeenCalledWith(receiverUserId);

        expect(gymPalsDBAdapter.addNewPal).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.addNewPal).toHaveBeenCalledWith(
            senderUserId,
            receiverUserId
        );

        jest.clearAllMocks();
    });
});

describe('Get pending friendship requests', () => {
    it('Should be able to get pending friendship requests', async () => {
        const requestsMockResponse = [
            { friendshipId: 1, senderId: 2, receiverId: 1, accepted: false }
        ];

        jest.spyOn(
            gymPalsDBAdapter,
            'getPendingRequests'
        ).mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(requestsMockResponse))
        );

        const userMockResponse = {
            dataValues: {
                id: 2,
                nickname: 'Test Name',
                profileIcon: 'default',
                email: 'test@gmail.com',
                score: 1245
            }
        };

        jest.spyOn(userDomain, 'getSingleUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const expectedResponse = [
            {
                friendshipId: 1,
                senderId: 2,
                receiverId: 1,
                accepted: false,
                senderInfo: {
                    dataValues: {
                        id: 2,
                        nickname: 'Test Name',
                        profileIcon: 'default',
                        email: 'test@gmail.com',
                        score: 1245
                    }
                }
            }
        ];

        const userId = 1;

        const pendingFriendshipRequests =
            await gymPalsExitGate.getPendingFriendshipRequests(userId);

        expect(gymPalsDBAdapter.getPendingRequests).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.getPendingRequests).toHaveBeenCalledWith(
            userId
        );

        expect(userDomain.getSingleUser).toHaveBeenCalledTimes(1);
        expect(userDomain.getSingleUser).toHaveBeenCalledWith(
            expectedResponse[0].senderInfo.dataValues.id
        );

        expect(pendingFriendshipRequests).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Accept friendship request', () => {
    it('Should be able to accept a friendship request by its id', async () => {
        jest.spyOn(
            gymPalsDBAdapter,
            'confirmFriendship'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const friendshipId = 1;

        await gymPalsExitGate.acceptFriendshipRequest(friendshipId);

        expect(gymPalsDBAdapter.confirmFriendship).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.confirmFriendship).toHaveBeenCalledWith(
            friendshipId
        );

        jest.clearAllMocks();
    });
});

describe('Reject friendship request', () => {
    it('Should be able to reject a friendship request by its id', async () => {
        jest.spyOn(gymPalsDBAdapter, 'rejectFriendship').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const friendshipId = 1;

        await gymPalsExitGate.rejectFriendshipRequest(friendshipId);

        expect(gymPalsDBAdapter.rejectFriendship).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.rejectFriendship).toHaveBeenCalledWith(
            friendshipId
        );

        jest.clearAllMocks();
    });
});

describe('Get user gym pals', () => {
    it('Should be able get the user gym pals', async () => {
        const gymPalsMockResponse = [
            { friendshipId: 1, senderId: 2, receiverId: 1, accepted: true }
        ];

        jest.spyOn(gymPalsDBAdapter, 'getPals').mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(gymPalsMockResponse))
        );

        const userMockResponse = {
            dataValues: {
                id: 2,
                nickname: 'Test Name',
                profileIcon: 'default',
                email: 'test@gmail.com',
                score: 1245
            }
        };

        jest.spyOn(userDomain, 'getSingleUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const expectedResponse = [
            {
                friendshipId: 1,
                senderId: 2,
                receiverId: 1,
                accepted: true,
                palInfo: {
                    dataValues: {
                        id: 2,
                        nickname: 'Test Name',
                        profileIcon: 'default',
                        email: 'test@gmail.com',
                        score: 1245
                    }
                }
            }
        ];

        const userId = 1;

        const userGymPals = await gymPalsExitGate.getUserGymPals(userId);

        expect(gymPalsDBAdapter.getPals).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.getPals).toHaveBeenCalledWith(userId);
        expect(userGymPals).toEqual(expectedResponse);

        jest.clearAllMocks();
    });

    it('Should be able get the user gym pals', async () => {
        const gymPalsMockResponse = [
            { friendshipId: 1, senderId: 1, receiverId: 3, accepted: true }
        ];

        jest.spyOn(gymPalsDBAdapter, 'getPals').mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(gymPalsMockResponse))
        );

        const userMockResponse = {
            dataValues: {
                id: 2,
                nickname: 'Test Name',
                profileIcon: 'default',
                email: 'test@gmail.com',
                score: 1245
            }
        };

        jest.spyOn(userDomain, 'getSingleUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const expectedResponse = [
            {
                friendshipId: 1,
                senderId: 1,
                receiverId: 3,
                accepted: true,
                palInfo: {
                    dataValues: {
                        id: 2,
                        nickname: 'Test Name',
                        profileIcon: 'default',
                        email: 'test@gmail.com',
                        score: 1245
                    }
                }
            }
        ];

        const userId = 1;

        const userGymPals = await gymPalsExitGate.getUserGymPals(userId);

        expect(gymPalsDBAdapter.getPals).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.getPals).toHaveBeenCalledWith(userId);
        expect(userGymPals).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Remove gym pal', () => {
    it('Should be able to remove a gym pal', async () => {
        jest.spyOn(gymPalsDBAdapter, 'removeGymPal').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const friendshipId = 1;

        await gymPalsExitGate.removeGymPal(friendshipId);

        expect(gymPalsDBAdapter.removeGymPal).toHaveBeenCalledTimes(1);
        expect(gymPalsDBAdapter.removeGymPal).toHaveBeenCalledWith(
            friendshipId
        );

        jest.clearAllMocks();
    });
});
