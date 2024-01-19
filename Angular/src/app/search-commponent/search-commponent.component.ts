import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { IProduct } from '../Shared Classes/IProduct';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-commponent',
  templateUrl: './search-commponent.component.html',
  styleUrls: ['./search-commponent.component.scss']
})
export class SearchCommponentComponent implements OnInit {
  Products:IProduct[]=[]
  searchKey:string="";
  errorMsg="";
  ProductCount=new Array();
  page=0;
  constructor(private route:ActivatedRoute,
    private searchservice:SearchService,private router:Router) 
  {
    
    

    router.events.subscribe((val) =>{
      
      this.searchKey!=this.route.snapshot.paramMap.get('value')
      console.log("zxcv  "+this.searchKey)
      this.route.paramMap.subscribe((params:ParamMap)=>{
        this.searchKey=params.get('value')!
        this.GetCounts()
        this.nextCollectionOFProducts(this.page)
      });
        
      })
  }
  
  ngOnInit(): void {
    

}
  
GetCounts(){
  this.searchservice.GetProductsCount(this.searchKey)
    .subscribe(data=>{
      if(data!=null){
        this.ProductCount=new Array(Math.ceil(parseInt(data.toString())/12))
      }
    })
}

  nextCollectionOFProducts(page:number){
    console.log(page)
    
    this.searchservice.GetSearchResult(this.searchKey,page)
    .subscribe(
      data=>{
        this.Products=[]
        console.log("lllllg"+ this.Products.length)
        this.Products=data ;
        console.log("dsfg"+ this.Products.length)
      },
      error=>{this.errorMsg=error}
    );
    window.scrollTo(80,80);
  }

  GoToProduct(id:number){
    this.router.navigate(['product',id]);
    window.scrollTo(80,80);
  }
}
