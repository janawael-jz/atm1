export interface Payment {
  _id?: string;
  orderId: string;
  person: number;
  amount?: number;
  paymentMethod: 'Visa';
  status: 'pending' | 'success' | 'failed';
  createdAt?: string;
  updatedAt?: string;
}