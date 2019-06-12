import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ShopService } from '../Services/shop.service';

@Injectable()
export class ShopResolver implements Resolve<any> {

  constructor(private http: HttpClient,
    private shopservice: ShopService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    return this.shopservice.getAllfruits().pipe(
        map( (dataFromApi) => dataFromApi ),
        catchError( (err) =>Observable.throw(err.json().error))
    )
  }
}