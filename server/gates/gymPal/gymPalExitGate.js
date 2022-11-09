const SERVER_ERROR = require('../../utils/serverErrors');

const GYM_PALS_DB_ADAPTER = require('../../adapters/gymPal/gymPalDBAdapter');

const USER_DOMAIN = require('../../domains/user/userDomain');

class QueryGymPals {
    async addPal(senderUserId, receiverUserId) {
        try {
            const USER_RECEIVER_EXISTS = await USER_DOMAIN.getSingleUser(receiverUserId);
            if (!USER_RECEIVER_EXISTS) {
                const error = new SERVER_ERROR;
                error.ServerError(400, 'Este usuário não existe.');

                throw error;
            }

            const NEW_FRIENDSHIP = await GYM_PALS_DB_ADAPTER.addNewPal(senderUserId, receiverUserId);

            if (!NEW_FRIENDSHIP) {
                let error = new SERVER_ERROR;
                error.ServerError(500, 'Não foi possível efetuar o pedido de amizade.');

                throw error;
            }

            return NEW_FRIENDSHIP;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new QueryGymPals;