import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  private loginCallback: (userProfile: any) => void;

  private auth0Options = {
    language: 'fr',
    // allowedConnections: ['facebook', 'google', 'Username-Password-Authentication'],
    theme: {
      logo: 'http://hobein.fr/dw-logo.png'
    },
    languageDictionary: {
      title: 'Connexion'
    },
    auth: {
      responseType: 'token id_token',
      audience: `https://${environment.auth0.domain}/userinfo`,
      params: {
        scope: 'openid profile email'
      }
    },
    autoclose: true,
    oidcConformant: true,
  };

  lock = new Auth0Lock(
    environment.auth0.clientId,
    environment.auth0.domain,
    this.auth0Options
  );

  constructor(private jwtHelper: JwtHelperService) {
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem(environment.id_token, authResult.idToken);
      this.lock.getProfile(authResult.accessToken, (error, profile) => {
        if (error) {
          console.log(error);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        if (this.loginCallback)
          this.loginCallback(profile);
      });
    });
  }

  signIn = (loginCallback?: (userProfile: any) => void) => {
    this.lock.show();
    this.loginCallback = loginCallback;
  };

  signOut = () => localStorage.removeItem(environment.id_token);

  authenticated = () => !this.jwtHelper.isTokenExpired();
}
