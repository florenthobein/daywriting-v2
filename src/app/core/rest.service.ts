import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import { catchError, map, skip, take, takeUntil, tap } from 'rxjs/operators';

import {environment} from '@env/environment';
import {AuthService} from '@app/core/auth.service';
import { BehaviorSubject } from 'rxjs/index';

interface JSONOptions {
  observe: 'body';
  responseType: 'json';
  params?: any;
  headers?: HttpHeaders;
}

export enum RestResponseStatus {
  OK = 'ok',
  ERROR = 'error',
  CACHED = 'cached',
}

interface IRestResponse<T> {
  status: RestResponseStatus;
  entities?: T;
}

interface ICachedResource {
  expiration: number;
  date: Date;
  entities?: any;
}

class RestCache {
  private cache: { [url: string]: ICachedResource } = {};
  private defaultExpiration = 10000;

  public checkCache(url: string) {
    const cachedResource = this.cache[url];
    return cachedResource && (new Date().getTime() - cachedResource.date.getTime() < cachedResource.expiration);
  }

  public getCache<T>(url: string): Observable<IRestResponse<T>> {
    return of({status: RestResponseStatus.CACHED, result: this.cache[url].entities as T});
  }

  public setCache(url: string, entities: any, expiration: number = this.defaultExpiration) {
    this.cache[url] = { date: new Date(), entities, expiration };
  }
}

@Injectable()
export class RestService {

  private mainCache: RestCache = new RestCache();

  constructor(private http: HttpClient, private authSvc: AuthService) { }

  static formatUri(uri: string, params?: any): string {
    uri = uri.replace(/^\//, '');
    if (!params) return environment.api_url + uri;
    const sections = uri.split(/\//);
    for (const i in sections) {
      if (!sections[i].match(/^\:/g)) continue;
      const field = sections[i].substr(1);
      if (params[field]) {
        sections[i] = params[field];
        delete params[field];
      }
    }
    return environment.api_url + sections.join('/');
  }

  private getHttpOptions(params?: any): JSONOptions {
    const jwt = localStorage.getItem(environment.id_token);
    const headers = {'Content-Type': 'application/json'};
    if (this.authSvc.authenticated())
      headers['Authorization'] = `Bearer ${jwt}`;
    return {
      params: params,
      observe: 'body',
      responseType: 'json',
      headers: new HttpHeaders(headers),
    };
  }

  private handleReponse<T>(url: string) {
    return (source: Observable<T>) => source.pipe(
      take(1),
      tap(res => this.mainCache.setCache(url, res)),
      map((res: T) => ({status: RestResponseStatus.OK, result: res as T})),
    );
  }

  private handleError<T>(uri?: string, result?: T) {
    return (error: any): Observable<{status: string, result: T}> => {

      // TODO: send the error to remote logging infrastructure
      console.error(uri, error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of({ status: 'error', result: result as T});
    };
  }

  prepareCall(verb: string, uri: string, params?: any,
              options: { expiration?: number, bypassCache?: boolean, onlyIfSecured?: boolean } = {}): any {
    const httpOptions = this.getHttpOptions(params);
    if (options.onlyIfSecured && !httpOptions.headers['Authorization'])
      return {response: of(null)};
    const url = RestService.formatUri(uri, params);
    const cacheUrl = `${verb} /${url.replace(environment.api_url, '')} ${JSON.stringify(params)}`;
    if (!options.bypassCache && this.mainCache.checkCache(cacheUrl))
      return {response: this.mainCache.getCache(cacheUrl)};
    console.log(`%c[${verb}] %c${cacheUrl}`, 'color:blue', '');
    return {url, cacheUrl, httpOptions};
  }

  get<T>(uri: string, params?: any,
         options: { expiration?: number, bypassCache?: boolean, onlyIfSecured?: boolean } = {}): Observable<{status: string, result?: T}> {
    const {url, cacheUrl, httpOptions, response} = this.prepareCall('GET', uri, params, options);
    if (response) return response;
    return this.http.get(url, httpOptions).pipe(
      this.handleReponse<T>(cacheUrl),
      catchError(this.handleError<T>(cacheUrl))
    );
  }

  post<T>(uri: string, body?: any, params?: any,
          options: { expiration?: number, bypassCache?: boolean, onlyIfSecured?: boolean } = {}): Observable<{status: string, result?: T}> {
    const {url, cacheUrl, httpOptions, response} = this.prepareCall('POST', uri, params, options);
    if (response) return response;
    return this.http.post(url, body, httpOptions).pipe(
      this.handleReponse<T>(cacheUrl),
      catchError(this.handleError<T>(cacheUrl))
    );
  }
}
