import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClothesPageComponent } from './components/page/clothes-page/clothes-page.component';
import { HomeComponent } from './components/page/home/home.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { AuthGuard } from './auth/auth.guard';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'clothes/:id', component:ClothesPageComponent},
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'cart-page', component:CartPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'register', component:RegisterPageComponent},
  {path: 'checkout', component:CheckoutPageComponent, canActivate:[AuthGuard]},
  {path: 'payment', component:PaymentPageComponent, canActivate:[AuthGuard]},
  {path: 'track/:orderId', component:OrderTrackPageComponent, canActivate:[AuthGuard]},
  {path: 'track', component:OrderTrackPageComponent, canActivate:[AuthGuard]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
