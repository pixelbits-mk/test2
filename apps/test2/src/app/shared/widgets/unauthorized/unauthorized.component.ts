import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import firebase from 'firebase/app';
@Component({
  selector: 'pixelbits-mk-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  user$: Observable<firebase.User | null>
  constructor(private authService: AuthService) {
    this.user$ = authService.user$
  }

  ngOnInit() {
  }


}
