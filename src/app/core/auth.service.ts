import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

import { UserService } from './user.service';

// FIXME: replace these with your own Auth0 'Client ID' and 'Domain'
const AUTH0_CLIENT_ID = 'KjGBu3q3VQPxTWkF9epNHgD2Dzu1jFrT';
const AUTH0_DOMAIN = 'daywriting.eu.auth0.com';

// this is the key to the JWT in the browser localStorage
// AuthConfigConsts.DEFAULT_TOKEN_NAME
// const ID_TOKEN = 'daywriting-token';
const ID_TOKEN = 'token';

@Injectable()
export class AuthService {

	lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
		language: 'fr',
		// allowedConnections: ['facebook', 'google', 'Username-Password-Authentication'],
		theme: {
			logo: 'http://hobein.fr/dw-logo.png'
		},
		languageDictionary: {
			title: 'Connexion'
		},
		auth: {
	// redirectUrl: '',
	responseType: 'token id_token',
	audience: `https://${AUTH0_DOMAIN}/userinfo`,
	params: {
	scope: 'openid profile email'
	}
	}
	});

	constructor(private userSvc: UserService) {
		// listening to 'authenticated' events
		this.lock.on('authenticated', (authResult) => {
			// localStorage.setItem(ID_TOKEN, authResult.accessToken);
			localStorage.setItem(ID_TOKEN, authResult.idToken);
			this.lock.getProfile(authResult.accessToken, (error, profile) => {
				if (error) { console.log(error); }
				localStorage.setItem('profile', JSON.stringify(profile));
				this.userSvc.store(profile);
			});
		});
	}

	signIn() { this.lock.show(); }

	signOut() { localStorage.removeItem(ID_TOKEN); }

	authenticated() { return tokenNotExpired(ID_TOKEN); }
}
