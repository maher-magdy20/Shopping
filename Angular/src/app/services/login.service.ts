import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { userReg } from '../Shared Classes/IuseeReg';
//import { userReg } from 'src/Shared Classes/IuseeReg';

let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  });

  let options = { headers: headers };
//   const httpOptions = {
//   headers: new HttpHeaders({  "accept": "*/*" ,
//   'Content-Type':'application/json' })
// };

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  AUTH_API : string = "http://localhost:18352/api/Authenticate/register";
  constructor(private http: HttpClient) { }
  user:userReg={
    email:"",
    password:"",
    username:""
  }
  register(username: string, email: string, password: string):
   Observable<any> {
    this.user.email=email;
    this.user.password=password;
    this.user.username=username;

const body=JSON.stringify(this.user);
console.log(body);
    return this.http
    .post("http://localhost:18352/api/Authenticate/register",
     body,options).pipe(map(data => {
      console.log("regg  "+data)
      console.log("Here will be return response code Ex :200",
       data.toString())
      return data.toString()
        }));
  }
}


