import {api} from '../axios';

/**
 *
 * @param {int} userId id user
 * @returns user obj
 */
async function findUser(userId) {
  const res = await api.get('findUser/'+userId);
  return res?.data.user;
}

export default {
  findUser ,
}
