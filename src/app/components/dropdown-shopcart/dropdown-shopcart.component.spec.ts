import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownShopcartComponent } from './dropdown-shopcart.component';

describe('DropdownShopcartComponent', () => {
  let component: DropdownShopcartComponent;
  let fixture: ComponentFixture<DropdownShopcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownShopcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownShopcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
