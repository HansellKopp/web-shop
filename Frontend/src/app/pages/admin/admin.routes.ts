import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component'
import { ProductsComponent } from 'src/app/pages/products/products.component'
import { AuthGuard } from 'src/app/services/auth.guard';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
 //   canActivate: [ AuthGuard ]
  },
  {
    path: '',
    component: AdminComponent,
//    canActivate: [ AuthGuard ]
  },
  { path: '**', component: PageNotFoundComponent }
];
