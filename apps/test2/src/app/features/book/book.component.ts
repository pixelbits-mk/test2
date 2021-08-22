import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { AuthService } from '../../shared/core/auth.service';
@Component({
  selector: 'pixelbits-mk-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  user$: Observable<firebase.User | null>
  constructor(private authService: AuthService) {
    this.user$ = authService.user$
  }

  ngOnInit() {
  }

}
