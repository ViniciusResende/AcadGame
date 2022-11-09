const GYM_PALS = require('../../infrastructure/models/gymPals');

const { Op } = require('sequelize');

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
}

module.exports = new GymPalsDatabaseAdapter;