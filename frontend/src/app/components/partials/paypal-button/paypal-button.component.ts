import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit{
  @Input()
  order!:Order;


  constructor(){}
  ngOnInit(): void {


  }

}
