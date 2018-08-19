import { TestBed, async, inject } from '@angular/core/testing';

import { ChallengeGuard } from './challenge.guard';

describe('ChallengeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeGuard]
    });
  });

  it('should ...', inject([ChallengeGuard], (guard: ChallengeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
