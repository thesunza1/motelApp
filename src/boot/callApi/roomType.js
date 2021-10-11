import {api} from '../axios' ;

/**
 * delete roomType in id roomtype
 * @param {integer} roomTypeId  room type id for motel user
 * @returns  respone object
 */
async function deleteRoomType(roomTypeId) {
  const res = await api.post('deleteRoomType', {
    'roomTypeId' : roomTypeId,
  });
  return res?.data;
}

export default {
  deleteRoomType ,
}
