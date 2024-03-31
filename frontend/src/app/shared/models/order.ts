import { CartItem } from "./CartItem";

export class Order{
  [x: string]: any;
  id!:number;
  items!: CartItem[];
  totalPrice!:number;
  name!: string;
  address!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
