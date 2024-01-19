import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Icart } from '../Shared Classes/Icart';
import { Posproduct } from '../Shared Classes/posproduct';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


constructor(private _http:HttpClient) { }
Header(access:string) {
      let header = new HttpHeaders().set("Authorization", "Bearer "+ access);
      const options = {
        headers: header,
      };
      return options;
    }

  getcard(access:string):Observable<Icart>
  {
      return this._http.get<Icart>('http://localhost:18352/api/Carts/GETCart',this.Header(access)).pipe(catchError((err)=>{
               return throwError(err.message ||"Server Error");
           }))
  }
  deletfromcart(id:number,access:string)
  {

   return this._http.delete('http://localhost:18352/api/Carts/DeleteProduct?product_id='+id+'',this.Header(access)).pipe(catchError((err)=>{
               return throwError(err.message ||"Server Error");
           }))
          }

  posttocard(p:Posproduct,access:string)
  {


   return this._http.post('http://localhost:18352/api/Carts/AddProductToCart',p,this.Header(access)).pipe(catchError((err)=>{
    return throwError(err.message ||"Server Error");
        }))
  }

  DeleteCart(access:string)
  {


   return this._http.delete('http://localhost:18352/api/Carts/DeleteCart',this.Header(access)).pipe(catchError((err)=>{
    return throwError(err.message ||"Server Error");
        }))
  }


  UpdateCart(p:Posproduct[],access:string)
  {
     return this._http.put('http://localhost:18352/api/Carts/UpdateCart',p,this.Header(access)).pipe(catchError((err)=>{
      return throwError(err.message ||"Server Error");
          }))
  }
}


// export class favouriteService {
//   constructor(private http: HttpClient) {}
//   Url:string='http://localhost:18352/api/Favourits';
 // access:string="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQmVzaG95IiwianRpIjoiMTM0YmFiZmYtMDFiOS00ZGIzLWE4MGUtNzVhMzI2NzNhYTc2IiwiZXhwIjoxODA2OTQ4MzAyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.yBVFOm0uNyBlxTgS0EhRW2ivkgl0Dl4xaekpH6zrY-g"

//    Header(access:string) {
//     let header = new HttpHeaders().set("Authorization", "Bearer "+ access);
//     const options = {
//       headers: header,
//     };
//     return options;
//   }
//   GetAllFavourites(access:string): Observable<IProduct[]> {
//     return this.http.get<IProduct[]>(this.Url,this.Header(access)).pipe(catchError((err)=>{
//       return throwError(err.message ||"Server Error");
//     }))
//   }

//   DeleteFavourite(ProductId:number,access:string){
//     return this.http.delete(this.Url+"/"+ProductId+"",this.Header(access)).pipe(catchError((err)=>{
//       return throwError(err.message ||"Not allowed");
//     }))
//   }

//   Addfavourite(ProductId:number,access:string){
//     return this.http.post(this.Url+"?ProductID="+ProductId+"",this.Header(access)).pipe(catchError((err)=>{
//       return throwError(err.message ||"Not allowed");
//     }))
//   }
// }



