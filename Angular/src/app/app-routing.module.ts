import { OrderProductComponent } from './order-product/order-product.component';
//import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartCommponentComponent } from './cart-commponent/cart-commponent.component';
import { FavouritCommponentComponent } from './favourit-commponent/favourit-commponent.component';
import { HomeCommponentComponent } from './home-commponent/home-commponent.component';
import { LoginComponent } from './login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { OneCategoryCommponentComponent } from './one-category-commponent/one-category-commponent.component';
import { OneProductCommponentComponent } from './one-product-commponent/one-product-commponent.component';
import { RegisterComponent } from './register/register.component';
import { SearchCommponentComponent } from './search-commponent/search-commponent.component';

const routes: Routes = [
 
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeCommponentComponent},
  {path:'cart',component:CartCommponentComponent},
  {path:'favourit',component:FavouritCommponentComponent},
  {path:'login',component:LoginComponent},
  {path:'category/:id',component:OneCategoryCommponentComponent},
  {path:'product/:id',component:OneProductCommponentComponent},
  {path:'search/:value',component:SearchCommponentComponent},
  {path:'register',component:RegisterComponent},
  {path:'order',component:OrderProductComponent},
  {path:'shopingcart',component:CartCommponentComponent},
  {path:'products',component:HomeCommponentComponent},
  {path:'productstocart',component:FavouritCommponentComponent},
  {path:'**',component:NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
