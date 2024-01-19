import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../Shared Classes/IProduct';

@Injectable({
  providedIn: 'root'
})
export class SimilarProductService {

  constructor(private http: HttpClient) { }
  GetSimilarProducts(typeid: number, categoryid: number, productid: number): Observable<IProduct[]> 
  {
    return this.http.get<IProduct[]>(
      'http://localhost:18352/api/Products/GetSimilar/' + typeid + '/' + categoryid + '/' + productid
    ).pipe(catchError((err)=>{
      return throwError(()=>err.msg||"server Error")
    }));
  }
}
