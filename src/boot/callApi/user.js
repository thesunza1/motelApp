import {api} from '../axios';

/**
 *
 * @param {String} email email user
 * @returns user obj
 */
async function findUser(email) {
  const res = await api.get('findUser/'+email);
  return res?.data.user;
}

export default {
  findUser ,
}
