import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoencontradoComponent } from './naoencontrado.component';

describe('NaoencontradoComponent', () => {
  let component: NaoencontradoComponent;
  let fixture: ComponentFixture<NaoencontradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaoencontradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaoencontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
