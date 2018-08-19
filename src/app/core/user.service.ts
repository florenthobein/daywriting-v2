import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@app/models/user';
import { RestService } from './rest.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private static USERS_ENDPOINT = '/users';

  constructor(private restSvc: RestService) {
  }

  storeUser(params: object) {
    this.restSvc.post<IUser>(UserService.USERS_ENDPOINT + '/auth', params).toPromise();
  }

  getCurrentUser$(params?: object): Observable<IUser> {
    return this.restSvc.get<IUser>(UserService.USERS_ENDPOINT + '/me', params, {onlyIfSecured: true}).pipe(
      map(x => x && x.result)
    );
  }

}
