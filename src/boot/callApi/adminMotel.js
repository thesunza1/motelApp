import {api} from '../axios'

/**
 * get all motel
 * @returns {object} statusCode , motels ;
 */
async function getAllMotel() {
  const res = await api.get('getAllMotel');
  return res?.data ;
}

/**
 * search a motel object
 * @param {int} motelId motel id
 * @param {int} userId user id
 * @returns {object} statusCode , motel object
 */
async function findMotel(motelId, userId) {
  let data = { motelId : motelId, userId: userId}
  const res = await api.post('findMotel', data);
  return res?.data ;
}

export default {
  getAllMotel,
  findMotel,
}
