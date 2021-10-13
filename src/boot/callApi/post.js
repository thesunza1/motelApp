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
async function getMotel() {
  const res =await api.get('getPostMotel');
  return res?.data;
}

/**
 * create post all room_type when don't have post
 * @returns response obj : statusCode
 */
async function createMotel() {
  const res =await api.post('createPostMotel') ;
  return res?.data;
}

export default {
  changeState,
  getMotel,
  createMotel,
}
