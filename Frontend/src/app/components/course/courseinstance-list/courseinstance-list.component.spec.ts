import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CourseinstanceService } from 'src/app/services/courseinstance.service';

import { CourseinstanceListComponent } from './courseinstance-list.component';

class MockCourseInstanceService {
  getAll() {}
  add() {}
}

describe('CourseinstanceListComponent', () => {
  let sut: CourseinstanceListComponent;
  let mockCourseinstanceService: CourseinstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseinstanceListComponent],
      imports: [BrowserModule, NgbModule, HttpClientModule],
      providers: [ { provide: CourseinstanceService, useClass: MockCourseInstanceService}],
    });

    sut = TestBed.createComponent(CourseinstanceListComponent).componentInstance;
    mockCourseinstanceService = TestBed.inject(CourseinstanceService);
    spyOn(mockCourseinstanceService, 'getAll');
  });

  it('should get all course instances', () => {
    sut.ngOnInit();
    expect(mockCourseinstanceService.getAll).toHaveBeenCalled();
  })

  
});
