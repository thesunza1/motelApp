import {api} from '../axios';

//get all user ;
/**
* detelte user
*
*@returns {object} data
*/
async function getAllUser() {
  const res = await api.get('getAllUser') ;
  return res.data;
}

//update user ;
/**
* detelte user
*@param { object} user element require
*@returns {object} data
*/
async function updateUser(user) {
  const res = await api.put('updateUser/'+user.id , user);
  return res?.data;
}

//delete user ;
/**
* detelte user
*@param {int} userId
*@returns {object} data
*/
async function deleteUser(userId) {
  const res = await api.post('deleteUser/'+userId );
  return res?.data;
}

export default {
  getAllUser,
  updateUser,
  deleteUser,
}
