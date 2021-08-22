import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireAuthGuard, redirectLoggedInTo  } from '@angular/fire/auth-guard';
import { LoginComponent } from "./shared/widgets/login/login.component";
import { UnauthorizedComponent } from "./shared/widgets/unauthorized/unauthorized.component";
const redirectLoggedInToBooks = () => redirectLoggedInTo(['books']);

// { path: 'login', component: LoginComponent,        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
// { path: 'items', component: ItemListComponent,     canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
// { path: 'admin', component: AdminComponent,        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }},
// { path: 'accounts/:id', component: AdminComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: belongsToAccount }}


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'books'
    },
    { 
        path: 'books', 
        loadChildren: () => import('./features/book/book.module').then(t => t.BookModule )
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToBooks }
    }, 
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}