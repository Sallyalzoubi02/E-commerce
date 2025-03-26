import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Hazem/home/home.component';
import { ProfileComponent } from './Sally/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
