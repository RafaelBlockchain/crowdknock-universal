// src/models/payment.ts

export interface Payment {
  id: string;
  user: string;
  amount: number;
  status: string;
  date: string;
}

export const PaymentFromJson = (json: any): Payment => ({
  id: json.id,
  user: json.user,
  amount: Number(json.amount),
  status: json.status,
  date: json.date,
});
