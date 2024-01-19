import { LoginService } from './../services/AuthentactionService';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { LoginService } from '../services/login.service';
import { userReg } from '../Shared Classes/IuseeReg';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  sources = ['Linkedin', 'Wuzzef', 'Facebook']
  constructor(private router:Router,private FB:FormBuilder,private loginServes:LoginService ) { }
  
  RegisterForm=this.FB.group({
    UserName:["",[Validators.required,Validators.pattern("^[A-Za-z_]{6,}$")]],
    Email:["",[Validators.required,Validators.email,Validators.pattern("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")]],
    Password:["",[Validators.required,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]],
    ConfirmPassword:["",[Validators.required,Validators.pattern("")]],
    About:["",Validators.required]
  },{validator:[validateConfirmPassword]})
  get UserName(){
      return this.RegisterForm.get("UserName")
  }
  get Email(){
    return this.RegisterForm.get("Email")
  }

  get Password(){
    return this.RegisterForm.get("Password")
  }

  get ConfirmPassword(){
    return this.RegisterForm.get("ConfirmPassword")
  }
  get About(){
    return this.RegisterForm.get("About")
  }

  ngOnInit(): void {
   
  }
  response:any=""
  Register(){
    console.log("asd");
    this.loginServes.register(this.UserName?.value,this.Email?.value,this.Password?.value).subscribe(data=>{
      console.log(data),
      this.login()
      
    },
    err=>console.log(err.error.message)
    );
     console.log(this.response);
  }
  login ()
{
    this.loginServes.login(this.UserName?.value,this.Password?.value).subscribe(data=>{
      localStorage.setItem('Alasly-Token',data.token);
      localStorage.setItem('Alasly-UserName',this.UserName?.value);
      this.router.navigate(['/home'])
    },error=>{
      console.log("dsfcsd"+error)
    });
}
}
export function validateConfirmPassword(control:AbstractControl){
  const Password=control.get("Password")
  const ConfirmPassword=control.get("ConfirmPassword")
  console.log("In confirmed Password"+Password?.value)
  return Password&&ConfirmPassword&&Password.value != ConfirmPassword.value?{"Miss_match":true}:null;
}
