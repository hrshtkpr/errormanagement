import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTimelineComponent } from './mat-timeline.component';

describe('MatTimelineComponent', () => {
  let component: MatTimelineComponent;
  let fixture: ComponentFixture<MatTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
