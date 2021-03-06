import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, AuthPipe, customClaims, hasCustomClaim, loggedIn, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { forkJoin, iif, Observable, of, pipe, UnaryFunction, zip } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { BookComponent } from "./book.component";
import firebase from 'firebase/app'

//const adminOnly = () => hasCustomClaim('admin');
// export const redirectUnauthorizedTo = (redirect: any[]) => pipe(map((user: firebase.User) => {
//     if (!user) {
//         return redirect
//     }
//     const idTokenResult = user.getIdTokenResult() 

//     return true
// }));
// const redirectUnauthorizedTo: (t: unknown[]) => unknown = (redirect: unknown[]) => 
//     pipe(
//         map(customClaims),
//         tap(t => console.log(t))

//     )


// const redirectUnauthorizedToLogin = () => switchMap((user: firebase.User) => {

//     // if (!user) {
//     //     return of(['login'])
//     // }
//     // return hasCustomClaim('admin')(of(user)).pipe(map(t => {
//     //     if (t) {
//     //         return true
//     //     }
//     //     return ['unauthorized']
//     // }))
// })
// const z: Observable<firebase.User> = of(null)
// const loggedin2 = loggedIn(z)
// const customClaims2 = customClaims(z)
// const hasCustomClaim2 = hasCustomClaim('admin')(z)
// const hasCustomClaim3 = hasCustomClaim('moderator')(z)

const combineAuthPipes = (authPipes: (AuthPipe |  UnaryFunction<Observable<firebase.User>, Observable<unknown>>)[]) => 
    switchMap((t: Observable<firebase.User>) => forkJoin(authPipes.map(x => x(t))))

const loggedInThenRedirect = pipe(
    map((t: firebase.User) => of(t)),
    combineAuthPipes([
        loggedIn,
        customClaims,
        hasCustomClaim('admin'),
        hasCustomClaim('moderator')
    ]),
    map(([isLoggedIn, customClaimList, admin, moderator]) => {
        return {
            loggedIn: isLoggedIn,
            customClaims: customClaimList,
            admin, 
            moderator
        }
    }),
    map((t) => {
        console.log(t)
        if (t.admin) {
            return true
        }
        if (!t.loggedIn) {
            return ['login']
        }
        return ['unauthorized']
    })
)
// const loggedInThenRedirect = pipe(
//     map((t: firebase.User) => of(t)),
//     switchMap((t: Observable<firebase.User>) => {
//         return forkJoin([
//             loggedIn(t),
//             customClaims(t),
//             hasCustomClaim('admin')(t),
//             hasCustomClaim('moderator')(t)
//         ])
//     }),
//     map(([isLoggedIn, customClaimList, admin, moderator]) => {
//         return {
//             loggedIn: isLoggedIn,
//             customClaims: customClaimList,
//             admin, 
//             moderator
//         }
//     }),
//     map((t) => {
//         console.log(t)
//         if (t.admin) {
//             return true
//         }
//         if (!t.loggedIn) {
//             return ['login']
//         }
//         return ['unauthorized']
//     })
// )
// const loggedInThenRedirect = pipe(
//     switchMap((t: firebase.User) => {
//         return forkJoin([
//             loggedIn(of(t)),
//             customClaims(of(t)),
//             hasCustomClaim('admin')(of(t)),
//             hasCustomClaim('moderator')(of(t)),
//         ]).pipe(
//             map(([isLoggedIn, customClaimList, admin, moderator]) => {
//                 return {
//                     loggedIn: isLoggedIn,
//                     customClaims: customClaimList,
//                     admin, 
//                     moderator
//                 }
//             }),
//             map((t) => {
//                 console.log(t)
//                 if (t.admin) {
//                     return true
//                 }
//                 if (!t.loggedIn) {
//                     return ['login']
//                 }
//                 return ['unauthorized']
//             })

//         )
//         // customClaims(of(t)).subscribe(y => {
//         //     console.log('claims', y)
//         // })
//         // if (!t) {
//         //     return of(['login'])
//         // }
//         // return hasCustomClaim('admin')(of(t)).pipe(
//         //     map(x => !x ?  ['unauthorized'] : true)
//         // )

//     }),
//     tap(t => console.log(t))
// )



export const routes: Routes = [
    { 
        path: '', component: BookComponent,
        pathMatch: 'full',
        canActivate: [
            AngularFireAuthGuard
        ],
        data: { authGuardPipe: () => loggedInThenRedirect }
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class BookRoutingModule {

}