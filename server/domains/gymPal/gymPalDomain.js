const SERVER_ERROR = require('../../utils/serverErrors');

const USER_DOMAIN = require('../user/userDomain');

const QUERY_GYM_PALS = require('../../gates/gymPal/gymPalExitGate');

class GymPals {
    async requestFriendship(senderUserId, receiverUserId) {
        try {
            const USER_RECEIVER_EXISTS = await USER_DOMAIN.getSingleUser(receiverUserId);
            if (!USER_RECEIVER_EXISTS) {
                const error = new SERVER_ERROR;
                error.ServerError(400, 'Este usuário não existe.');

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