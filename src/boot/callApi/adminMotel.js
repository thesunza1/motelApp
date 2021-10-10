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

/**
 * get motel for admin
 * @param {int} motelId motel id
 * @returns {object} motel-user , roomtype-room-tenant-tuser-user, motel-mimg-imgs
 */
async function  getMotel(motelId) {
  const res = await api.get('adminGetMotel/'+motelId) ;
  return res?.data ;
}

/**
 * deleate motel for admin
 * @param {int} motelId  motel id
 * @returns statusCode
 */
async function deleteMotel(motelId) {
  const res  = await api.post('deleteMotel' , {
    motelId : motelId,
  });
  return res?.data;
}
export default {
  getAllMotel,
  findMotel,
  getMotel,
  deleteMotel,
}
