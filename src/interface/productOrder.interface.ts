interface TProductOrder {
  productId: number;
  amount: number;
  note: string;
  total: number;
  orderId?: number;
  additionalIds?: any;
}

export { TProductOrder };
