export interface OrderItem {
  menuItem: string;
  quantity: number;
  price?: number;
}

export interface SplitBillPerson {
  person: number;
  amount: number;
  status: 'pending' | 'paid';
}

export interface Order {
  _id?: string;
  items: OrderItem[];
  totalAmount?: number;
  numberOfPeople: number;
  splitBill?: SplitBillPerson[];
  status?: 'pending' | 'paid';
  createdAt?: string;
  updatedAt?: string;
}