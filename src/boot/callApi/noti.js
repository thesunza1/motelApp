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

export default {
  toIcon,
  toColor,
  sendReport,
  toNotiTypeOt,
  findNoti,
};
