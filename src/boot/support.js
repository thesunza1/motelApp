/**
 * count length array
 * @param {Array} arr array
 * @returns length
 */
function length(arr) {
  try {
    return `${arr.length}`;
  } catch (error) {
    return 0; 
  }
}

/**
 * return numRooms in array
 * @param {array} rooms arr room
 * @param {Integer} status 1,2,3
 * @returns num room for status
 */
function numRoom(rooms, status) {
  var num = 0;
  Array.prototype.forEach.call(rooms, (element) => {
    if (element.room_status_id == status) {
      num++;
    }
  });
  return num;
}
/**
 * count numbill with status
 * @param {Array} bills bill array
 * @param {Integer} status 0,1
 * @returns num staturs bill
 */
function numBill(bills, status) {
  var num = 0;
  Array.prototype.forEach.call(bills, (element) => {
    if (element.status == status) {
      num++;
    }
  });
  return num;
}

function toSex(sex) {
  if (sex == 0) return "nam";
  else if (sex == 1) return "nữ";
  return "";
}

function toNum(num) {
  num = Number(num);
  return num.toLocaleString("it-IT");
}
/**
 *
 * @param {Integer} role_id
 * @returns {String}
 */
function getRole(role_id) {
  if (role_id == 1) {
    return "Người dùng ";
  }
  if (role_id == 2) {
    return "Chủ trọ ";
  }
  if (role_id == 3) {
    return "Quản trị ";
  }
}
export default {
  length,
  numRoom,
  toSex,
  numBill,
  toNum,
  getRole,
};
