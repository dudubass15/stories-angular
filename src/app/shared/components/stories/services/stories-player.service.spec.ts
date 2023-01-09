import { TestBed } from '@angular/core/testing';

import { StoriesPlayerService } from './stories-player.service';

describe('StoriesPlayerService', () => {
  let service: StoriesPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoriesPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
