import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IOneProduct } from '../Shared Classes/IOneProduct';

@Injectable({
  providedIn: 'root'
})
export class OneProductService {

  constructor(private http: HttpClient) { }
  GetProduct(productId: number): Observable<IOneProduct> {
    return this.http.get<IOneProduct>(
      'http://localhost:18352/api/Products/' + productId
    ).pipe(catchError((err) => {
      return throwError(() => err.msg || "server Error")
    }));
  }
}
