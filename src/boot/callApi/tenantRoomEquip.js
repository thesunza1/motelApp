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
    res = await api.get(`getAllTRE/${motelId}/${order}/${from}/${to}`);
  } else {
    res = await api.get(`getAllTRE/${motelId}/${order}`);
  }
  return res.data;
}

export default {
  changeStatusRE,
  getAllTRE,
};
