import { TestBed } from '@angular/core/testing';

import { JsonDBService } from './json-db.service';

describe('JsonDBService', () => {
  let service: JsonDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
