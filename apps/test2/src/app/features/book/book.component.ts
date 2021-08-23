import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { AuthService } from '../../shared/core/auth.service';
import { BookService } from '../../shared/core/book.service';
import { Book } from '../../shared/models/book';
@Component({
  selector: 'pixelbits-mk-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  user$: Observable<firebase.User | null>
  books$: Observable<Book[]>
  constructor(private authService: AuthService, private bookService: BookService) {
    this.user$ = authService.user$
    this.books$ = this.bookService.books$
  }

  ngOnInit() {
  }
  onClick() {
    this.bookService.addBook({ name: 'test', author: 'test'})
  } 
}
