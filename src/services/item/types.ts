export type Item = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  year: number;
  sku: string;
  image_url: string;
  stock: number;
  sold: number;
  price: number;
  gst: number;
  details: ItemDetails[];
  slug: string;
  created_at: number;
  updated_at: number;
};

type ItemDetails = {
  id: string;
  item_id: string;
  attribute: string;
  value: string;
  created_at: string;
  updated_at: string;
};
