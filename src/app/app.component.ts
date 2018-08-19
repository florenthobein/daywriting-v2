import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LangService } from '@app/core/lang.service';

@Component({
  selector: 'dw-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  focusWriting: string;

  constructor(private langSvc: LangService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.focusWriting = params.get('id')
    );
  }

  getLang(): string {
    return this.langSvc.getLang();
  }

  changeLang(locale: string) {
    this.langSvc.changeLang(locale);
    window.location.reload();
  }
}
