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

            const NEW_FRIENDSHIP = await QUERY_GYM_PALS.addPal(senderUserId, receiverUserId);

            return NEW_FRIENDSHIP;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new GymPals;