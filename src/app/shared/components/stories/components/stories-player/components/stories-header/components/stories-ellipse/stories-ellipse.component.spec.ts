import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesEllipseComponent } from './stories-ellipse.component';

describe('StoriesEllipseComponent', () => {
  let component: StoriesEllipseComponent;
  let fixture: ComponentFixture<StoriesEllipseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoriesEllipseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesEllipseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
