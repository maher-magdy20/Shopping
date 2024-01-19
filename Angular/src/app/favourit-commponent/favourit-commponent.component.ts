import { favouriteService } from './../services/favoutite.service';
import { Router } from '@angular/router';
import { IProduct } from './../Shared Classes/IProduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourit-commponent',
  templateUrl: './favourit-commponent.component.html',
  styleUrls: ['./favourit-commponent.component.scss']
})
export class FavouritCommponentComponent implements OnInit {

  constructor(private router:Router,FavService:favouriteService) { 
    FavService.GetAllFavourites(this.access).subscribe(
      data=>{this.favoutites=data
        this.logged=true
      },
      error=>{this.error=error
      this.logged=false
      console.log(error)
      }
    )
  }
  access:string=String(localStorage.getItem("Alasly-Token"))
  logged:boolean=true;
  favoutites:IProduct[]=[]
  error:string=""
  ngOnInit(): void {
  }

  GoToProduct(id:number){
    this.router.navigate(['product',id]);
    window.scrollTo(80,80);
  }
}
