import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsDisplayComponent } from './list-students-display.component';

describe('ListStudentsDisplayComponent', () => {
  let component: ListStudentsDisplayComponent;
  let fixture: ComponentFixture<ListStudentsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
