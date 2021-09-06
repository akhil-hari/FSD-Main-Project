import { TestBed } from '@angular/core/testing';

import { NotifictionService } from './notifiction.service';

describe('NotifictionService', () => {
  let service: NotifictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
