import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../Shared Classes/IProduct';

/* const httpOptions = {
  headers: new HttpHeaders({  "accept": "" ,'Content-Type': 'application/json' ,})
};
 */

@Injectable({
  providedIn: 'root',
})
export class favouriteService {
  constructor(private http: HttpClient) {}
  Url:string='http://localhost:18352/api/Favourits';

   Header(access:string) {
    let header = new HttpHeaders().set("Authorization", "Bearer "+ access);
    const options = {
      headers: header,
    };
    return options;
  }
  GetAllFavourites(access:string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.Url,this.Header(access)).pipe(catchError((err)=>{
      return throwError(err.message ||"Server Error");
    }))
  }

  DeleteFavourite(id:number,access:string){
    return this.http.delete(this.Url+"/"+id,this.Header(access)).pipe(catchError((err)=>{
      return throwError(err.message ||"Not allowed");
    }))
  }

  Addfavourite(ProductID:number,access:string){
    return this.http.post(this.Url+"?ProductID="+ProductID,[],this.Header(access)).pipe(catchError((err)=>{
      return throwError(err.message ||"Not allowed");
    }))
  }
}
