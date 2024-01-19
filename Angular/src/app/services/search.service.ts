import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IProduct } from '../Shared Classes/IProduct';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  BaseUrel="http://localhost:18352/api/"
  constructor(private http: HttpClient) { }

  GetSearchResult(searchKey:string,start:number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      this.BaseUrel+'Products/search/'+searchKey+'/'+(start*12)
    ).pipe(catchError((err)=>{
      return throwError(()=>err.msg||"server Error")
    }));
  }
  GetProductsCount(searchKey:string):Observable<ProductsInCategory>{
    return this.http.get( this.BaseUrel + 'Products/GetSearchResultCount/'+searchKey)
    .pipe(catchError((err) => {
     return throwError(() => err.msg || "server Error")
   }));
     }
   }
   
   
    export class ProductsInCategory{
     Prodcount?:number
   }
