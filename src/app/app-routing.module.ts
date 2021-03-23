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

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "view/:itemId", component: ViewComponent },
  { path: "cart", component: CartComponent },
  { path: "admin", component: AdminHomeComponent },
  { path: "admin/add-item", component: AddItemComponent },
  { path: "admin/view-items", component: ViewItemsComponent },
  { path: "admin/edit-item/:itemId", component: EditItemComponent },
  { path: "admin/category", component: ViewCategoriesComponent },
  { path: "admin/add-category", component: AddCategoryComponent },
  // { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
