import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeCommponentComponent } from './home-commponent/home-commponent.component';
import { OneProductCommponentComponent } from './one-product-commponent/one-product-commponent.component';
import { OneCategoryCommponentComponent } from './one-category-commponent/one-category-commponent.component';
import { CartCommponentComponent } from './cart-commponent/cart-commponent.component';
import { FavouritCommponentComponent } from './favourit-commponent/favourit-commponent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule} from '@angular/common/http';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RegisterComponent } from './register/register.component';

import { SearchCommponentComponent } from './search-commponent/search-commponent.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
   
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeCommponentComponent,
    OneProductCommponentComponent,
    OneCategoryCommponentComponent,
    CartCommponentComponent,
    FavouritCommponentComponent,
    NotFoundPageComponent,
    RegisterComponent,
    OrderProductComponent,
    SearchCommponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
