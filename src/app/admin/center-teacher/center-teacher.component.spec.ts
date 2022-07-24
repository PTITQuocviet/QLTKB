import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterTeacherComponent } from './center-teacher.component';

describe('CenterTeacherComponent', () => {
  let component: CenterTeacherComponent;
  let fixture: ComponentFixture<CenterTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
