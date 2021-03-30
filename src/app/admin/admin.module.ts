import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoriesComponent } from './category/view-categories/view-categories.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { ViewItemsComponent } from './item/view-items/view-items.component';
import { ItemModule } from '../item/item.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AddItemComponent,
    EditItemComponent,
    ViewItemsComponent,
    AddCategoryComponent,
    ViewCategoriesComponent,
  ],
  imports: [
    CommonModule,
    ItemModule,
    TranslateModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
