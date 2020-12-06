import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLostComponent } from './edit-lost.component';

describe('EditLostComponent', () => {
  let component: EditLostComponent;
  let fixture: ComponentFixture<EditLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
