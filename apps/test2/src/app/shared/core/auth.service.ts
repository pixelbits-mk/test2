import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import firebase from 'firebase/app';


@Injectable({ providedIn: 'root' })
export class AuthService {
    isAuthenticated$: Observable<boolean>
    user$: Observable<firebase.User | null>

    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.isAuthenticated$ = this.angularFireAuth.authState.pipe(map(t => !!(t && !t.isAnonymous)))
        this.user$ = this.angularFireAuth.authState
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
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.angularFireAuth.signInWithPopup(provider)
            .then(value => {
                console.log('Sucess', value),
                    this.router.navigateByUrl('/books');
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            });
    }

}