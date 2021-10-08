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
*@param {string} pass string password
*@returns {object} data
*/
async function updateUser(user, pass) {
  //id , name , phone_number , birth_date , job
  const data = {
    name : user.name ,
    password : pass ,
    job: user.job,
    phone_number: user.phone_number,
    birth_date : user.birth_date,
    email : user.email
  };
  const res = await api.put('updateUser/'+user.id , data);
  return res?.data;
}

//delete user ;
/**
* detelte user
*@param {int} userId
*@returns {object} data
*/
async function deleteUser(userId) {
  const res = await api.put('deleteUser/'+userId );
  return res?.data;
}

export default {
  getAllUser,
  updateUser,
  deleteUser,
}
