import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseinstanceListComponent } from './courseinstance-list.component';

describe('CourseinstanceListComponent', () => {
  let component: CourseinstanceListComponent;
  let fixture: ComponentFixture<CourseinstanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseinstanceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseinstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
