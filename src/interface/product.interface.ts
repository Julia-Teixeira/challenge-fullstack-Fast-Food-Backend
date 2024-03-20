interface TProduct {
  id: number;
  name: string;
  price: number | any;
  description: string | null;
  imgCover: string;
  createdAt: Date;
  category_id: number;
}

interface TProductReturnById extends TProduct {
  additionalIds: number[];
}

interface TProductService {
  findAll: () => Promise<TProduct[]>;
  findProductById: (id: number) => Promise<TProductReturnById>;
}

export { TProduct, TProductService, TProductReturnById };
