import {api} from '../axios'


async function sendReport(type , postId , motelId , roomTypeId , userId,content ){
  const res = await api.post('sendReport' , {
    type: type,
    postId : postId,
    motelId: motelId,
    roomTypeId: roomTypeId,
    senderId: userId,
    content: content ,
  });
  return res?.data ;
}

export default {
  sendReport,
}
