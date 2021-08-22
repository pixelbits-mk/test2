import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
