export const apiHost = ({start, size}: {start: number, size: number}) =>
  `http://localhost:5001/listOrders?start=${start}&size=${size}`;
