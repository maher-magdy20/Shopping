
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrder  } from './../Shared Classes/IOrder'
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class orderService {
  constructor(private http: HttpClient) {}
  Url:string='http://localhost:18352/api/Orders';

  Header(access:string) {
    let header = new HttpHeaders().set("Authorization", "Bearer "+ access);
    const options = {
      headers: header,
    };
    return options;
  }

  GetAllOrders(access:string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.Url,this.Header(access)).pipe(catchError((err)=>{
      return throwError(err.message ||"Server Error");
    }))
  }

  DeleteOrder(OrderID:number,access:string){
    return this.http.delete(this.Url+"/"+OrderID+"",this.Header(access)).pipe(catchError((err)=>{
      return throwError(err.message ||"Not allowed");
    }))
  }
  
  
  AddOrder(addres:string,phone:string,acces:string){
    let bj:Object={
      address:addres,
      phone:phone
    }
    return this.http.post(this.Url,bj,this.Header(acces)).pipe(catchError((err)=>{
      return throwError(err.message ||"Not allowed");
    }))
  }

}
interface Object{
  address:string,
  phone:string
}