import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Interface } from 'readline';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../Shared Classes/IProduct';

@Injectable({
  providedIn: 'root',
})
export class AllProductsService {
  BaseUrel: string = "http://localhost:18352/api/";
  constructor(private http: HttpClient) { }
  GetAllProducts(start: number, categoryid: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      this.BaseUrel + 'Products/GetProducts/' + (start*12) + '/' + categoryid
    ).pipe(catchError((err) => {
      return throwError(() => err.msg || "server Error")
    }));
  }

  GetProductsCount(categoryId:number):Observable<ProductsInCategory>{
 return this.http.get( this.BaseUrel + 'Products/GetCount/'+categoryId)
 .pipe(catchError((err) => {
  return throwError(() => err.msg || "server Error")
}));
  }
}


 export class ProductsInCategory{
  Prodcount?:number
}
