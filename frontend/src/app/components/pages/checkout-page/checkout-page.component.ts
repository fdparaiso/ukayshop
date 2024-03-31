import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order:Order = new Order();
  checkoutForm!: FormGroup;

  constructor(cartService:CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orderService:OrderService,
    private router:Router) {
      const cart = cartService.getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;
    }
  ngOnInit(): void {
    let { name, address} = this.userService.currentUser
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder() {
    this.checkoutForm.markAllAsTouched(); // Add this line to mark all controls as touched

    if (this.checkoutForm.invalid) {
      Swal.fire({
        title: 'Invalid Inputs',
        text: 'Please fill the inputs',
        icon: 'warning'
      });
      return;
    }


    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },

    });
  }
}
