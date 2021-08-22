import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
    imports: [
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]

})
export class WidgetsModule {

}