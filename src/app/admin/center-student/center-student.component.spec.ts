import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterStudentComponent } from './center-student.component';

describe('CenterStudentComponent', () => {
  let component: CenterStudentComponent;
  let fixture: ComponentFixture<CenterStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
