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
import { UsersComponent } from './Farah/Users/users/users.component';
import { AboutComponent } from './Farah/about/about.component';
import { FeedbackComponent } from './Farah/Feedback/feedback/feedback.component';
import { AddVoucherUserComponent } from './Farah/Users/add-voucher-user/add-voucher-user.component';
import { HomeDashboardComponent } from './Farah/home-dashboard/home-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  { path: "about", component: AboutComponent },

  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: "homeDash", component: HomeDashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard/homeDash' },

      { path: "category", component: CategoryComponent },
      { path: "addCategory", component: AddCategoryComponent },
      { path: "editCategory/:id", component: EditCategoryComponent },

      { path: "product/:id", component: ProductComponent },
      { path: "addProduct", component: AddProductComponent },
      { path: "editProduct/:id", component: EditProductComponent },

      { path: "users", component: UsersComponent },
      { path: "feedback", component: FeedbackComponent },
      { path: "userVoucher/:id", component: AddVoucherUserComponent },

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
