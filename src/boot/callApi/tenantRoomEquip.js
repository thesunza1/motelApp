import { api } from "../axios";

/**
 *
 * @param {Int} tenantId tenant room equip id
 * @param {int} status 0: none , 1 : oke , 2: no ;
 * @returns  data.statusCode
 */
async function changeStatusRE(tenantId, status) {
  const URL = "tREStatus";
  const data = {
    id: tenantId,
    status: status,
  };
  const res = await api.post(URL, data);
  return res.data;
}
/**
 *
 * @param {*} motelId motelid
 * @param {*} order 0: bt ,1:desc
 * @param {*} from date
 * @param {*} to date
 * @returns response data
 */
async function getAllTRE(motelId, order = 0, from = 0, to = 0) {
  var res;
  if (from != 0) {
    res = await api.post(`getAllTRE`,
      {
        motelId: motelId,
        order: order,
        from: from ,
        to: to ,
      }
    );
  } else {
    res = await api.get(`getAllTRE/${motelId}/${order}`);
  }
  return res.data;
}

/**
 *
 * @param {FormData} fd eqName , eqContent , eqImg1->3 , eqImg_num , tenantId
 * @returns  statusCode ,
 */
async function eqCreate(fd) {
  const hd = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  }
  const res = await api.post("eqCreate",fd, hd );
  return res.data;
}
/**
 *
 * @param {Interge} status 0: none ,1: oke , 2 : no
 * @returns return text from status
 */
function statusText(status) {
  return status == 0 ? 'Chưa xác nhận' : status == 1 ? 'Đã xác nhận' : 'Không đồng Ý' ;
}

/**
 *
 * @param {Interge} status 0: none ,1: oke , 2 : no
 * @returns return color text
 */
function statusColor(status) {
  return status == 0 ? 'black' : status == 1 ? 'green' : 'red' ;
}
export default {
  changeStatusRE,
  getAllTRE,
  statusText,
  statusColor,
  eqCreate,
};
