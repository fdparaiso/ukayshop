import { Injectable } from '@angular/core';
import { Observable, sample } from 'rxjs';
import { sample_clothes, sample_tags } from 'src/data';
import { Clothes } from '../shared/models/Clothes';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { CLOTHES_BY_ID_URL, CLOTHES_BY_SEARCH_URL, CLOTHES_BY_TAG_URL, CLOTHES_TAGS_URL, CLOTHES_URL } from '../shared/models/constants/urls';


@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  constructor(private http:HttpClient) { }


  getAll(): Observable<Clothes[]>{
    return this.http.get<Clothes[]>(CLOTHES_URL);
  }

  getAllClothesBySearchTerm(searchTerm: string){
    return this.http.get<Clothes[]>(CLOTHES_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(CLOTHES_TAGS_URL);
  }

  getAllClothesByTag(tag: string):Observable<Clothes[]>{
    return tag === "All"?
    this.getAll():
    this.http.get<Clothes[]>(CLOTHES_BY_TAG_URL + tag);
  }

  getClothesById(clothesId: string): Observable<Clothes>{
    return this.http.get<Clothes>(CLOTHES_BY_ID_URL+ clothesId);
  }
}
