import { TestBed, inject } from '@angular/core/testing';

import { DailychallengeService } from './dailychallenge.service';

describe('DailychallengeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailychallengeService]
    });
  });

  it('should be created', inject([DailychallengeService], (service: DailychallengeService) => {
    expect(service).toBeTruthy();
  }));
});
