import { IOrder } from './../Shared Classes/IOrder';
import { orderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

  constructor(private orderservice:orderService) {
    this.orderservice.GetAllOrders(this.access).subscribe(
      data=>
      {
        data
        this.Orders=data
        console.log(data)
        this.logged=true
      },
      err=>{this.error=err
      this.logged=false}
      ,
    )
    console.log(this.Orders)
   }
  access:string=String(localStorage.getItem("Alasly-Token"))
  logged:boolean=false;
  Orders:IOrder[]=[];
  error:string="";
  ngOnInit(): void {
    console.log(this.Orders)
  }
  DeleteOrder(orderid:number){
    console.log("here"+orderid)
    this.orderservice.DeleteOrder(orderid,this.access).subscribe(data=>{console.log("done"),window.location.reload()},error=>this.error=error)
  }
}
