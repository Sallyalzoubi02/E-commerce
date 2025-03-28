import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Hazem/home/home.component';
import { ProfileComponent } from './Sally/profile/profile.component';
import { DashboardComponent } from './Farah/dashboard/dashboard.component';
import { ProductComponent } from './Farah/product/product/product.component';
import { AddProductComponent } from './Farah/product/add-product/add-product.component';
import { EditProductComponent } from './Farah/product/edit-product/edit-product.component';
import { CartComponent } from './Firas/cart/cart.component';
import { VoucherComponent } from './Firas/voucher/voucher.component';
import { GetAllVoucherComponent } from './Firas/get-all-voucher/get-all-voucher.component';
import { EditVoucherComponent } from './Firas/edit-voucher/edit-voucher.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
 
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  {
    path: "dashboard", component: DashboardComponent, children: [

      { path: 'addVoucher', component: VoucherComponent },
      { path: 'voucher', component: GetAllVoucherComponent },
      { path: 'editVoucher/:id', component: EditVoucherComponent },

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
