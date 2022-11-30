const gymPalDomain = require('./gymPalDomain');
const gymPalExitGate = require('../../gates/gymPal/gymPalExitGate');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../gates/gymPal/gymPalExitGate', () => {
    return {
        addPal: jest.fn(),
        getPendingFriendshipRequests: jest.fn(),
        acceptFriendshipRequest: jest.fn(),
        rejectFriendshipRequest: jest.fn(),
        getUserGymPals: jest.fn(),
        removeGymPal: jest.fn()
    };
});

describe('Request friendship', () => {
    it('Should be able to request friendship with existent user', async () => {
        const friendshipMockResponse = {
            friendshipId: 2,
            senderId: 1,
            receiverId: 3,
            accepted: false
        };

        jest.spyOn(gymPalExitGate, 'addPal').mockImplementationOnce(
            (_palInfo) =>
                new Promise((resolve) => resolve(friendshipMockResponse))
        );

        const receiverUserId = 3;
        const senderUserId = 1;

        const friendship = await gymPalDomain.requestFriendship(
            senderUserId,
            receiverUserId
        );

        expect(gymPalExitGate.addPal).toHaveBeenCalledTimes(1);
        expect(gymPalExitGate.addPal).toHaveBeenCalledWith(
            senderUserId,
            receiverUserId
        );
        expect(friendship).toEqual(friendshipMockResponse);

        jest.clearAllMocks();
    });

    it("Shoundn't be able to request friendship with inexistent user", async () => {
        const receiverUserId = undefined;
        const senderUserId = 1;

        const error = new ServerError();
        error.ServerError(400, 'Requisição feita de forma incorreta.');

        await expect(
            gymPalDomain.requestFriendship(senderUserId, receiverUserId)
        ).rejects.toEqual(error);

        jest.clearAllMocks();
    });

    it("Shoundn't be able to befriend yourself", async () => {
        const receiverUserId = 1;
        const senderUserId = 1;

        const error = new ServerError();
        error.ServerError(
            400,
            'Você não pode enviar uma solicitação de amizade para si mesmo.'
        );

        await expect(
            gymPalDomain.requestFriendship(senderUserId, receiverUserId)
        ).rejects.toEqual(error);

        jest.clearAllMocks();
    });
});

describe('Get pending friendship requests', () => {
    it('Should be able to get pending requests', async () => {
        const mockResponse = {
            friendshipId: 889,
            senderId: 24,
            receiverId: 12,
            accepted: true,
            updatedAt: '2022-11-23T16:53:39.810Z',
            createdAt: '2022-11-23T16:53:39.810Z'
        };

        jest.spyOn(
            gymPalExitGate,
            'getPendingFriendshipRequests'
        ).mockImplementationOnce(
            (_palInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 24;

        const pal = await gymPalDomain.getPendingFriendshipRequests(userId);

        expect(
            gymPalExitGate.getPendingFriendshipRequests
        ).toHaveBeenCalledTimes(1);
        expect(
            gymPalExitGate.getPendingFriendshipRequests
        ).toHaveBeenCalledWith(userId);
        expect(pal).toEqual(mockResponse);

        jest.clearAllMocks();
    });
    
    it('Should be able to throw an error', async () => {
        const mockError = new ServerError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(gymPalExitGate, 'getPendingFriendshipRequests').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await gymPalDomain.getPendingFriendshipRequests(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Accept friendship request', () => {
    it('Should be able to accept pending friendship requests', async () => {
        jest.spyOn(
            gymPalExitGate,
            'acceptFriendshipRequest'
        ).mockImplementationOnce(
            (_palInfo) => new Promise((resolve) => resolve())
        );

        const friendshipId = 1;

        await gymPalDomain.acceptFriendshipRequest(friendshipId);

        expect(gymPalExitGate.acceptFriendshipRequest).toHaveBeenCalledTimes(1);
        expect(gymPalExitGate.acceptFriendshipRequest).toHaveBeenCalledWith(
            friendshipId
        );

        jest.clearAllMocks();
    });

    it('Should be able to throw an error', async () => {
        const mockError = new ServerError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(gymPalExitGate, 'acceptFriendshipRequest').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await gymPalDomain.acceptFriendshipRequest(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Reject friendship request', () => {
    it('Should be able to reject pending friendship requests', async () => {
        jest.spyOn(
            gymPalExitGate,
            'rejectFriendshipRequest'
        ).mockImplementationOnce(
            (_palInfo) => new Promise((resolve) => resolve())
        );

        const friendshipId = 1;

        await gymPalDomain.rejectFriendshipRequest(friendshipId);

        expect(gymPalExitGate.rejectFriendshipRequest).toHaveBeenCalledTimes(1);
        expect(gymPalExitGate.rejectFriendshipRequest).toHaveBeenCalledWith(
            friendshipId
        );

        jest.clearAllMocks();
    });

    it('Should be able to throw an error', async () => {
        const mockError = new ServerError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(gymPalExitGate, 'rejectFriendshipRequest').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await gymPalDomain.rejectFriendshipRequest(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Get user gym pals', () => {
    it('Should be able get the user gym pals', async () => {
        const mockResponse = [
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

        jest.spyOn(gymPalExitGate, 'getUserGymPals').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 1;

        const userGymPals = await gymPalDomain.getUserGymPals(userId);

        expect(gymPalExitGate.getUserGymPals).toHaveBeenCalledTimes(1);
        expect(gymPalExitGate.getUserGymPals).toHaveBeenCalledWith(userId);
        expect(userGymPals).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should be able to throw an error', async () => {
        const mockError = new ServerError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(gymPalExitGate, 'getUserGymPals').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await gymPalDomain.getUserGymPals(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Remove gym pal', () => {
    it('Should be able to remove a gym pal', async () => {
        jest.spyOn(gymPalExitGate, 'removeGymPal').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const friendshipId = 1;

        await gymPalDomain.removeGymPal(friendshipId);

        expect(gymPalExitGate.removeGymPal).toHaveBeenCalledTimes(1);
        expect(gymPalExitGate.removeGymPal).toHaveBeenCalledWith(friendshipId);

        jest.clearAllMocks();
    });

    it('Should be able to throw an error', async () => {
        const mockError = new ServerError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(gymPalExitGate, 'removeGymPal').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await gymPalDomain.removeGymPal(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});
