import {api} from '../axios'

/**
 * change status for post
 * @param {int} postId post id
 * @returns statusCode
 */
async function changeState(postId) {
  const res = await  api.post('changeStatusPost' , {
    postId : postId,
  });
  return res?.data;
}

/**
 * get roomtypes->posts ;
 */
async function getPostMotel(motelId) {
  const res =await api.get('getPostMotel/'+motelId);
  return res?.data;
}

/**
 * create post all room_type when don't have post
 * @returns response obj : statusCode
 */
async function createPostMotel(motelId) {
  const res =await api.post('createPostMotel',{motelId: motelId}) ;
  return res?.data;
}

export default {
  changeState,
  getPostMotel,
  createPostMotel,
}
