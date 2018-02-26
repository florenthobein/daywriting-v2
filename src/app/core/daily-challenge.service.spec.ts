import { TestBed, inject } from '@angular/core/testing';

import { DailyChallengeService } from './daily-challenge.service';

describe('DailyChallengeService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DailyChallengeService]
		});
	});

	it('should be created', inject([DailyChallengeService], (service: DailyChallengeService) => {
		expect(service).toBeTruthy();
	}));
});
