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

    async getPendingRequests(userId) {
        try {
            const PENDING_FRIENDSHIP_REQUESTS = await GYM_PALS.findAll({
                where: {
                    receiverId: userId,
                    accepted: false
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            let pendingFriendshipRequests = [];
            PENDING_FRIENDSHIP_REQUESTS.forEach(request => {
                pendingFriendshipRequests.push(request.dataValues);
            });

            return pendingFriendshipRequests;
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

    async rejectFriendship(friendshipId) {
        try {
            await GYM_PALS.destroy({
                where: {
                    friendshipId: friendshipId
                }
            });
        }
        catch (err) {
            throw err;
        }
    }

    async getPals(userId) {
        try {
            const USER_GYM_PALS = await GYM_PALS.findAll({
                where: {
                    [Op.or]: [
                        {receiverId: userId},
                        {senderId: userId}
                    ],
                    accepted: true
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            let userGymPals = [];
            USER_GYM_PALS.forEach(pal => {
                userGymPals.push(pal.dataValues);
            });

            return userGymPals;
        }
        catch (err) {
            throw err;
        }
    }

    async removeGymPal(friendshipId) {
        try {
            await GYM_PALS.destroy({
                where: {
                    friendshipId: friendshipId,
                    accepted: true
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new GymPalsDatabaseAdapter;