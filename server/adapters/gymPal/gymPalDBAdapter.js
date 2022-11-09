const GYM_PALS = require('../../infrastructure/models/gymPals');

const { Op } = require('sequelize');

const SERVER_ERROR = require('../../utils/serverErrors');

class GymPalsDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt'];

    async addNewPal(senderUserId, receiverUserId) {
        try {
            let newFriendship = await GYM_PALS.findOrCreate({
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

            newFriendship = newFriendship[0].dataValues;
            Object.keys(newFriendship).forEach(attribute => {
                if (this.unnecessaryAttributes.includes(attribute)) 
                    delete newFriendship[attribute];
            });
    
            return newFriendship;
        }
        catch (err) {
            throw err;
        }
    }

    async confirmFriendship(friendshipId) {
        try {
            let friendship = await GYM_PALS.findOne({
                where: {
                    friendshipId: friendshipId
                }
            });

            if(!friendship) {
                let error = new SERVER_ERROR;
                error.ServerError(404, 'Pedido de amizade não encontrado.');

                throw error;
            }

            friendship['accepted'] = true;

            await friendship.save({
                fields: Object.keys(friendship.dataValues)
            });
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new GymPalsDatabaseAdapter;