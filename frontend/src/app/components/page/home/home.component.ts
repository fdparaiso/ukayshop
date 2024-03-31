import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClothesService } from 'src/app/services/clothes.service';
import { Clothes } from 'src/app/shared/models/Clothes';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  clothes:Clothes[]=[];

  constructor(private clothesService:ClothesService,activatedRoute:ActivatedRoute){

      let clothesObservable:Observable<Clothes[]>;
      activatedRoute.params.subscribe((params=> {
        if(params.searchTerm)
           clothesObservable = this.clothesService.getAllClothesBySearchTerm(params.searchTerm);
        else if(params.tag)
           clothesObservable = this.clothesService.getAllClothesByTag(params.tag);
        else
           clothesObservable = clothesService.getAll();

           clothesObservable.subscribe((serverClothes)=>{
               this.clothes = serverClothes;
        })
      }
        ))


  }
  ngOnInit(): void {

  }

}
