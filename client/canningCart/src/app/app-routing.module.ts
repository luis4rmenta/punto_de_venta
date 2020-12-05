import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ModeratorGuard } from './guards/moderator.guard';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { NewEmployeeComponent } from './pages/employees/new-employee/new-employee.component';
import { HubComponent } from './pages/hub/hub.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { LoginComponent } from './pages/login/login.component';
import { LossesComponent } from './pages/losses/losses.component';
import { OutputsComponent } from './pages/outputs/outputs.component';
import { EditPersonComponent } from './pages/people/edit-person/edit-person.component';
import { NewPersonComponent } from './pages/people/new-person/new-person.component';
import { PeopleComponent } from './pages/people/people.component';
import { ViewPersonComponent } from './pages/people/view-person/view-person.component';
import { PointOfSaleComponent } from './pages/point-of-sale/point-of-sale.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditProviderComponent } from './pages/providers/edit-provider/edit-provider.component';
import { NewProviderComponent } from './pages/providers/new-provider/new-provider.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'hub', component: HubComponent, canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard, ModeratorGuard]},
  {path: 'people', component: PeopleComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard, ModeratorGuard]},
  {path: 'point_of_sale', component: PointOfSaleComponent, canActivate: [AuthGuard]},
  {path: 'inputs', component: InputsComponent},
  {path: 'losses', component: LossesComponent},
  {path: 'outputs', component: OutputsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'providers', component: ProvidersComponent},
  
  {path: 'new', canActivate: [AuthGuard], children: [
    {path: 'employee', component: NewEmployeeComponent, canActivate:[AdminGuard]},
    {path: 'person', component: NewPersonComponent, canActivate: [AdminGuard]},
    {path: 'provider', component: NewProviderComponent, canActivate: [AdminGuard]},
  ]},

  {path: 'edit', children: [
    {path: 'employee/:id', component: EditEmployeeComponent, canActivate:[AdminGuard]},
    {path: 'person/:id', component: EditPersonComponent},
    {path: 'provider/:id', component: EditProviderComponent, canActivate: [AdminGuard]}
  ]},

  {path: 'view', children: [
    {path: 'person/:id', component: ViewPersonComponent}
  ]},

  {path: 'editar', children: [{path: 'categoria/:id', component: EditCategoryComponent, canActivate: [ModeratorGuard]}], canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
