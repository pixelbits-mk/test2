import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from './shared/core/auth.service';
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
  isAuthenticated$: Observable<boolean>
  constructor(private firestore: AngularFirestore, private bookService: BookService, private authService: AuthService) {
    this.books$ = this.bookService.books$
    this.isAuthenticated$ = this.authService.isAuthenticated$
  }
  ngOnInit() {
    this.books$.subscribe(t => {
      console.log(t)
    })
  }
  onClick() {
    this.bookService.addBook({ name: 'test', author: 'test'})
  } 
  logout() {
    this.authService.logout()
  }
}
