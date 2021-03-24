import { TestBed } from '@angular/core/testing';

import { CourseinstanceService } from './courseinstance.service';

describe('CourseInstance Service: Dependency Injection', () => {
  let service: CourseinstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseinstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
