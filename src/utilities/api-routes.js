export const host = 'http://localhost:7000';

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const rtRoute = `${host}/api/auth/refresh-token`;

export const avatarRoute = `${host}/api/auth/set-avatar`;

export const contactsRoute = `${host}/api/users`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
export const clearChatRoute = `${host}/api/messages/clearchat`;
