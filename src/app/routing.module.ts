import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGard } from "./Gards/auth_gard";
import { OrderDetailComponent } from "./order-details/order-detail/order-detail.component";
import { ProductHistoryComponent } from "./product-history/product-history.component";
import { AddProductComponent } from "./screens/add-product/add-product.component";
import { AddRiderComponent } from "./screens/add-rider/add-rider.component";
import { AllProductsComponent } from "./screens/all-products/all-products.component";
import { OrdersComponent } from "./screens/orders/orders.component";
import { SignUpComponent } from "./Screens/sign-up/sign-up.component";
import { UsersComponent } from "./screens/users/users.component";


const Routes:Routes=[
  {path:'',redirectTo:'allProducts',pathMatch:'full'},
  {path:'signup',component:SignUpComponent},
  {path:'login',component:SignUpComponent},
  {path:'add-product',component:AddProductComponent,canActivate:[AuthGard]},
  {path:'allProducts',component:AllProductsComponent,canActivate:[AuthGard]},
  {path:'orders',component:OrdersComponent,canActivate:[AuthGard]},
  {path:'users',component:UsersComponent,canActivate:[AuthGard]},
  {path:'edit/:id',component:AddProductComponent,canActivate:[AuthGard]},
  {path:'viewDetail/:id',component:AddProductComponent,canActivate:[AuthGard]},
  {path:'orderDetail/:id',component:OrderDetailComponent,canActivate:[AuthGard]},
  {path:'productHistory',component:ProductHistoryComponent,canActivate:[AuthGard]},
  {path:'add-rider',component:AddRiderComponent,canActivate:[AuthGard]},
]


@NgModule({

     imports:[RouterModule.forRoot(Routes)],
     exports:[RouterModule],

})

export class RoutingModule
{

}
