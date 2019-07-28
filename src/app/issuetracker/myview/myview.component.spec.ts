import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyviewComponent } from './myview.component';

describe('MyviewComponent', () => {
  let component: MyviewComponent;
  let fixture: ComponentFixture<MyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
