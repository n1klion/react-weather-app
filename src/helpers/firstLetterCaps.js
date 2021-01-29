/**
 * Function for caps first letter
 * @param {String} str 
 * @returns {String}
 */
function firstLetterCaps(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default firstLetterCaps