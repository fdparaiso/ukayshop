import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ClothesService } from 'src/app/services/clothes.service';
import { Clothes } from 'src/app/shared/models/Clothes';

@Component({
  selector: 'app-clothes-page',
  templateUrl: './clothes-page.component.html',
  styleUrls: ['./clothes-page.component.css']
})
export class ClothesPageComponent  implements OnInit {
  clothes!:Clothes;

  constructor(activatedRoute:ActivatedRoute, clothesService:ClothesService,
    private cartService:CartService, private router:Router){
    activatedRoute.params.subscribe((params=>{
      if (params.id)
      clothesService.getClothesById(params.id).subscribe(serverClothes =>{
        this.clothes = serverClothes;
      });
    }))

  }

  ngOnInit(): void {

  }

    addToCart(){
      this.cartService.addToCart(this.clothes);
      this.router.navigateByUrl('/cart-page');

    }
}
