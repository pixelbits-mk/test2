import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from './book.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BookService
  ],
  declarations: []
})
export class CoreModule { }
