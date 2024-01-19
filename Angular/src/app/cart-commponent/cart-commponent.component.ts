import { orderService } from './../services/order.service';
import { IOrder } from './../Shared Classes/IOrder';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Icart } from '../Shared Classes/Icart';
import { Posproduct } from '../Shared Classes/posproduct';

@Component({
  selector: 'app-cart-commponent',
  templateUrl: './cart-commponent.component.html',
  styleUrls: ['./cart-commponent.component.scss']
})
export class CartCommponentComponent implements OnInit {

  cartlist?:Icart


  constructor(private shoppingcart:ShoppingCartService, private route:Router,private FB:FormBuilder,private orderservice:orderService) { }
  access:string=String(localStorage.getItem("Alasly-Token"))
  logged:boolean=false;
  error:string=""
  ngOnInit(): void {
    this.shoppingcart.getcard(this.access).subscribe(
        servedata=>
        {
          this.cartlist=servedata
          console.log(servedata)
          // this.logged=true
        },
        error=>{this.error=error
        // this.logged=false
        console.log(error)
        }
    )

      }

      deleletprduct(id:number)
      {

        this.shoppingcart.deletfromcart(id,this.access).subscribe(
          servedata=>
          {

            this.logged=true
          },
          error=>{this.error=error
          this.logged=false
          console.log(error)
          }

        )
        window.location.reload()

      }

      Deletcard()
      {
        this.shoppingcart.DeleteCart(this.access).subscribe(
          servedata=>
          {

            this.logged=false
          },
          error=>{this.error=error
          this.logged=false
          console.log(error)
          }


        )
          window.location.reload()
      }

      updatecart( ProdId:any,Quantity:any)
      {
        var product=new Posproduct(ProdId,Quantity)
        const  mySentences:Array<Posproduct> = [
                 product
                                     ];
        this.shoppingcart.UpdateCart(mySentences,this.access).subscribe(

          servedata=>
          {
            this.logged=true
          },
          error=>{this.error=error
          this.logged=false
          console.log(error)
          }

        )
        window.location.reload()
      }


      GotoProduct()
      {
        this.route.navigate(['products'])
      }
      gotoaddPoductinCart()
      {
        this.route.navigate(['productstocart'])
      }

      OrderForm=this.FB.group({
        Phone:["",[Validators.required]],
        Address:["",[Validators.required]],
      })
      get Phone(){
        return this.OrderForm.get("Phone")
      }
      get Address(){
        return this.OrderForm.get("Address")
      }
      order:boolean=false;
      Order(){
          if(this.cartlist==null){
            this.order==false;
          }
          else
            this.order=true;
      }
      continueorder(){
        
        //this.orderservice.AddOrder(this.Address?.value,this.Phone?.value,this.access).subscribe(data=>this.route.navigate(['order']))
      }
}
