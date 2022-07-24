import { httpClient } from "./httpClient";

export const host = 'http://localhost:7000';


export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const rtRoute = `${host}/api/auth/refresh-token`;

export const avatarRoute = `${host}/api/auth/set-avatar`;

export const contactsRoute = `${host}/api/users`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
export const clearChatRoute = `${host}/api/messages/clearchat`;

export const addBoardRoute = `${host}/api/boards/addboard`;
export const getBoardsRoute = `/boards/getboards`;
export const searchBoardsRoute = `${host}/api/boards/searchboards`;
export const getBoardDataRoute = `${host}/api/boards/getboarddata`;

// export const getBoardDataRoute = `${host}/api/boards/getboarddata`;

export function getBoardData(id) {
  return httpClient.get(`/boards/${id}`).then(({data}) => data);
}

export async function setColumns(id) {
  const { data } = await httpClient.post('/columns/setdefaults', {
    name: "First default",
    board: id,
  });
  return data;
}

export async function getColumns(id) {
  const response = await httpClient.post('/columns/getcolumns', {
    board: id,
  });
  return response.data;
}
