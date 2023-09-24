import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { MakePaymentComponent } from './component/make-payment/make-payment.component';
import { PaymentHistoryComponent } from './component/payment-history/payment-history.component';
import { RegisterComponent } from './component/register/register.component';
import { UpdateAccountDetailsComponent } from './component/update-account-details/update-account-details.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'payment-history/:employeeId', component: PaymentHistoryComponent, canActivate: [authGuard] },
  { path: 'make-payment/:employeeId', component: MakePaymentComponent, canActivate: [authGuard] },
  { path: 'update-account-details/:accountId', component: UpdateAccountDetailsComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
