import { api } from "../axios";

async function sendReport(type, postId, motelId, roomTypeId, userId, content) {
  const res = await api.post("sendReport", {
    type: type,
    postId: postId,
    motelId: motelId,
    roomTypeId: roomTypeId,
    senderId: userId,
    content: content,
  });
  return res?.data;
}

/**
 *
 * @param {*} notiTypeId 0->5 ? 0: all
 * @param {*} from  date
 * @param {*} to  date
 * @returns statusCode || noti
 */
async function findNoti(notiTypeId, from = 0, to = 0) {
  const data = {
    notiTypeId: notiTypeId,
    from: from,
    to: to,
  };
  // const [res, error] = await api.post("findNoti", data);
  const res = await api.post("findNoti", data);
  // if (error) {
  //   return {
  //     statusCode: 0,
  //   };
  // }

  return res.data;
}

/**
 *
 * @returns notis json
 */
async function getIntoNoti() {
  const res = await api.get("getIntoNoti");
  return res.data;
}

/**
 *
 * @param {Int} notiId noti id
 * @returns list room ,
 */
async function getRoomInto(notiId) {
  const res = await api.post("getRoomInto", {
    notiId: notiId,
  });
  return res.data;
}

/**
 *
 * @param {Int} roomId room id
 * @param {Int} userId User id
 * @returns statusCode
 */
async function sendInvite(roomId, userId) {
  const data = {
    roomId: roomId,
    receiverId: userId,
  };
  const res = await api.post("sendInvite", data);

  return res.data;
}

/**
 *
 * @param {*} notiId notiid
 * @param {*} inviteStatus 1 : oke , 2 : no
 * @returns statusCode
 */
async function changeIntoStatus(notiId, inviteStatus) {
  const data = {
    notiId: notiId,
    inviteStatus: inviteStatus,
  };

  const res = await api.post("changeIntoStatus", data);

  return res.data;
}

/**
 *
 * @param {*} motelId motel id
 * @param {*} senderId receiverid ,
 * @returns
 */
async function sendReject(motelId,  senderId , content) {
  const data = {
    motelId: motelId,
    receiverId: senderId,
    content: content,
  };
  const res = await api.post('sendReject', data);
  return res.data ;
}

/**
 *
 * @param {Integer} type_id 1-> 5
 * @returns string icon properti
 */
function toIcon(type_id) {
  return type_id == 1
    ? "info"
    : type_id == 2
    ? "report_problem"
    : type_id == 4
    ? "check"
    : "person_add";
}
/**
 *
 * @param {Integer} type_id 1-> 5
 * @returns string icon properti
 */
function toColor(type_id) {
  return type_id == 1
    ? "text-purple"
    : type_id == 2
    ? "text-red"
    : type_id == 4
    ? "text-warning"
    : "text-primary";
}

function toNotiTypeOt() {
  const data = [
    {
      label: " Tất cả",
      value: 0,
    },
    {
      label: "Thông báo",
      value: 1,
    },
    {
      label: " Báo cáo",
      value: 2,
    },
    {
      label: "Lưu ý",
      value: 4,
    },
    {
      label: " Mời vào",
      value: 3,
    },
    {
      label: "Xin vào trọ",
      value: 5,
    },
  ];
  return data;
}

/**
 *
 * @param {Integer} status 0: none , 1: yes , 2 : no
 * @returns string
 */
function toIntoNotiStatus(status) {
  const res =
    status == 0 ? " Chưa giải quyết" : status == 1 ? " Đã mời vào" : "Đã từ chối";
  return res;
}

/**
 *
 * @param {Integer} status 0: none , 1: yes , 2 : no
 * @returns color class
 */
function toIntoNotiStatusColor(status) {
  const res = status == 0 ? "black" : status == 1 ? "positive" : "negative";
  return res;
}
export default {
  toIcon,
  toColor,
  sendReport,
  toNotiTypeOt,
  findNoti,
  toIntoNotiStatus,
  getIntoNoti,
  toIntoNotiStatusColor,
  getRoomInto,
  sendInvite,
  changeIntoStatus,
  sendReject,
};
