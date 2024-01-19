import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AllProductsService, ProductsInCategory } from '../services/all-products.service';
import { IProduct } from '../Shared Classes/IProduct';

@Component({
  selector: 'app-one-category-commponent',
  templateUrl: './one-category-commponent.component.html',
  styleUrls: ['./one-category-commponent.component.scss']
})
export class OneCategoryCommponentComponent implements OnInit {
  CategId?: number;
  CategoryName:string=""
Products:IProduct[]=[]
errormsg:string=""
  ProductCount=new Array();
  constructor(private route:ActivatedRoute,private allProdService:AllProductsService,private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
    this.CategId=parseInt(params.get('id')!);
    this.nextCollectionOFProducts(0)
   //for pagination
    this.allProdService.GetProductsCount(this.CategId!).subscribe(
      data=>{ 
        if(data!=null){
          this.ProductCount=new Array(Math.ceil(parseInt(data.toString())/12))
        }
       
     }
    )
   
});


    window.scrollTo(80,80);
    }

nextCollectionOFProducts(page:number){
  this.allProdService.GetAllProducts(page,this.CategId!)
  .subscribe(
    data=>{
      this.Products=data ;
    if(this.Products.length!=0)
    this.CategoryName=this.Products[0].category;
    else
    this.CategoryName="";
    },
    error=>{this.errormsg=error}
  );
  window.scrollTo(80,80);
}

    GoToProduct(id:number){
      this.router.navigate(['product',id]);
      window.scrollTo(80,80);
    }

}
