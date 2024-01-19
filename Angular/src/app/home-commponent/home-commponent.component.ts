import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsInHomeService } from '../services/products-in-home.service';
import { IProduct } from '../Shared Classes/IProduct';

@Component({
  selector: 'app-home-commponent',
  templateUrl: './home-commponent.component.html',
  styleUrls: ['./home-commponent.component.scss']
})
export class HomeCommponentComponent implements OnInit {
  Products:IProduct[]=[];
  discountProducts:IProduct[]=[];
  normalProducts:IProduct[]=[];
  errormsg:string=""
  constructor(private inHomeProdService:ProductsInHomeService,private router:Router) { }

  ngOnInit(): void {
    this.inHomeProdService.GetAllProducts().subscribe(
      data=>{
        this.Products=data;
        this.filterProducts();
      },
      error=>{this.errormsg=this.errormsg}
    );
    window.scrollTo(0,0);
  }

  GoToProduct(id:number){
    this.router.navigate(['product',id]);
    window.scrollTo(0,0);
  }

  filterProducts(){
    this.Products.forEach(element => {
      if(element.discount > 0){
        this.discountProducts.push(element);
      }else{
        this.normalProducts.push(element);
      }
    });
  }

}
