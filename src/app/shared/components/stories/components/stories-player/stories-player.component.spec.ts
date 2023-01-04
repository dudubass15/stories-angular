import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesPlayerComponent } from './stories-player.component';

describe('StoriesPlayerComponent', () => {
  let component: StoriesPlayerComponent;
  let fixture: ComponentFixture<StoriesPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoriesPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
