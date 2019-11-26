import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproductPage } from './updateproduct.page';

describe('UpdateproductPage', () => {
  let component: UpdateproductPage;
  let fixture: ComponentFixture<UpdateproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateproductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
