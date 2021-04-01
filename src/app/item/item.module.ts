import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThousandSeparatorPipe } from '../pipes/thousand-separator.pipe';
import { ShortenTitlePipe } from '../pipes/shorten-title.pipe';
import { ViewComponent } from './view/view.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    ViewComponent,
    ItemCardComponent, 
    ThousandSeparatorPipe,
    ShortenTitlePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AppRoutingModule
  ],
  exports: [
    ThousandSeparatorPipe,
    ItemCardComponent
  ]
})
export class ItemModule { }
