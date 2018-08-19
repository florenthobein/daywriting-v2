import { Component } from '@angular/core';
import {UserService} from '@app/core/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'dw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private userSvc: UserService) {
    userSvc.getCurrentUser$().pipe(first()).subscribe(() => {});
  }
}
