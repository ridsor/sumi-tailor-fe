export interface OrderType {
  item_code: string;
  name: string;
  no_hp: string;
  address: string;
  price: number | null;
  note: string;
  status: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface OrderHistoryType {
  item_code: string;
  name: string;
  no_hp: string;
  address: string;
  price: number | null;
  note: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}
