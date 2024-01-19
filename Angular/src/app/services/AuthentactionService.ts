import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { userReg,TokenMess,UserLogin } from '../Shared Classes/Authontaction';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/x-www-form-urlencoded','Access-Control-Allow-Origins':'*'})};
 
@Injectable({
  providedIn: 'root'
})

export class LoginService {

  AUTH_API : string = "http://localhost:18352/api/Authenticate/register";
  Options2 = {
    headers: new HttpHeaders({  "accept": "/" ,
    'Content-Type':'application/json' })}
  constructor(private http: HttpClient) { }
  user:userReg={
    email:"",
    password:"",
    username:""
  }

  user1:UserLogin={
    password:"",
    username:""
  }
  register(username: string, email: string, password: string): Observable<Response> {
    this.user.email=email;
    this.user.password=password;
    this.user.username=username;
    
// const body=JSON.stringify(this.user);
// console.log(body);
     return  this.http.post<Response>("http://localhost:18352/api/Authenticate/register", this.user, this.Options2) //.pipe(map(data => {
//.pipe(map(data => {
      
      //  console.log("Here will be return response code Ex :200", data.toString())
      // return data.toString()
      //    }));
  }
  login(username: string,  password: string): Observable<TokenMess> {
    
    this.user1.password=password;
    this.user1.username=username;
     return  this.http.post<TokenMess>("http://localhost:18352/api/Authenticate/login", this.user1, this.Options2) .pipe(catchError((err)=>
     {
       return throwError(err.Message)
     }));
  }
}

