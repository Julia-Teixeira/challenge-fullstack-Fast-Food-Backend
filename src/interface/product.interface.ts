interface TProduct {
  id: number;
  name: string;
  price: number;
  description: string | null;
  imgCover: string;
  createdAt: Date;
  category_id: number;
}

interface TProductService {
  findAll(): Promise<
    {
      id: number;
      name: string;
      price: number | any;
      description: string | null;
      imgCover: string;
      createdAt: Date;
      category_id: number;
    }[]
  >;
}

export { TProduct, TProductService };
