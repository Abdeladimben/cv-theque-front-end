import { TestBed } from '@angular/core/testing';

import { TopBarMenuService } from './top-bar-menu.service';

describe('TopBarMenuService', () => {
  let service: TopBarMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopBarMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
