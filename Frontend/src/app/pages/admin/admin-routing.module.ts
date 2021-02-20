import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { DepartamentsComponent } from './departaments/departaments.component'

// import { AuthGuard } from 'src/app/services/auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'categories', component: DepartamentsComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'product/:id', component: ProductComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}