import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLostComponent } from './view-lost.component';

describe('ViewLostComponent', () => {
  let component: ViewLostComponent;
  let fixture: ComponentFixture<ViewLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
