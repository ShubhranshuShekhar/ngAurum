import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AurumComponent } from './aurum.component';

describe('AurumComponent', () => {
  let component: AurumComponent;
  let fixture: ComponentFixture<AurumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AurumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AurumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
