import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { LoginComponent } from "./login/login.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginComponent,
        UnauthorizedComponent
    ],
    exports: [
        LoginComponent,
        UnauthorizedComponent
    ]

})
export class WidgetsModule {

}