import User from './user.js';
import Friend from './friend.js';
import Chat from './chat.js';

// friend relationship
User.hasMany(Friend, { as: 'sentRequests', foreignKey: 'user_Id' });
User.hasMany(Friend, { as: 'receivedRequests', foreignKey: 'friend_Id' });
Friend.belongsTo(User, { as: 'requester', foreignKey: 'user_Id' });
Friend.belongsTo(User, { as: 'receiver', foreignKey: 'friend_Id' });


//chat relationship
User.hasMany(Chat, { as: 'sentRequests', foreignKey: 'sender_id' });
User.hasMany(Chat, { as: 'receivedRequests', foreignKey: 'receiver_id' });
Chat.belongsTo(User, { as: 'requester', foreignKey: 'sender_id' });
Chat.belongsTo(User, { as: 'receiver', foreignKey: 'receiver_id' });

export { User, Friend, Chat };