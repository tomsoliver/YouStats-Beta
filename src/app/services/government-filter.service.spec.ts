import { TestBed } from '@angular/core/testing';

import { GovernmentFilterService } from './government-filter.service';

describe('GovernmentFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GovernmentFilterService = TestBed.get(GovernmentFilterService);
    expect(service).toBeTruthy();
  });
});
