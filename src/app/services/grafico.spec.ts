import { TestBed } from '@angular/core/testing';

import { Grafico } from './grafico';

describe('Grafico', () => {
  let service: Grafico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Grafico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
