import { Component, OnInit } from '@angular/core';
import { ClothesService } from 'src/app/services/clothes.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{
  tags?:Tag[];
constructor(clothesService:ClothesService){
  clothesService.getAllTags().subscribe(serverTags =>{
    this.tags = serverTags;
  });
}

  ngOnInit(): void {

  }

}
