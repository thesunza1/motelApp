import {api} from '../axios'

async function outRoom(userId) {
  const res = api.post('adminOutRoom',{
    userId : userId,
  });
  return res?.data ;
}

export default {
  outRoom,
}
