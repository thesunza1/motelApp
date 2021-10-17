import { api } from "../axios";

//update motel content
async function updateMotelImg(
  /*detailImgId*/ id,
  /*content string*/ content = null,
  /*place string*/ place = null,
  /*content string*/ motelContent = null
) {
  const res = await api.post("updateMotelImg", {
    detailImgId: id,
    content: content,
    place: place,
    motelContent: motelContent,
  });
  return res.data;
}
//upload room type img
async function uploadRoomImgs(fd) {
  const res = await api.post("uploadRoomImg", fd, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return res?.data;
}
//get roomtype img
async function getRoomTypeImgs() {
  const res = await api.get("getRoomTypeImgs");

  return res?.data;
}

//get motel room type
async function getMotelRoomType() {
  const res = await api.get("getMotelRoomType");
  return res?.data;
}
//get motel imgs
async function getMotelImgs() {
  const res = await api.get("getMotelImgs");
  return res?.data;
}
// add num room to room
async function addNumRoom(roomTypeId, numRoom) {
  const res = await api.post("addNumRoom", {
    roomTypeId: roomTypeId,
    numRoom: numRoom,
  });
  return res?.data;
}
//update roomtype content
async function updateRoomTypeContent(roomTypeImgs) {
  const res = await api.post("updateRoomTypeContent", roomTypeImgs);

  return res?.data;
}
//create RoomType
async function createRoomType(fd) {
  const res = await api.post("createRoomType", fd, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return res?.data ;
}

/**
 * send alll noti to user in motel
 * @param {Integer} motelId  motel id
 * @returns response data
 */
async function sendAllNotiBill(motelId){
  const res = await api.get('sendAllNotiBill/'+motelId);
  return res?.data;
}

export default {
  updateMotelImg,
  uploadRoomImgs,
  getRoomTypeImgs,
  addNumRoom,
  getMotelRoomType,
  getMotelImgs,
  updateRoomTypeContent,
  createRoomType,
  sendAllNotiBill,
};
