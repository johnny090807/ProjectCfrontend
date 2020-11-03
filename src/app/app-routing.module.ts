import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RentComponent } from './rent/rent.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Admin', component: AdminComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Rent', component: RentComponent },
  { path: 'Rent/:id', component: RentComponent },
  { path: '**', component: HomeComponent },
  { path: 'Contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
