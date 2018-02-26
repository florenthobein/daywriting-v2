import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingPreviewComponent } from './writing-preview.component';

describe('WritingPreviewComponent', () => {
	let component: WritingPreviewComponent;
	let fixture: ComponentFixture<WritingPreviewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ WritingPreviewComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(WritingPreviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
