import { Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { IChallenge } from '@app/models/challenge';
import { LangService } from '@app/core/lang.service';
import { AuthService } from '@app/core/auth.service';


@Component({
  selector: 'dw-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css'],
})
export class WriterComponent implements OnInit {

  form: FormGroup;
  saved = true;
  fullscreen: boolean;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'size': ['small', false, 'large', 'huge']}],
      [{'align': []}],
      ['clean'],
    ]
  };

  @Input() challenge: IChallenge;
  @ViewChild('editor') editor: QuillEditorComponent;
  @ViewChild('writer') writer: ElementRef;

  constructor(private fb: FormBuilder,
              private langSvc: LangService,
              public authSvc: AuthService,
              private scrollToService: ScrollToService) {
  }

  public ngOnInit() {

    let text = '';
    if (this.challenge) {
      // text = this.storeSvc.get(this.challenge.datekey);
    }
    this.form = this.fb.group({
      editor: [text]
    });

    this.form.controls.editor.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    )
    .subscribe(text => {
      if (this.challenge.datekey) {
        // this.storeSvc.save(this.challenge.datekey, text);
        this.saved = true;
      } else {
        ;// todo handle error
      }
    });
  }

  public setFocus($event) {
    $event.focus();
  }

  public contentChanged() {
    this.saved = false;
    if (!this.fullscreen) {
      const box = this.writer.nativeElement.getBoundingClientRect();
      this.scrollToService.scrollTo({offset: box.top, duration: 300});
      this.fullscreen = true;
    }
  }

}
