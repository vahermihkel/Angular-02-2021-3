import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './admin/item/add-item/add-item.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { EditItemComponent } from './admin/item/edit-item/edit-item.component';
import { ViewItemsComponent } from './admin/item/view-items/view-items.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './item/view/view.component';
import { ViewCategoriesComponent } from './admin/category/view-categories/view-categories.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "view/:itemId", component: ViewComponent },
  { path: "cart", component: CartComponent },
  { path: "admin", component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: "admin/add-item", component: AddItemComponent, canActivate: [AuthGuard] },
  { path: "admin/view-items", component: ViewItemsComponent, canActivate: [AuthGuard] },
  { path: "admin/edit-item/:itemId", component: EditItemComponent, canActivate: [AuthGuard] },
  { path: "admin/category", component: ViewCategoriesComponent, canActivate: [AuthGuard] },
  { path: "admin/add-category", component: AddCategoryComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
  // { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
