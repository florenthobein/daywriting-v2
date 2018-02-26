import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
	selector: 'dw-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

	constructor(public authSvc: AuthService) { }

	ngOnInit() {
	}

}
