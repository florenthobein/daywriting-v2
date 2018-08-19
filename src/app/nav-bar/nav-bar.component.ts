import { Component } from '@angular/core';
import { AuthService } from '@app/core/auth.service';
import { UserService } from '@app/core/user.service';

@Component({
  selector: 'dw-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  private authenticated: boolean;

  constructor(private userSvc: UserService, private authSvc: AuthService) {
    this.authenticated = authSvc.authenticated();
  }

  signIn() {
    this.authSvc.signIn(userProfile => {
      this.userSvc.storeUser(userProfile);
    });
  }

  signOut() {
    this.authSvc.signOut();
  }
}
