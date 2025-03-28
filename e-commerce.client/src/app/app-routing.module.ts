import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Hazem/home/home.component';
import { ProfileComponent } from './Sally/profile/profile.component';
import { DashboardComponent } from './Farah/dashboard/dashboard.component';
import { ProductComponent } from './Farah/product/product/product.component';
import { AddProductComponent } from './Farah/product/add-product/add-product.component';
import { EditProductComponent } from './Farah/product/edit-product/edit-product.component';
import { ContactUsComponent } from './Sally/contact-us/contact-us.component';
import { LoginComponent } from './Sally/login/login.component';
import { RegisterComponent } from './Sally/register/register.component';
import { ResetpasswordComponent } from './Sally/resetpassword/resetpassword.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetPassword', component: ResetpasswordComponent },

  { path: '', pathMatch: 'full', redirectTo: '/home' },

  {
    path: "dashboard", component: DashboardComponent, children: [

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
