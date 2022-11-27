const gymPals = require('./gymPalDomain');
const queryGymPal = require('../../gates/gymPal/gymPalExitGate');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../gates/gymPal/gymPalExitGate', () => {
    return {
        addPal: jest.fn()
    };
});

describe("Request friendship", ()=>{

    it("Shound be able to request friendship with existent user", async ()=>{
        
        const mockResponse = {
            friendshipId: 889,
            senderId: 24,
            receiverId: 12,
            accepted: true,
            updatedAt: '2022-11-23T16:53:39.810Z',
            createdAt: '2022-11-23T16:53:39.810Z'
        }

        jest.spyOn(gymPals, 'requestFriendship').mockImplementationOnce(
            (_palInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const receiverUserId = 12;
        const senderUserId = 24;

        const pal = await gymPals.requestFriendship(senderUserId, receiverUserId);
        
        expect(gymPals.requestFriendship).toHaveBeenCalledTimes(1);
        expect(gymPals.requestFriendship).toHaveBeenCalledWith(senderUserId, receiverUserId);
        expect(pal).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    // it("Shoundn't be able to request friendship with inexistent user", async ()=>{
        
    //     const mockResponse = {
    //         friendshipId: 889,
    //         senderId: 24,
    //         receiverId: 12,
    //         accepted: false,
    //         updatedAt: '2022-11-23T16:53:39.810Z',
    //         createdAt: '2022-11-23T16:53:39.810Z'
    //     }

    //     jest.spyOn(gymPals, 'requestFriendship').mockImplementationOnce(
    //         (_palInfo) => new Promise((resolve) => resolve(mockResponse))
    //     );

    //     const receiverUserId = null;
    //     const senderUserId = 24;

    //     let error = new ServerError();
    //     error.ServerError(400, 'Requisição feita de forma incorreta.');

        
    //     await expect(
    //         gymPals.requestFriendship(senderUserId, receiverUserId)
    //     ).rejects.toEqual(error);
    //     expect(gymPals.requestFriendship).toHaveBeenCalledTimes(1);
    //     expect(gymPals.requestFriendship).toHaveBeenCalledWith(receiverUserId);

    //     jest.clearAllMocks();
    // });
});

describe("Get pending friendship requests", ()=>{

    it("Shound be able to get pending requests", async ()=>{
        
        const mockResponse = {
            friendshipId: 889,
            senderId: 24,
            receiverId: 12,
            accepted: true,
            updatedAt: '2022-11-23T16:53:39.810Z',
            createdAt: '2022-11-23T16:53:39.810Z'
        }

        jest.spyOn(queryGymPal, 'getPendingFriendshipRequests').mockImplementationOnce(
            (_palInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 24;

        const pal = await gymPals.getPendingFriendshipRequests(userId);
        
        expect(queryGymPal.getPendingFriendshipRequests).toHaveBeenCalledTimes(1);
        expect(queryGymPal.getPendingFriendshipRequests).toHaveBeenCalledWith(userId);
        expect(pal).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});