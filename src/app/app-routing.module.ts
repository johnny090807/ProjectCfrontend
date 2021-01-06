import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RentComponent } from './rent/rent.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCarsComponent } from './admin-cars/admin-cars.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterCarComponent } from './register-car/register-car.component';
import { CarReservationComponent } from './car-reservation/car-reservation.component';
import { ResDetailsComponent } from './res-details/res-details.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Admin', component: AdminComponent },
  { path: 'AdminCars', component: AdminCarsComponent },
  { path: 'AdminUsers', component: AdminUsersComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Rent', component: RentComponent },
  { path: 'Rent/:id', component: CarReservationComponent },
  { path: 'Res/:id', component: ResDetailsComponent },
  { path: 'CarRegister', component: RegisterCarComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
