import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './Farah/about/about.component';
import { CartComponent } from './Firas/cart/cart.component';
import { ContactComponent } from './Habeeb/contact/contact.component';
import { HomeComponent } from './Hazem/home/home.component';
import { ProductDetailsComponent } from './Jana/product-details/product-details.component';
import { ProfileComponent } from './Sally/profile/profile.component';
import { ShopComponent } from './Sondos/shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CartComponent,
    ContactComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProfileComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
