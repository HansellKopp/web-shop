import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { DepartamentsComponent } from './departaments/departaments.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductComponent } from './product/product.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    DepartamentsComponent,
    ProductsComponent,
    ProductComponent
  ]
})
export class AdminModule { }
