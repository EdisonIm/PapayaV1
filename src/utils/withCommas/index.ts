/**
 *
 * @param {number} price
 */
// const DAILYFOOD = 1; //정기식사
// const PRODUCT = 2; //마켓
// const MEMBERSHIP = 3; //멤버십
// const CATERING = 4; //케이터링

export default function withCommas(p: number) {
  if (!p) return '0';
  let price = p.toString()?.replace(',', '');
  return Math.round(Number(price))
    .toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
