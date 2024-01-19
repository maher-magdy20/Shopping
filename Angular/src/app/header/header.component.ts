import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../Shared Classes/ICategory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  AllCategories?: ICategory[]
  errmsg = "";
classActive="nav-item active";
isactive:string='0';
clicked=0;
  constructor(private categorysevice: CategoryService, private router: Router) { }
  isLogin:boolean =false;
  userName:string="";
  ngOnInit(): void {
    this.categorysevice.GetAllCategories().subscribe(
      data => {
        //console.log(data)
        this.AllCategories = data
      },
      error => this.errmsg = error
    );
    window.scrollTo(0,0);
    if(localStorage.getItem('Alasly-Token')!=null)
    {
      this.isLogin=true;
      this.userName=String(localStorage.getItem('Alasly-UserName'));
      console.log(this.isLogin);
    }
  }
  GetOneCategory(id: number) {
    this.router.navigate(['category', id]);
    this.clicked=id;
    this.isactive='-1';
  }
  goToHome(){
    this.clicked=0;
    this.isactive='0';
    //this.router.navigate(['home'])
  }
  GoToSearch(value:string){
    
   if(value!=""){
    CategoryService.routTest=value
    this.router.navigate(['search', value]);
    //console.log(value)
   }
    else alert("الرجاء إدخال قيمة للبحث")
    window.scrollTo(80,80);
  }
  Logout(){
    localStorage.removeItem('Alasly-UserName'),
    localStorage.removeItem('Alasly-Token')
    window.location.replace('/home')
    //this.router.navigate(['/home'])
  }
}
