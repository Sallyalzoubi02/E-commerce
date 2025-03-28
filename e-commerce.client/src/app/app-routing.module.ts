import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Hazem/home/home.component';
import { ProfileComponent } from './Sally/profile/profile.component';
import { DashboardComponent } from './Farah/dashboard/dashboard.component';
import { ProductComponent } from './Farah/product/product/product.component';
import { AddProductComponent } from './Farah/product/add-product/add-product.component';
import { EditProductComponent } from './Farah/product/edit-product/edit-product.component';
import { ShopComponent } from './Sondos/shop/shop.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  {
    path: "dashboard", component: DashboardComponent, children: [

  ] }
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {path:"shop" , component:ShopComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
