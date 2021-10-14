/**
 * return to date
 * @param {string} date
 * @returns date dd mm yy
 */
function toDate(d) {
  d = String(d);
  return d.slice(0,10) ;
}

export default {
  toDate,
}
