import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material-module';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { SlugPipe } from './pipes/slug.pipe';
import { ProductsService } from './services/products.service';
import { AssetsPipe } from './pipes/assets.pipe';
import { PublishComponent } from './pages/publish/publish.component';
import { AuthModule } from '@auth0/auth0-angular';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthButtonComponent } from './auth/auth-button/auth-button.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { environment } from 'src/environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    CarouselComponent,
    FilterComponent,
    HomeComponent,
    CheckoutComponent,
    PageNotFoundComponent,
    ProductComponent,
    SlugPipe,
    AssetsPipe,
    PublishComponent,
    UserProfileComponent,
    AuthButtonComponent,
    AdminComponent,
    ProductsComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId
    }),
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
