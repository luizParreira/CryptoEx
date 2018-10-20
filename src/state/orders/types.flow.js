// @flow

export type Sell = 'sell';
export type Buy = 'buy';
export type OrderType = Sell | Buy;

export type Order<Type> = {|
  id: number,
  quantity: number,
  price: number,
  formattedPrice?: string,
  type: Type
|};

export type Orders = Array<Order<OrderType>>;

export type OrderBookOrders = [Array<Order<Buy>>, Array<Order<Sell>>];

export type RemoteData<Data, Error> = {|
  data: ?Data,
  error: ?Error,
  loading: boolean
|};

export type State = {|
  orders: RemoteData<Orders, string>
|};
