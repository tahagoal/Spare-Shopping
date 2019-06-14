import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fruit } from '../Models/fruit';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private httpclient: HttpClient
  ) { }

  getAllfruits():Observable<Fruit[]>{
    return this.httpclient.get<Fruit[]>('./assets/data/fruits.json').pipe(
      map( res => {
        let results = res.map(item => {
          return new Fruit(
            item.name,
            item.weight,
            item.unit,
            item.price,
            item.currency,
            item.img
            ) 
        })
        return results;
      })
    )
  }
}
