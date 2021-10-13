import { Notify } from "quasar";

/**
 * show noti with
 * @param {string} mess messenger
 * @param {string} col color
 * @returns none
 */
function showNoti(mess,col) {
  Notify.create({
    message:mess,
    color: col ,
    timeout: 3000,
    position: "top" ,
  });
}

/**
 * show noti for statusCode ;
 * @param {Integer} statusCode 1 ,0
 */
function NotiStatusCode(statusCode) {
  if(statusCode ==1) {
    this.showNoti('thành công' , 'positive');
  } else {
    this.showNoti(' thất bại' , 'negative');
  }
}

export default {
  showNoti,
  NotiStatusCode,
}
