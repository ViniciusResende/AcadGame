const GYM_PALS = require('../../infrastructure/models/gymPals');

const { Op } = require('sequelize');

class GymPalsDatabaseAdapter {
    async addNewPal(senderUserId, receiverUserId) {
        try {
            const NEW_FRIENDSHIP = await GYM_PALS.findOrCreate({
                where: {
                    senderId: {
                        [Op.or]: [senderUserId, receiverUserId]
                    },
                    receiverId: {
                        [Op.or]: [receiverUserId, senderUserId]
                    }
                },
                defaults: {
                    senderId: senderUserId,
                    receiverId: receiverUserId,
                    accepted: false
                }
            });
    
            return NEW_FRIENDSHIP;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new GymPalsDatabaseAdapter;