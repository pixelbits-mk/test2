import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { WidgetsModule } from '../../shared/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
    WidgetsModule
  ],
  declarations: [BookComponent]
})
export class BookModule { }
