import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import firebase from 'firebase/app';


@Injectable({ providedIn: 'root'})
export class AuthService {
    isAuthenticated$: Observable<boolean>

    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.isAuthenticated$ = this.angularFireAuth.authState.pipe(map(t => !!(t && !t.isAnonymous)))
    }
    login(username: string, password: string) {
        this.angularFireAuth.signInWithEmailAndPassword(username, password)
        .then(value => {
          console.log('Nice, it worked!');
          this.router.navigateByUrl('/books');
        })
        .catch(err => {
          console.log('Something went wrong: ', err.message);
        });
    }
    logout() {
        
        this.angularFireAuth.signOut().then(() => {
            this.router.navigateByUrl('/login');
        })
    }

}