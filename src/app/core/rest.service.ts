import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RestService {

	constructor(private http: HttpClient, private authHttp: AuthHttp) { }

	/**
	* Format a uri
	* @return {string}
	*/
	formatUri(uri: string, params?: any): string {
		uri = uri.replace(/^\//, '');
		if (!params)
			return uri;
		let sections = uri.split(/\//);
		for (var i in sections) {
			if (!sections[i].match(/^\:/g))
				continue;
			let field = sections[i].substr(1);
			if (params[field]) {
				sections[i] = params[field]
				delete params[field]
			}
		}
		// console.log(params);
		return sections.join('/');
	}

	/**
	* Handle an API error
	* @param {T}
	*/
	private handleError<T> (uri?: string, result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.log(uri, error); // log to console instead

			// TODO: better job of transforming error for user consumption
			// console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	get<T>(uri: string, params?: any): Observable<T> {
		return this.http.get<T>(this.formatUri(uri, params))
			.pipe(
				// map(res => res. as T),
				catchError(this.handleError<T>('GET ' + uri))
			);
	}

	getSecured<T>(uri: string, params?: any): Observable<T> {
		return this.authHttp.get(this.formatUri(uri, params))
			.pipe(
				map(res => res.json() as T),
				catchError(this.handleError<T>('GET ' + uri))
			);
	}

	post<T>(uri: string, body?: any, params?: any): Observable<T> {
		return this.http.post<T>(this.formatUri(uri, params),
			body,
			{
				params: params,
				observe: 'body',
				responseType: 'json'
			})
			.pipe(
				// map(res => res.json() as T),
				catchError(this.handleError<T>('POST ' + uri))
			);
	}

	postSecured<T>(uri: string, params?: any): Observable<T> {
		return this.authHttp.post(this.formatUri(uri, params), params)
			.pipe(
				map(res => res.json() as T),
				catchError(this.handleError<T>('POST ' + uri))
			);
	}
}
