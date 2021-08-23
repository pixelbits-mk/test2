import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
@Component({
  selector: 'pixelbits-mk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin';
  addAdmin: (data: any) => Observable<any>
  constructor(private fns: AngularFireFunctions) {
    this.addAdmin = fns.httpsCallable('addAdmin');
  }
  onClick() {
    alert('click')
    this.addAdmin({ email: 'kang.mike@gmail.com' }).toPromise().then(t => {
      alert('success')
    }, err => {
      console.log(err)
    })
  }
}
