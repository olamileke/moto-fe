import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoSquareComponent } from './moto-square.component';

describe('MotoSquareComponent', () => {
  let component: MotoSquareComponent;
  let fixture: ComponentFixture<MotoSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
