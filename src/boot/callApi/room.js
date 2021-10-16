import { api } from "../axios";

/**
 * get room infor ;
 * @param {Integer} roomId room for id
 * @returns response obj
 */
async function getRoom(roomId) {
  const res = await api.get('getRoom/'+roomId);
  return res?.data ;
}

/**
 * confirm num status
 * @param {Integer} tenantId
 * @returns response obj
 */
async function confirmNum(tenantId) {
  const res = await api.get('confirmNum/'+tenantId);
  return res?.data ;
}

/**
 * confirm num status
 * @param {Integer} tenantId
 * @returns response obj
 */
async function confirmEq(tenantId) {
  const res = await api.get('confirmEq/'+tenantId);
  return res?.data ;
}
export default {
  getRoom,
  confirmNum,
  confirmEq,
}
