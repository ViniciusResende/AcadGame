const SERVER_ERROR = require('../../utils/serverErrors');

const GYM_PALS_DB_ADAPTER = require('../../adapters/gymPal/gymPalDBAdapter');

class QueryGymPals {
    async addPal(senderUserId, receiverUserId) {
        try {
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