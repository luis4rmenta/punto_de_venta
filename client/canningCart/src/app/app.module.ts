import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PointOfSaleComponent } from './pages/point-of-sale/point-of-sale.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { PeopleComponent } from './pages/people/people.component';
import { HubComponent } from './pages/hub/hub.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NewEmployeeComponent } from './pages/employees/new-employee/new-employee.component';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ProductsComponent } from './pages/products/products.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { OutputsComponent } from './pages/outputs/outputs.component';
import { LossesComponent } from './pages/losses/losses.component';
import { ViewPersonComponent } from './pages/people/view-person/view-person.component';
import { EditPersonComponent } from './pages/people/edit-person/edit-person.component';
import { NewPersonComponent } from './pages/people/new-person/new-person.component';
import { EditProviderComponent } from './pages/providers/edit-provider/edit-provider.component';
import { NewProviderComponent } from './pages/providers/new-provider/new-provider.component';
import { EditProductoComponent } from './pages/products/edit-producto/edit-producto.component';
import { NewProductoComponent } from './pages/products/new-producto/new-producto.component';
import { EditInputComponent } from './pages/inputs/edit-input/edit-input.component';
import { ViewInputComponent } from './pages/inputs/view-input/view-input.component';
import { EditOutputComponent } from './pages/outputs/edit-output/edit-output.component';
import { ViewOutputComponent } from './pages/outputs/view-output/view-output.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PointOfSaleComponent,
    EmployeesComponent,
    PeopleComponent,
    HubComponent,
    NavbarComponent,
    CategoriesComponent,
    EditCategoryComponent,
    NewEmployeeComponent,
    EditEmployeeComponent,
    ProvidersComponent,
    ProductsComponent,
    InputsComponent,
    OutputsComponent,
    LossesComponent,
    ViewPersonComponent,
    EditPersonComponent,
    NewPersonComponent,
    EditProviderComponent,
    NewProviderComponent,
    EditProductoComponent,
    NewProductoComponent,
    EditInputComponent,
    ViewInputComponent,
    EditOutputComponent,
    ViewOutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
