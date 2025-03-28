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
import { NavbarComponent } from './Sally/navbar/navbar.component';
import { FooterComponent } from './Sally/footer/footer.component';
import { DashboardComponent } from './Farah/dashboard/dashboard.component';
import { ProductComponent } from './Farah/product/product/product.component';
import { AddProductComponent } from './Farah/product/add-product/add-product.component';
import { EditProductComponent } from './Farah/product/edit-product/edit-product.component';
import { CategoryComponent } from './Farah/category/category/category.component';
import { AddCategoryComponent } from './Farah/category/add-category/add-category.component';
import { EditCategoryComponent } from './Farah/category/edit-category/edit-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactUsComponent } from './Sally/contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Sally/login/login.component';
import { RegisterComponent } from './Sally/register/register.component';
import { ResetpasswordComponent } from './Sally/resetpassword/resetpassword.component'; 

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
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule, NgbModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
