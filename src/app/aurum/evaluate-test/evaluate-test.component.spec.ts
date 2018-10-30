import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateTestComponent } from './evaluate-test.component';

describe('EvaluateTestComponent', () => {
  let component: EvaluateTestComponent;
  let fixture: ComponentFixture<EvaluateTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
