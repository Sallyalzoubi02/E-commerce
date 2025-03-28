import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './Farah/about/about.component';
import { CartComponent } from './Firas/cart/cart.component';
import { ContactComponent } from './Habeeb/contact/contact.component';
import { HomeComponent } from './Hazem/home/home.component';
import { ProductDetailsComponent } from './Jana/product-details/product-details.component';
import { ProfileComponent } from './Sally/profile/profile.component';

import { NavbarComponent } from './Sally/navbar/navbar.component';
import { FooterComponent } from './Sally/footer/footer.component';
import { DashboardComponent } from './Farah/dashboard/dashboard.component';
import { ProductComponent } from './Farah/product/product/product.component';
import { AddProductComponent } from './Farah/product/add-product/add-product.component';
import { EditProductComponent } from './Farah/product/edit-product/edit-product.component';
import { CategoryComponent } from './Farah/category/category/category.component';
import { AddCategoryComponent } from './Farah/category/add-category/add-category.component';
import { EditCategoryComponent } from './Farah/category/edit-category/edit-category.component';
import { FormsModule } from '@angular/forms';
import { VoucherComponent } from './Firas/voucher/voucher.component';
import { GetAllVoucherComponent } from './Firas/get-all-voucher/get-all-voucher.component';
import { EditVoucherComponent } from './Firas/edit-voucher/edit-voucher.component';

import { ShopComponent } from './Sondos/shop/shop.component';
import { UsersComponent } from './Farah/Users/users/users.component';
import { FeedbackComponent } from './Farah/Feedback/feedback/feedback.component';
import { AddVoucherUserComponent } from './Farah/Users/add-voucher-user/add-voucher-user.component';
import { HomeDashboardComponent } from './Farah/home-dashboard/home-dashboard.component';
import { NgChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CartComponent,
    ContactComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProfileComponent,
    ShopComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    UsersComponent,
    FeedbackComponent,
    AddVoucherUserComponent,
    HomeDashboardComponent
    EditCategoryComponent,
    VoucherComponent,
    GetAllVoucherComponent,
    EditVoucherComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
    AppRoutingModule, FormsModule  ,      
    HttpClientModule, FormsModule, NgChartsModule,
    AppRoutingModule
    BrowserModule, HttpClientModule, FormsModule,
    AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
