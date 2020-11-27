import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { HubComponent } from './pages/hub/hub.component';
import { LoginComponent } from './pages/login/login.component';
import { PeopleComponent } from './pages/people/people.component';
import { PointOfSaleComponent } from './pages/point-of-sale/point-of-sale.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'people', component: PeopleComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard, ModeratorGuard]},
  {path: 'point_of_sale', component: PointOfSaleComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
