/**
 * return to date
 * @param {string} date
 * @returns date dd mm yy
 */
function toDate(d) {
  d = String(d);
  let dateString = d.slice(0,10);
  let date = new Date(dateString);
  let dateLocal = date.toLocaleDateString();
  // return dateLocal ;
  return dateString;
}

export default {
  toDate,
}
