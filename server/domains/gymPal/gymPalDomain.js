const SERVER_ERROR = require('../../utils/serverErrors');

const QUERY_GYM_PALS = require('../../gates/gymPal/gymPalExitGate');

class GymPals {
    async requestFriendship(senderUserId, receiverUserId) {
        try {
            if (!senderUserId || !receiverUserId) {
                const error = new SERVER_ERROR;
                error.ServerError(400, 'Requisição feita de forma incorreta.');

                throw error;
            }

            if (senderUserId == receiverUserId) {
                const error = new SERVER_ERROR;
                error.ServerError(400, 'Você não pode enviar uma solicitação de amizade para si mesmo.');

                throw error;
            }

            const NEW_FRIENDSHIP = await QUERY_GYM_PALS.addPal(senderUserId, receiverUserId);

            return NEW_FRIENDSHIP;
        }
        catch (err) {
            throw err;
        }
    }

    async getPendingFriendshipRequests(userId) {
        try {
            const PENDING_FRIENDSHIP_REQUESTS = await QUERY_GYM_PALS.getPendingFriendshipRequests(userId);

            return PENDING_FRIENDSHIP_REQUESTS;
        }
        catch (err) {
            throw err;
        }
    }

    async acceptFriendshipRequest(friendshipId) {
        try {
            await QUERY_GYM_PALS.acceptFriendshipRequest(friendshipId);
        }
        catch (err) {
            throw err;
        }
    }

    async rejectFriendshipRequest(friendshipId) {
        try {
            await QUERY_GYM_PALS.rejectFriendshipRequest(friendshipId);
        }
        catch (err) {
            throw err;
        }
    }

    async getUserGymPals(userId) {
        try {
            const USER_GYM_PALS = await QUERY_GYM_PALS.getUserGymPals(userId);

            return USER_GYM_PALS;
        }
        catch (err) {
            throw err;
        }
    }

    async removeGymPal(friendshipId) {
        try {
            await QUERY_GYM_PALS.removeGymPal(friendshipId);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new GymPals;