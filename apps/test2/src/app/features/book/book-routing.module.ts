import { NgModule } from "@angular/core";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { BookComponent } from "./book.component";
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
    { 
        path: '', component: BookComponent,
        pathMatch: 'full',
        canActivate: [
            AngularFireAuthGuard
        ],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class BookRoutingModule {

}