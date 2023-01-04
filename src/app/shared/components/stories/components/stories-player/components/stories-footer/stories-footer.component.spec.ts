import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesFooterComponent } from './stories-footer.component';

describe('StoriesFooterComponent', () => {
  let component: StoriesFooterComponent;
  let fixture: ComponentFixture<StoriesFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoriesFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
