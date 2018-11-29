import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFlatTreeComponent } from './mat-flat-tree.component';

describe('MatFlatTreeComponent', () => {
  let component: MatFlatTreeComponent;
  let fixture: ComponentFixture<MatFlatTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatFlatTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFlatTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
