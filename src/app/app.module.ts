import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './global/navbar/navbar.component';
import { FooterComponent } from './global/footer/footer.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddItemComponent } from './admin/item/add-item/add-item.component';
import { EditItemComponent } from './admin/item/edit-item/edit-item.component';
import { ViewItemsComponent } from './admin/item/view-items/view-items.component';
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe';
import { ShortenTitlePipe } from './pipes/shorten-title.pipe';
import { ViewComponent } from './item/view/view.component';
import { UniqueCategoryPipe } from './pipes/unique-category.pipe';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { ViewCategoriesComponent } from './admin/category/view-categories/view-categories.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AdminHomeComponent,
    AddItemComponent,
    EditItemComponent,
    ViewItemsComponent,
    ThousandSeparatorPipe,
    ShortenTitlePipe,
    ViewComponent,
    UniqueCategoryPipe,
    AddCategoryComponent,
    ViewCategoriesComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
