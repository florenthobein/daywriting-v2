import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs/Observable';
import {
	distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
	selector: 'dw-root',
	template: `
		<header class="u-container u-text-center u-mx-auto">
			<dw-nav-bar class="layout--grid u-px-64"></dw-nav-bar>
		</header>
		<main>
			<router-outlet></router-outlet>
		</main>`,
	styles: []
})
export class AppComponent {

	focusWriting: string;

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.route.paramMap.subscribe(
			params => this.focusWriting = params.get('id')
		);
	}
}




// import { Component, OnInit } from '@angular/core';

// import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import {
//    distinctUntilChanged, switchMap, forkJoin
//  } from 'rxjs/operators';

// import { AlbumService, SessionService } from '../../core/index';
// import { Album, User, Media, Revision } from '../../models/index';

// @Component({
// 	selector: 'zyl-gallery',
// 	templateUrl: './gallery.component.html',
// 	styleUrls: ['./gallery.component.css']
// })
// export class GalleryComponent implements OnInit {

// 	album: Album;
// 	medias$: Observable<Media[]>;

// 	constructor(public albumSvc: AlbumService, public sessionSvc: SessionService, private route: ActivatedRoute, private router: Router) { }

// 	ngOnInit() {

// 		this.medias$ = this.route.paramMap.pipe(
// 			distinctUntilChanged(),
// 			switchMap((params: ParamMap) => {

// 				// Retrieve the album if not already in our list
// 				let album_id = params.get('id');
// 				let album = null;
// 				if (this.sessionSvc.albums) {
// 					album = this.sessionSvc.albums.find(album => album.id === album_id);
// 					this.album = album;
// 				}
// 				if (!album) {
// 					this.albumSvc.get(album_id)
// 						.toPromise()
// 						.then(album => this.album = album);
// 				}

// 				//Retrieve the media list
// 				return this.albumSvc.getMedias(params.get('id'), { format: 'xl', offset: 0, max: 360 })
// 			})
// 		);

// 	}

// }
