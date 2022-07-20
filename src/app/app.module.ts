import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './Screens/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Screens/dashboard/dashboard.component';
import { HeaderComponent } from './Components/header/header.component';
import { AddProductComponent } from './screens/add-product/add-product.component';
import { AllProductsComponent } from './screens/all-products/all-products.component';
import { OrdersComponent } from './screens/orders/orders.component';
import { UsersComponent } from './screens/users/users.component';
import { AuthIntercetor } from './interceptor/auth_interceptor';
import { DialogComponent } from './Components/dialog/dialog.component';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { OrderDetailComponent } from './order-details/order-detail/order-detail.component';
import { ProductHistoryComponent } from './product-history/product-history.component';
import { AddRiderComponent } from './screens/add-rider/add-rider.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    HeaderComponent,
    AddProductComponent,
    AllProductsComponent,
    OrdersComponent,
    UsersComponent,
    DialogComponent,
    SideNavComponent,
    OrderDetailComponent,
    ProductHistoryComponent,
    AddRiderComponent,
  ],
  // entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthIntercetor,multi:true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
