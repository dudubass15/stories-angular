import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesInfoComponent } from './stories-info.component';

describe('StoriesInfoComponent', () => {
  let component: StoriesInfoComponent;
  let fixture: ComponentFixture<StoriesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoriesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
