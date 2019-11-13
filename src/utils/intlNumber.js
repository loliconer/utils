/*
 * 将数字按国际化格式显示
 *
 * @access public
 * @function intlNumber
 * @param {number} value - 待处理数字
 * @param {number} maximumFractionDigits - 使用的小数位数的最大数目
 * @param {number} minimumFractionDigits - 使用的小数位数的最小数目
 * @returns {string}
 * */

export default (value, maximumFractionDigits = 6, minimumFractionDigits = 0) => {
  if (typeof Intl === 'undefined') return value
  if (value === undefined) return 0

  return new Intl.NumberFormat(undefined, { maximumFractionDigits, minimumFractionDigits }).format(value)
}
