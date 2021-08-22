import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { BookService } from './shared/core/book.service';
import { Book } from './shared/models/book';

@Component({
  selector: 'pixelbits-mk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test2';
  books$: Observable<Book[]>
  constructor(private firestore: AngularFirestore, private bookService: BookService) {
    this.books$ = this.bookService.books$
  }
  ngOnInit() {
    this.books$.subscribe(t => {
      console.log(t)
    })
  }
  onClick() {
    this.bookService.addBook({ name: 'test', author: 'test'})
  }  
}
