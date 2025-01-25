import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoHomeComponent } from './demo-home.component';

describe('DemoHomeComponent', () => {
  let component: DemoHomeComponent;
  let fixture: ComponentFixture<DemoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
