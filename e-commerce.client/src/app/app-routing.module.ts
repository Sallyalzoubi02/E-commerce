import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Hazem/home/home.component';
import { ProfileComponent } from './Sally/profile/profile.component';
import { DashboardComponent } from './Farah/dashboard/dashboard.component';
import { CategoryComponent } from './Farah/category/category/category.component';
import { AddCategoryComponent } from './Farah/category/add-category/add-category.component';
import { EditCategoryComponent } from './Farah/category/edit-category/edit-category.component';
import { ProductComponent } from './Farah/product/product/product.component';
import { AddProductComponent } from './Farah/product/add-product/add-product.component';
import { EditProductComponent } from './Farah/product/edit-product/edit-product.component';
import { ShopComponent } from './Sondos/shop/shop.component';
import { UsersComponent } from './Farah/Users/users/users.component';
import { AboutComponent } from './Farah/about/about.component';
import { FeedbackComponent } from './Farah/Feedback/feedback/feedback.component';
import { AddVoucherUserComponent } from './Farah/Users/add-voucher-user/add-voucher-user.component';
import { HomeDashboardComponent } from './Farah/home-dashboard/home-dashboard.component';
import { ProductDetailsComponent } from './Jana/product-details/product-details.component';
import { CartComponent } from './Firas/cart/cart.component';
import { VoucherComponent } from './Firas/voucher/voucher.component';
import { GetAllVoucherComponent } from './Firas/get-all-voucher/get-all-voucher.component';
import { EditVoucherComponent } from './Firas/edit-voucher/edit-voucher.component';
import { ContactUsComponent } from './Sally/contact-us/contact-us.component';
import { LoginComponent } from './Sally/login/login.component';
import { RegisterComponent } from './Sally/register/register.component';
import { ResetpasswordComponent } from './Sally/resetpassword/resetpassword.component';
import { PaymentComponent } from './Firas/payment/payment.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetPassword', component: ResetpasswordComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: "about", component: AboutComponent },
  {
    path: "dashboard", component: DashboardComponent, children: [


      { path: "homeDash", component: HomeDashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard/homeDash' },
      { path: 'addVoucher', component: VoucherComponent },
      { path: 'voucher', component: GetAllVoucherComponent },
      { path: 'editVoucher/:id', component: EditVoucherComponent },
      { path: "category", component: CategoryComponent },
      { path: "addCategory", component: AddCategoryComponent },
      { path: "editCategory/:id", component: EditCategoryComponent },

      { path: "product/:id", component: ProductComponent },
      { path: "addProduct/:id", component: AddProductComponent },
      { path: "editProduct/:id/:categoryId", component: EditProductComponent },

      { path: "users", component: UsersComponent },
      { path: "feedback", component: FeedbackComponent },
      { path: "userVoucher/:id", component: AddVoucherUserComponent },

    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {path:"shop" , component:ShopComponent},
  { path: 'productDetails/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
